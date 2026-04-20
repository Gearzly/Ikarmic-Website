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
import { adminFetch, adminFetchJson, adminPutJson, formatDate } from './utils';

interface Invoice {
  id: number;
  invoice_number: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  due_date: string | null;
  paid_date: string | null;
  description: string | null;
  lead_id: number | null;
  client_id: number | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-600',
  sent: 'bg-blue-600',
  paid: 'bg-green-600',
  overdue: 'bg-red-600',
  cancelled: 'bg-gray-500',
};

export default function InvoicesView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: '', currency: 'GBP', description: '', due_date: '', lead_id: '', client_id: '' });
  const [saving, setSaving] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/invoices');
      if (res.ok) setInvoices(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const createInvoice = async () => {
    if (!form.amount) return;
    setSaving(true);
    try {
      await adminFetchJson('/api/admin/invoices', {
        amount: parseFloat(form.amount),
        currency: form.currency,
        description: form.description || null,
        due_date: form.due_date || null,
        lead_id: form.lead_id ? parseInt(form.lead_id) : null,
        client_id: form.client_id ? parseInt(form.client_id) : null,
      });
      setForm({ amount: '', currency: 'GBP', description: '', due_date: '', lead_id: '', client_id: '' });
      setShowForm(false);
      fetchInvoices();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    await adminPutJson(`/api/admin/invoices/${id}`, { status });
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: status as Invoice['status'] } : inv));
  };

  const deleteInvoice = async (id: number) => {
    if (!confirm('Delete this invoice?')) return;
    await adminFetch(`/api/admin/invoices/${id}`, { method: 'DELETE' }).catch(() => {});
    fetchInvoices();
  };

  const totalValue = invoices.filter(i => i.status !== 'cancelled').reduce((s, i) => s + i.amount, 0);
  const paidValue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Invoices</h2>
        <Button size="sm" onClick={() => setShowForm(v => !v)}>{showForm ? 'Cancel' : '+ New Invoice'}</Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">Total Invoiced</p>
          <p className="text-lg font-bold text-white">£{totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">Paid</p>
          <p className="text-lg font-bold text-green-400">£{paidValue.toLocaleString()}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">Outstanding</p>
          <p className="text-lg font-bold text-yellow-400">£{(totalValue - paidValue).toLocaleString()}</p>
        </div>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="border border-gray-800 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-400">New Invoice</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <Input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-32 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className="bg-[#0F1420] border border-gray-700 rounded px-3 py-2 text-sm text-white">
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <Input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="w-40 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="flex-1 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Input type="number" placeholder="Lead ID" value={form.lead_id} onChange={e => setForm(f => ({ ...f, lead_id: e.target.value }))} className="w-24 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Input type="number" placeholder="Client ID" value={form.client_id} onChange={e => setForm(f => ({ ...f, client_id: e.target.value }))} className="w-24 bg-[#0F1420] border-gray-700 text-white text-sm" />
            <Button size="sm" onClick={createInvoice} disabled={saving || !form.amount}>{saving ? 'Creating…' : 'Create'}</Button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}
      {!loading && invoices.length === 0 && <p className="text-gray-500 text-sm">No invoices yet.</p>}
      {invoices.length > 0 && (
        <div className="rounded-lg border border-gray-800 overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0F1420]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">#</TableHead>
                <TableHead className="text-gray-400 font-medium">Amount</TableHead>
                <TableHead className="text-gray-400 font-medium">Status</TableHead>
                <TableHead className="text-gray-400 font-medium">Due</TableHead>
                <TableHead className="text-gray-400 font-medium">Description</TableHead>
                <TableHead className="text-gray-400 font-medium">Created</TableHead>
                <TableHead className="text-gray-400 font-medium w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(inv => (
                <TableRow key={inv.id} className="border-gray-800">
                  <TableCell className="text-white text-sm font-mono">{inv.invoice_number}</TableCell>
                  <TableCell className="text-white text-sm font-medium">
                    {inv.currency === 'GBP' ? '£' : inv.currency === 'USD' ? '$' : '€'}{inv.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs text-white ${STATUS_COLORS[inv.status] ?? 'bg-gray-600'}`}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm">{inv.due_date ? inv.due_date.slice(0, 10) : '—'}</TableCell>
                  <TableCell className="text-gray-300 text-sm max-w-[200px] truncate">{inv.description || '—'}</TableCell>
                  <TableCell className="text-gray-300 text-sm">{formatDate(inv.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <select
                        value={inv.status}
                        onChange={e => updateStatus(inv.id, e.target.value)}
                        className="bg-[#0F1420] border border-gray-700 rounded px-1.5 py-0.5 text-xs text-white"
                      >
                        <option value="draft">draft</option>
                        <option value="sent">sent</option>
                        <option value="paid">paid</option>
                        <option value="overdue">overdue</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                      <Button variant="ghost" size="sm" onClick={() => deleteInvoice(inv.id)} className="text-red-400 hover:text-red-300 text-xs px-1.5 h-6">✕</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
