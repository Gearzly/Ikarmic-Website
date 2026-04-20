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

interface AdminUserEntry {
  id: number;
  username: string;
  role: string;
  created_at: string;
  last_login_at: string | null;
}

export default function UsersView() {
  const [users, setUsers] = useState<AdminUserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const createUser = async () => {
    if (!newUsername.trim() || newPassword.length < 8) {
      setError('Username required and password must be at least 8 characters.');
      return;
    }
    setCreating(true);
    setError('');
    try {
      const res = await adminFetchJson('/api/admin/users', { username: newUsername.trim(), password: newPassword, role: newRole });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to create user.');
        return;
      }
      setNewUsername('');
      setNewPassword('');
      fetchUsers();
    } catch { setError('Connection error.'); }
    finally { setCreating(false); }
  };

  const deleteUser = async (id: number, username: string) => {
    if (!confirm(`Delete admin user "${username}"? This cannot be undone.`)) return;
    await adminFetch(`/api/admin/users/${id}`, { method: 'DELETE' }).catch(() => {});
    fetchUsers();
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-white">Admin Users</h2>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}

      {users.length > 0 && (
        <div className="rounded-lg border border-gray-800 overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0F1420]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">Username</TableHead>
                <TableHead className="text-gray-400 font-medium">Role</TableHead>
                <TableHead className="text-gray-400 font-medium">Created</TableHead>
                <TableHead className="text-gray-400 font-medium">Last login</TableHead>
                <TableHead className="text-gray-400 font-medium w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{u.username}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'superadmin' ? 'default' : 'secondary'} className="text-xs">{u.role}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm">{formatDate(u.created_at)}</TableCell>
                  <TableCell className="text-gray-300 text-sm">{u.last_login_at ? formatDate(u.last_login_at) : '—'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => deleteUser(u.id, u.username)} className="text-red-400 hover:text-red-300 text-xs">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="border border-gray-800 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-400">Create admin user</h3>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex items-center gap-3 flex-wrap">
          <Input placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-40 bg-[#0F1420] border-gray-700 text-white text-sm" />
          <Input type="password" placeholder="Password (min 8)" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-48 bg-[#0F1420] border-gray-700 text-white text-sm" />
          <select
            value={newRole}
            onChange={e => setNewRole(e.target.value)}
            className="bg-[#0F1420] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
          <Button size="sm" onClick={createUser} disabled={creating}>{creating ? 'Creating…' : 'Create'}</Button>
        </div>
      </div>
    </div>
  );
}
