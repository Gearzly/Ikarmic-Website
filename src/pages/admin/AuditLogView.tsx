import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { adminFetch, formatDate } from './utils';

interface AuditEntry {
  id: number;
  username: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  metadata: Record<string, unknown> | null;
  ip: string;
  created_at: string;
}

export default function AuditLogView() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch('/api/admin/audit-log')
      .then(r => r.ok ? r.json() : [])
      .then(setEntries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Audit Log</h2>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {!loading && entries.length === 0 && <p className="text-gray-500 text-sm">No audit entries.</p>}
      {entries.length > 0 && (
        <div className="rounded-lg border border-gray-800 overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0F1420]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">Time</TableHead>
                <TableHead className="text-gray-400 font-medium">User</TableHead>
                <TableHead className="text-gray-400 font-medium">Action</TableHead>
                <TableHead className="text-gray-400 font-medium">Target</TableHead>
                <TableHead className="text-gray-400 font-medium">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(e => (
                <TableRow key={e.id} className="border-gray-800">
                  <TableCell className="text-gray-300 text-sm whitespace-nowrap">{formatDate(e.created_at)}</TableCell>
                  <TableCell className="text-white text-sm">{e.username}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{e.action}</Badge></TableCell>
                  <TableCell className="text-gray-300 text-sm">{e.target_type ? `${e.target_type}${e.target_id ? `:${e.target_id}` : ''}` : '—'}</TableCell>
                  <TableCell className="text-gray-500 text-xs font-mono">{e.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
