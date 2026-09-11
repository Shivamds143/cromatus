import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(DATA_DIR, "fallback_submissions.json");

export type FallbackContact = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string;
  message: string | null;
  createdAt: string;
  source: "fallback";
};

export type FallbackNewsletter = {
  id: string;
  email: string;
  createdAt: string;
  source: "fallback";
};

type FallbackStore = {
  contactSubmissions: FallbackContact[];
  newsletterSubscriptions: FallbackNewsletter[];
};

async function ensureStore(): Promise<FallbackStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(FALLBACK_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return {
      contactSubmissions: parsed.contactSubmissions || [],
      newsletterSubscriptions: parsed.newsletterSubscriptions || [],
    };
  } catch {
    const empty: FallbackStore = { contactSubmissions: [], newsletterSubscriptions: [] };
    try {
      await fs.writeFile(FALLBACK_FILE, JSON.stringify(empty, null, 2), "utf-8");
    } catch {
      // ignore write errors in restricted envs
    }
    return empty;
  }
}

async function writeStore(store: FallbackStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export async function saveContactSubmissionFallback(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  company: string;
  message?: string | null;
  createdAt?: Date;
}): Promise<FallbackContact> {
  const store = await ensureStore();
  const entry: FallbackContact = {
    id: `offline_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || null,
    company: data.company,
    message: data.message || null,
    createdAt: (data.createdAt || new Date()).toISOString(),
    source: "fallback",
  };
  store.contactSubmissions.unshift(entry);
  await writeStore(store);
  return entry;
}

export async function saveNewsletterSubscriptionFallback(email: string): Promise<FallbackNewsletter> {
  const store = await ensureStore();
  const normalized = email.trim().toLowerCase();
  const existing = store.newsletterSubscriptions.find((s) => s.email === normalized);
  if (existing) return existing;

  const entry: FallbackNewsletter = {
    id: `offline_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    email: normalized,
    createdAt: new Date().toISOString(),
    source: "fallback",
  };
  store.newsletterSubscriptions.unshift(entry);
  await writeStore(store);
  return entry;
}

export async function getFallbackData(): Promise<{
  contactSubmissions: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    company: string;
    message: string | null;
    createdAt: Date;
    source: "fallback";
  }>;
  newsletterSubscriptions: Array<{
    id: string;
    email: string;
    createdAt: Date;
    source: "fallback";
  }>;
}> {
  const store = await ensureStore();
  return {
    contactSubmissions: store.contactSubmissions.map((s) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      source: "fallback" as const,
    })),
    newsletterSubscriptions: store.newsletterSubscriptions.map((s) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      source: "fallback" as const,
    })),
  };
}

export async function syncFallbackToMongo(db: any): Promise<{ syncedContacts: number; syncedNewsletters: number }> {
  const store = await ensureStore();
  let syncedContacts = 0;
  let syncedNewsletters = 0;

  if (store.contactSubmissions.length > 0) {
    for (const contact of store.contactSubmissions) {
      await db.collection("contactSubmissions").insertOne({
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        message: contact.message,
        createdAt: new Date(contact.createdAt),
      });
      syncedContacts++;
    }
    store.contactSubmissions = [];
  }

  if (store.newsletterSubscriptions.length > 0) {
    for (const sub of store.newsletterSubscriptions) {
      await db.collection("newsletterSubscriptions").updateOne(
        { email: sub.email },
        {
          $setOnInsert: {
            email: sub.email,
            createdAt: new Date(sub.createdAt),
          },
        },
        { upsert: true }
      );
      syncedNewsletters++;
    }
    store.newsletterSubscriptions = [];
  }

  await writeStore(store);
  return { syncedContacts, syncedNewsletters };
}
