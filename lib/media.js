import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { safeRead, safeWrite, getNextSequence } from './mongodb';

const COLLECTION = 'media_library';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

function safeExt(filename) {
  const ext = path.extname(filename || '').toLowerCase();
  return /^\.[a-z0-9]{2,5}$/.test(ext) ? ext : '';
}

export async function saveUploadedFile(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    return { ok: false, error: 'No file provided' };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { ok: false, error: 'File is too large (max 8MB)' };
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: 'Unsupported file type. Use JPEG, PNG, WebP, GIF, or SVG.' };
  }

  const ext = safeExt(file.name) || '.bin';
  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
  const url = `/uploads/${uniqueName}`;

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, uniqueName), buffer);
  } catch (err) {
    // Most commonly hit on serverless platforms (e.g. Vercel) whose
    // filesystem is read-only outside of /tmp at runtime — writes under
    // public/uploads succeed locally and on a persistent-disk host, but
    // fail here. See README "Media library storage" for the fix
    // (point this at an object-storage provider instead of local disk).
    console.error('[media] failed to write uploaded file to disk:', err.message);
    return {
      ok: false,
      error:
        'Could not save the file to disk. If this is running on a serverless host (e.g. Vercel), local file storage is not supported there — see the README for switching the media library to object storage.'
    };
  }

  const { ok, error, result } = await safeWrite(async (db) => {
    const id = await getNextSequence(COLLECTION);
    await db.collection(COLLECTION).insertOne({
      _id: id,
      id,
      filename: file.name || uniqueName,
      url,
      alt_text: '',
      mime_type: file.type || null,
      size_bytes: file.size || null,
      uploaded_at: new Date()
    });
    return { insertId: id };
  });
  if (!ok) return { ok: false, error };

  return { ok: true, id: result.insertId, url, filename: file.name || uniqueName };
}

export async function listMedia() {
  return safeRead((db) => db.collection(COLLECTION).find({}).sort({ uploaded_at: -1 }).toArray(), []);
}

export async function deleteMedia(id) {
  const item = await safeRead((db) => db.collection(COLLECTION).findOne({ id: Number(id) }), null);
  if (!item) return { ok: false, error: 'Not found' };

  const { ok, error } = await safeWrite((db) =>
    db.collection(COLLECTION).deleteOne({ id: Number(id) })
  );
  if (!ok) return { ok: false, error };

  try {
    const filePath = path.join(process.cwd(), 'public', item.url);
    await fs.unlink(filePath);
  } catch {
    // File already missing on disk — the DB row is still removed.
  }
  return { ok: true };
}
