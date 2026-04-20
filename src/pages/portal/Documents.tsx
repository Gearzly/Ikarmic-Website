import { useState, useEffect } from 'react';
import { type Document, portalFetch, formatDate } from './utils';

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch('/api/portal/documents')
      .then(r => r.ok ? r.json() : [])
      .then(setDocuments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Documents</h2>
      {documents.length === 0 && <p className="text-gray-500 text-sm">No documents yet.</p>}
      <div className="space-y-2">
        {documents.map(d => (
          <div key={d.id} className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-white">{d.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{d.mime_type} · {(d.file_size / 1024).toFixed(1)} KB</p>
            </div>
            <p className="text-xs text-gray-500">{formatDate(d.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
