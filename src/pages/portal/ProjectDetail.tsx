import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { type Project, type Message, type Document, portalFetch, portalPost, formatDate } from './utils';

export default function ProjectDetail({ projectId, onBack }: { projectId: number; onBack: () => void }) {
  const [project, setProject] = useState<(Project & { messages: Message[]; documents: Document[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  const fetchProject = useCallback(() => {
    portalFetch(`/api/portal/projects/${projectId}`)
      .then(r => r.ok ? r.json() : null)
      .then(setProject)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => { fetchProject(); }, [fetchProject]);

  const sendMessage = async () => {
    if (!draft.trim()) return;
    setSending(true);
    try {
      await portalPost('/api/portal/messages', { project_id: projectId, message: draft.trim() });
      setDraft('');
      fetchProject();
    } catch { /* ignore */ }
    finally { setSending(false); }
  };

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;
  if (!project) return <p className="text-red-400 text-sm p-6">Project not found.</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">← Back</Button>
        <h2 className="text-lg font-semibold text-white">{project.name}</h2>
        <Badge variant={project.status === 'active' ? 'default' : 'outline'} className="text-xs">{project.status}</Badge>
      </div>

      {project.description && <p className="text-sm text-gray-300">{project.description}</p>}

      {/* Documents */}
      {project.documents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Documents</h3>
          <div className="space-y-1">
            {project.documents.map(d => (
              <div key={d.id} className="flex items-center justify-between bg-[#0A0E1A] border border-gray-800 rounded px-3 py-2">
                <span className="text-sm text-white">{d.name}</span>
                <span className="text-xs text-gray-500">{(d.file_size / 1024).toFixed(1)} KB</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Messages</h3>
        <div className="space-y-2 max-h-[40vh] overflow-y-auto mb-3">
          {project.messages.length === 0 && <p className="text-xs text-gray-500">No messages yet.</p>}
          {project.messages.map(m => (
            <div
              key={m.id}
              className={`p-3 rounded-lg text-sm ${
                m.sender_type === 'client'
                  ? 'bg-indigo-900/30 border border-indigo-800 ml-8'
                  : 'bg-[#0A0E1A] border border-gray-800 mr-8'
              }`}
            >
              <p className="text-gray-200">{m.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {m.sender_type === 'client' ? 'You' : 'Team'} · {formatDate(m.created_at)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) sendMessage(); }}
            rows={2}
            placeholder="Type a message… (Ctrl+Enter to send)"
            className="flex-1 bg-[#0F1420] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <Button size="sm" onClick={sendMessage} disabled={sending || !draft.trim()}>Send</Button>
        </div>
      </div>
    </div>
  );
}
