import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { type PortalInvoice, portalFetch, formatDate } from './utils';

export default function Invoices() {
  const [invoices, setInvoices] = useState<PortalInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch('/api/portal/invoices')
      .then(r => r.ok ? r.json() : [])
      .then(setInvoices)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;

  const statusColor: Record<string, string> = {
    draft: 'bg-gray-600',
    sent: 'bg-blue-600',
    paid: 'bg-green-600',
    overdue: 'bg-red-600',
    cancelled: 'bg-gray-500',
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Invoices</h2>
      {invoices.length === 0 && <p className="text-gray-500 text-sm">No invoices.</p>}
      <div className="space-y-2">
        {invoices.map(i => (
          <div key={i.id} className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-mono">{i.number}</p>
              <p className="text-xs text-gray-400 mt-0.5">{i.description || 'No description'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(i.created_at)}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-white font-medium">
                {i.currency === 'GBP' ? '£' : i.currency === 'USD' ? '$' : '€'}{i.amount.toLocaleString()}
              </p>
              <Badge className={`text-xs text-white ${statusColor[i.status] ?? 'bg-gray-600'}`}>{i.status}</Badge>
              {i.due_date && <p className="text-xs text-gray-500">Due {i.due_date.slice(0, 10)}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
