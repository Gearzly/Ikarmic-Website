import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { type Message, portalFetch, portalPost, formatDate } from './utils';

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  const fetchMessages = () => {
    portalFetch('/api/portal/messages')
      .then(r => r.ok ? r.json() : [])
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const sendMessage = async () => {
    if (!draft.trim()) return;
    setSending(true);
    try {
      await portalPost('/api/portal/messages', { message: draft.trim() });
      setDraft('');
      fetchMessages();
    } catch { /* ignore */ }
    finally { setSending(false); }
  };

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Messages</h2>

      <div className="space-y-2 max-h-[55vh] overflow-y-auto">
        {messages.length === 0 && <p className="text-gray-500 text-sm">No messages yet.</p>}
        {messages.map(m => (
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
  );
}
