import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { type AdminUser, adminFetch } from './utils';
import LoginView from './LoginView';
import LeadsView from './LeadsView';
import KanbanView from './KanbanView';
import AnalyticsView from './AnalyticsView';
import InvoicesView from './InvoicesView';
import ClientsView from './ClientsView';
import SettingsView from './SettingsView';
import UsersView from './UsersView';
import AuditLogView from './AuditLogView';

type AdminTab = 'leads' | 'kanban' | 'analytics' | 'invoices' | 'clients' | 'settings' | 'users' | 'audit';

const Admin = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<AdminTab>('leads');
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adminFetch('/api/admin/me')
      .then(r => { if (!r.ok) throw new Error('No session'); return r.json(); })
      .then(user => { if (!cancelled) setAdminUser(user); })
      .catch(() => { if (!cancelled) setAdminUser(null); })
      .finally(() => { if (!cancelled) setValidating(false); });
    return () => { cancelled = true; };
  }, []);

  const handleLogin = () => {
    adminFetch('/api/admin/me')
      .then(r => r.ok ? r.json() : null)
      .then(user => { if (user) setAdminUser(user); });
  };

  const handleLogout = async () => {
    try {
      const csrfRes = await adminFetch('/api/auth/csrf');
      const { csrfToken } = await csrfRes.json();
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ csrfToken }),
      });
    } catch { /* ignore */ }
    setAdminUser(null);
  };

  if (validating) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Validating session…</p>
      </div>
    );
  }

  if (!adminUser) return <LoginView onLogin={handleLogin} />;

  const isSuperadmin = adminUser.role === 'superadmin';

  const tabs: { key: AdminTab; label: string; superOnly?: boolean }[] = [
    { key: 'leads', label: 'Leads' },
    { key: 'kanban', label: 'Pipeline' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'invoices', label: 'Invoices' },
    { key: 'clients', label: 'Clients' },
    { key: 'settings', label: 'Settings' },
    { key: 'users', label: 'Users', superOnly: true },
    { key: 'audit', label: 'Audit Log', superOnly: true },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-1">
          {tabs
            .filter(t => !t.superOnly || isSuperadmin)
            .map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  tab === t.key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {t.label}
              </button>
            ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {adminUser.username}
            {isSuperadmin && <Badge variant="outline" className="ml-2 text-[10px] py-0">super</Badge>}
          </span>
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

      {tab === 'leads' && <LeadsView onLogout={handleLogout} />}
      {tab === 'kanban' && <KanbanView />}
      {tab === 'analytics' && <AnalyticsView />}
      {tab === 'invoices' && <InvoicesView />}
      {tab === 'clients' && <ClientsView />}
      {tab === 'settings' && <SettingsView />}
      {tab === 'users' && isSuperadmin && <UsersView />}
      {tab === 'audit' && isSuperadmin && <AuditLogView />}
    </div>
  );
};

export default Admin;
