import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { adminFetch, adminFetchJson, formatDate, type Note } from '../utils';

export default function NotesPanel({ leadId }: { leadId: number }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch(`/api/admin/leads/${leadId}/notes`)
      .then((r) => r.json())
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoadingNotes(false));
  }, [leadId]);

  const addNote = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      const res = await adminFetchJson(`/api/admin/leads/${leadId}/notes`, { note: draft });
      const note: Note = await res.json();
      setNotes((prev) => [note, ...prev]);
      setDraft('');
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  return (
    <div className="p-4 bg-[#080C18] border-t border-gray-800 space-y-3">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Notes</h3>
      {loadingNotes && <p className="text-xs text-gray-500">Loading…</p>}
      {!loadingNotes && notes.length === 0 && (
        <p className="text-xs text-gray-500">No notes yet.</p>
      )}
      {notes.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id} className="text-sm text-gray-300 bg-[#0F1420] rounded p-2">
              <p>{n.note}</p>
              <p className="text-xs text-gray-600 mt-1">{formatDate(n.created_at)}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 items-end">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) addNote(); }}
          rows={2}
          placeholder="Add a note… (Ctrl+Enter to save)"
          className="flex-1 bg-[#0F1420] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <Button size="sm" onClick={addNote} disabled={saving || !draft.trim()}>
          {saving ? '…' : 'Add'}
        </Button>
      </div>
    </div>
  );
}
