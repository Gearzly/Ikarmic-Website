import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import LeadRow from './components/LeadRow';
import { type Lead, STAGES, isOverdue, adminFetch } from './utils';

export default function LeadsView({ onLogout }: { onLogout: () => void }) {
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
      const res = await adminFetch(`/api/admin/leads${qs ? '?' + qs : ''}`);
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
  }, [onLogout, debouncedSearch]);

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

  const exportCsv = async () => {
    try {
      const res = await adminFetch('/api/admin/leads/export.csv');
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
    <div>
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
          <Button variant="ghost" size="sm" onClick={exportCsv} className="text-gray-400 hover:text-white text-xs">
            Export CSV
          </Button>
          <Button variant="ghost" size="sm" onClick={fetchLeads} className="text-gray-400 hover:text-white">
            Refresh
          </Button>
        </div>
      </header>

      <main className="p-6">
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
            {([{ value: 'all', label: 'All', color: '' }] as { value: string; label: string; color: string }[])
              .concat(STAGES)
              .map(({ value, label }) => {
                const count = value === 'all' ? leads.length : leads.filter((l) => l.stage === value).length;
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
                  <LeadRow key={lead.id} lead={lead} onUpdate={updateLead} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
