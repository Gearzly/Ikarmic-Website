import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { type PortalUser, portalFetch, portalLogout } from './utils';
import PortalLogin from './PortalLogin';
import Dashboard from './Dashboard';
import Projects from './Projects';
import ProjectDetail from './ProjectDetail';
import Invoices from './Invoices';
import Messages from './Messages';
import Documents from './Documents';

type PortalTab = 'dashboard' | 'projects' | 'invoices' | 'messages' | 'documents';

const Portal = () => {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [validating, setValidating] = useState(() => !!localStorage.getItem('portal_token'));
  const [tab, setTab] = useState<PortalTab>('dashboard');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('portal_token');
    if (!token) return;
    let cancelled = false;
    portalFetch('/api/portal/me')
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(u => { if (!cancelled) setUser(u); })
      .catch(() => { if (!cancelled) localStorage.removeItem('portal_token'); })
      .finally(() => { if (!cancelled) setValidating(false); });
    return () => { cancelled = true; };
  }, []);

  const handleLogin = () => {
    portalFetch('/api/portal/me')
      .then(r => r.ok ? r.json() : null)
      .then(u => { if (u) setUser(u); });
  };

  const handleLogout = () => {
    portalLogout();
    setUser(null);
  };

  if (validating) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) return <PortalLogin onLogin={handleLogin} />;

  const tabs: { key: PortalTab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'projects', label: 'Projects' },
    { key: 'invoices', label: 'Invoices' },
    { key: 'messages', label: 'Messages' },
    { key: 'documents', label: 'Documents' },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSelectedProject(null); }}
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
          <span className="text-xs text-gray-400">{user.name}</span>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
            Sign out
          </Button>
        </div>
      </header>

      {tab === 'dashboard' && <Dashboard />}
      {tab === 'projects' && !selectedProject && <Projects onSelect={id => setSelectedProject(id)} />}
      {tab === 'projects' && selectedProject && <ProjectDetail projectId={selectedProject} onBack={() => setSelectedProject(null)} />}
      {tab === 'invoices' && <Invoices />}
      {tab === 'messages' && <Messages />}
      {tab === 'documents' && <Documents />}
    </div>
  );
};

export default Portal;
