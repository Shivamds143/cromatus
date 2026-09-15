'use client';

import { useEffect, useState } from 'react';

export default function MediaPickerButton({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Fetching the media library is synchronizing with an external system
    // (the API) when the picker opens — an accepted use of the pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch('/api/admin/media')
      .then((res) => res.json())
      .then((data) => setMedia(data.media || []))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="whitespace-nowrap text-xs font-semibold text-brandblue hover:text-brandblue-dark border border-brandblue/30 rounded-lg px-3 py-2"
      >
        Browse media
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div
            className="bg-white rounded-xl2 shadow-card max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-navy">Select an image</h3>
              <button onClick={() => setOpen(false)} className="text-inkgray hover:text-navy">✕</button>
            </div>

            {loading && <p className="text-sm text-inkgray">Loading…</p>}
            {!loading && media.length === 0 && (
              <p className="text-sm text-inkgray">
                No media uploaded yet. Go to Media Library to upload images first.
              </p>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {media.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    onSelect(m.url);
                    setOpen(false);
                  }}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-brandblue"
                  title={m.filename}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.alt_text || m.filename} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
