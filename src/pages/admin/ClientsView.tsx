import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { adminFetch, adminFetchJson, formatDate } from './utils';

interface Client {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  lead_id: number | null;
  verified: boolean;
  created_at: string;
}

export default function ClientsView() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProject, setShowProject] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/clients');
      if (res.ok) setClients(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const createProject = async (clientId: number) => {
    if (!projectForm.name.trim()) return;
    setCreating(true);
    try {
      await adminFetchJson(`/api/admin/clients/${clientId}/projects`, {
        name: projectForm.name.trim(),
        description: projectForm.description || null,
      });
      setProjectForm({ name: '', description: '' });
      setShowProject(null);
    } catch { /* ignore */ }
    finally { setCreating(false); }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-white">Clients</h2>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {!loading && clients.length === 0 && <p className="text-gray-500 text-sm">No clients yet. Convert a lead to create one.</p>}

      {clients.length > 0 && (
        <div className="rounded-lg border border-gray-800 overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0F1420]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">Name</TableHead>
                <TableHead className="text-gray-400 font-medium">Email</TableHead>
                <TableHead className="text-gray-400 font-medium">Company</TableHead>
                <TableHead className="text-gray-400 font-medium">Verified</TableHead>
                <TableHead className="text-gray-400 font-medium">Created</TableHead>
                <TableHead className="text-gray-400 font-medium w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{c.name}</TableCell>
                  <TableCell><a href={`mailto:${c.email}`} className="text-indigo-400 hover:text-indigo-300 text-sm">{c.email}</a></TableCell>
                  <TableCell className="text-gray-300 text-sm">{c.company || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={c.verified ? 'default' : 'outline'} className="text-xs">
                      {c.verified ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm">{formatDate(c.created_at)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setShowProject(showProject === c.id ? null : c.id)} className="text-xs text-indigo-400 hover:text-indigo-300">
                      + Project
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create project inline form */}
      {showProject !== null && (
        <div className="border border-gray-800 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-400">
            Create project for client #{showProject}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <Input placeholder="Project name" value={projectForm.name} onChange={e => setProjectForm(f => ({ ...f, name: e.target.value }))} className="w-56 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Input placeholder="Description" value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} className="flex-1 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Button size="sm" onClick={() => createProject(showProject)} disabled={creating || !projectForm.name.trim()}>
              {creating ? 'Creating…' : 'Create'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowProject(null)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
