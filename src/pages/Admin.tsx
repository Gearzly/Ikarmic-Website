import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const TOKEN_KEY = 'admin_token';

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  source: string;
  created_at: string;
  read_at: string | null;
  stage: string;
  deal_value: number | null;
  tags: string[] | null;
  follow_up_at: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

interface Note {
  id: number;
  note: string;
  created_at: string;
}

function sourceLabel(source: string) {
  if (source === 'contact-page') return 'Contact';
  if (source === 'home-cta') return 'Home CTA';
  return source;
}

function sourceVariant(source: string): 'default' | 'secondary' | 'outline' {
  if (source === 'contact-page') return 'default';
  if (source === 'home-cta') return 'secondary';
  return 'outline';
}

type Stage = 'new' | 'qualified' | 'proposal' | 'won' | 'lost';

const STAGES: { value: Stage; label: string; color: string }[] = [
  { value: 'new',       label: 'New',       color: '#818cf8' },
  { value: 'qualified', label: 'Qualified', color: '#c084fc' },
  { value: 'proposal',  label: 'Proposal',  color: '#fbbf24' },
  { value: 'won',       label: 'Won',       color: '#4ade80' },
  { value: 'lost',      label: 'Lost',      color: '#6b7280' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateInput(iso: string | null) {
  if (!iso) return '';
  return iso.slice(0, 10);
}

function isOverdue(follow_up_at: string | null) {
  if (!follow_up_at) return false;
  return new Date(follow_up_at) < new Date();
}

// ── Login view ───────────────────────────────────────────

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError('Invalid username or password.');
        return;
      }
      const { token } = await res.json();
      sessionStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-gray-400">Ikarmic leads dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
            required
            className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Notes panel ──────────────────────────────────────────

function NotesPanel({ leadId, token }: { leadId: number; token: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/leads/${leadId}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoadingNotes(false));
  }, [leadId, token]);

  const addNote = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: draft }),
      });
      const note: Note = await res.json();
      setNotes((prev) => [note, ...prev]);
      setDraft('');
    } catch {
      // silently ignore
    } finally {
      setSaving(false);
    }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) addNote();
          }}
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

// ── Lead row ──────────────────────────────────────────────

