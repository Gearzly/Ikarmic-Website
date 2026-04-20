import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { type Project, type PortalInvoice, portalFetch, formatDate } from './utils';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<PortalInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      portalFetch('/api/portal/projects').then(r => r.ok ? r.json() : []),
      portalFetch('/api/portal/invoices').then(r => r.ok ? r.json() : []),
    ])
      .then(([p, i]) => { setProjects(p); setInvoices(i); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;

  const activeProjects = projects.filter(p => p.status === 'active');
  const unpaidInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'overdue');
  const totalOwed = unpaidInvoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-white">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Active Projects</p>
          <p className="text-2xl font-bold text-white mt-1">{activeProjects.length}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Unpaid Invoices</p>
          <p className="text-2xl font-bold text-white mt-1">{unpaidInvoices.length}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Amount Due</p>
          <p className="text-2xl font-bold text-white mt-1">£{totalOwed.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent projects */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Projects</h3>
          <div className="space-y-2">
            {projects.slice(0, 5).map(p => (
              <div key={p.id} className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">{p.name}</p>
                  {p.description && <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>}
                </div>
                <Badge variant={p.status === 'active' ? 'default' : 'outline'} className="text-xs">{p.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent invoices */}
      {unpaidInvoices.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Outstanding Invoices</h3>
          <div className="space-y-2">
            {unpaidInvoices.slice(0, 5).map(i => (
              <div key={i.id} className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-mono">{i.number}</p>
                  <p className="text-xs text-gray-400">{i.description || 'No description'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-medium">£{i.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{i.due_date ? `Due ${formatDate(i.due_date)}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