function LeadRow({
  lead,
  token,
  onUpdate,
}: {
  lead: Lead;
  token: string;
  onUpdate: (updated: Partial<Lead> & { id: number }) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editValue, setEditValue] = useState(lead.deal_value != null ? String(lead.deal_value) : '');
  const [editFollowUp, setEditFollowUp] = useState(formatDateInput(lead.follow_up_at));
  const [editTags, setEditTags] = useState((lead.tags ?? []).join(', '));

  const updateStage = async (stage: string) => {
    await fetch(`/api/admin/leads/${lead.id}/stage`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage }),
    }).catch(() => {});
    onUpdate({ id: lead.id, stage });
  };

  const markRead = async () => {
    await fetch(`/api/admin/leads/${lead.id}/read`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
    onUpdate({ id: lead.id, read_at: new Date().toISOString() });
  };

  const saveValue = async () => {
    const v = editValue === '' ? null : parseInt(editValue, 10);
    if (v !== null && (isNaN(v) || v < 0)) return;
    await fetch(`/api/admin/leads/${lead.id}/value`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ deal_value: v }),
    }).catch(() => {});
    onUpdate({ id: lead.id, deal_value: v });
  };

  const saveFollowUp = async () => {
    await fetch(`/api/admin/leads/${lead.id}/followup`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ follow_up_at: editFollowUp || null }),
    }).catch(() => {});
    onUpdate({ id: lead.id, follow_up_at: editFollowUp || null });
  };

  const saveTags = async () => {
    const tags = editTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    await fetch(`/api/admin/leads/${lead.id}/tags`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags }),
    }).catch(() => {});
    onUpdate({ id: lead.id, tags });
  };

  const overdue = isOverdue(lead.follow_up_at);

  return (
    <>
      <TableRow
        className={`border-gray-800 transition-colors ${
          lead.read_at ? 'opacity-60' : 'bg-[#0A0E1A]'
        }${overdue ? ' border-l-2 border-l-red-600' : ''}`}
      >
        <TableCell className="text-gray-300 text-sm whitespace-nowrap">
          {formatDate(lead.created_at)}
        </TableCell>
        <TableCell>
          <Badge variant={sourceVariant(lead.source)} className="text-xs">
            {sourceLabel(lead.source)}
          </Badge>
          {lead.utm_source && (
            <span
              className="block text-xs text-gray-600 mt-0.5"
              title={[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / ')}
            >
              utm: {lead.utm_source}
            </span>
          )}
        </TableCell>
        <TableCell>
          <select
            value={lead.stage}
            onChange={(e) => updateStage(e.target.value)}
            className="bg-[#0F1420] border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            style={{ color: STAGES.find((s) => s.value === lead.stage)?.color ?? '#fff' }}
          >
            {STAGES.map((s) => (
              <option key={s.value} value={s.value} style={{ color: s.color }}>
                {s.label}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell className="text-white font-medium">{lead.name}</TableCell>
        <TableCell>
          <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:text-indigo-300 text-sm">
            {lead.email}
          </a>
        </TableCell>
        <TableCell className="text-gray-300 text-sm">{lead.company || '—'}</TableCell>
        <TableCell>
          <input
            type="number"
            min="0"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveValue}
            placeholder="—"
            className="w-20 bg-transparent border-b border-gray-700 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 py-0.5"
          />
        </TableCell>
        <TableCell>
          <input
            type="date"
            value={editFollowUp}
            onChange={(e) => setEditFollowUp(e.target.value)}
            onBlur={saveFollowUp}
            className={`bg-transparent border-b text-xs focus:outline-none py-0.5 ${
              overdue
                ? 'border-red-500 text-red-400'
                : 'border-gray-700 text-gray-300 focus:border-indigo-500'
            }`}
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            onBlur={saveTags}
            placeholder="tag1, tag2"
            className="w-28 bg-transparent border-b border-gray-700 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 py-0.5"
          />
        </TableCell>
        <TableCell className="text-gray-300 text-sm max-w-[200px]">
          <span title={lead.message}>
            {lead.message.length > 60 ? lead.message.slice(0, 60) + '…' : lead.message}
          </span>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded((v) => !v)}
              className={`text-xs px-2 h-7 ${expanded ? 'text-indigo-300' : 'text-gray-400 hover:text-white'}`}
            >
              Notes{expanded ? ' ▲' : ' ▼'}
            </Button>
            {!lead.read_at && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markRead}
                className="text-xs text-indigo-400 hover:text-indigo-300 px-2 h-7"
              >
                Read
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow className="border-gray-800">
          <TableCell colSpan={11} className="p-0">
            <NotesPanel leadId={lead.id} token={token} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// ── Leads view ───────────────────────────────────────────

function LeadsView({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('q', debouncedSearch);
      const qs = params.toString();
      const res = await fetch(`/api/admin/leads${qs ? '?' + qs : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      if (!res.ok) throw new Error('Failed to load leads');
      setLeads(await res.json());
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [token, onLogout, debouncedSearch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(val), 350);
  };

  const updateLead = (updated: Partial<Lead> & { id: number }) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)));
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
    onLogout();
  };

  const exportCsv = async () => {
    try {
      const res = await fetch('/api/admin/leads/export.csv', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // silently ignore
    }
  };

  const unread = leads.filter((l) => !l.read_at).length;
  const overdueCount = leads.filter((l) => isOverdue(l.follow_up_at)).length;
  const filteredLeads = stageFilter === 'all' ? leads : leads.filter((l) => l.stage === stageFilter);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Leads</h1>
          {unread > 0 && (
            <Badge variant="default" className="bg-indigo-600 text-white text-xs">
              {unread} new
            </Badge>
          )}
          {overdueCount > 0 && (
            <Badge variant="default" className="bg-red-700 text-white text-xs">
              {overdueCount} overdue
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportCsv}
            className="text-gray-400 hover:text-white text-xs"
          >
            Export CSV
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLeads}
            className="text-gray-400 hover:text-white"
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {/* Search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search name, email, company…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-xs bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500 h-8 text-sm"
          />
        </div>

        {loading && <p className="text-gray-400 text-sm">Loading…</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && !error && leads.length === 0 && (
          <p className="text-gray-500 text-sm">No leads yet.</p>
        )}

        {leads.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {(
              [{ value: 'all', label: 'All', color: '' }] as {
                value: string;
                label: string;
                color: string;
              }[]
            )
              .concat(STAGES)
              .map(({ value, label }) => {
                const count =
                  value === 'all'
                    ? leads.length
                    : leads.filter((l) => l.stage === value).length;
                return (
                  <button
                    key={value}
                    onClick={() => setStageFilter(value)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      stageFilter === value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-[#0F1420] text-gray-400 hover:text-white border border-gray-800'
                    }`}
                  >
                    {label} <span className="opacity-60">{count}</span>
                  </button>
                );
              })}
          </div>
        )}

        {!loading && filteredLeads.length === 0 && leads.length > 0 && (
          <p className="text-gray-500 text-sm">No leads in this stage.</p>
        )}
        {!loading && filteredLeads.length > 0 && (
          <div className="rounded-lg border border-gray-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#0F1420]">
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium whitespace-nowrap">Date</TableHead>
                  <TableHead className="text-gray-400 font-medium">Source</TableHead>
                  <TableHead className="text-gray-400 font-medium">Stage</TableHead>
                  <TableHead className="text-gray-400 font-medium">Name</TableHead>
                  <TableHead className="text-gray-400 font-medium">Email</TableHead>
                  <TableHead className="text-gray-400 font-medium">Company</TableHead>
                  <TableHead className="text-gray-400 font-medium whitespace-nowrap">Value (£)</TableHead>
                  <TableHead className="text-gray-400 font-medium whitespace-nowrap">Follow-up</TableHead>
                  <TableHead className="text-gray-400 font-medium">Tags</TableHead>
                  <TableHead className="text-gray-400 font-medium">Message</TableHead>
                  <TableHead className="text-gray-400 font-medium w-28">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    token={token}
                    onUpdate={updateLead}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────

const Admin = () => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(TOKEN_KEY)
  );

  const handleLogin = (t: string) => setToken(t);

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!token) return <LoginView onLogin={handleLogin} />;
  return <LeadsView token={token} onLogout={handleLogout} />;
};

export default Admin;
