import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { type Project, portalFetch, formatDate } from './utils';

export default function Projects({ onSelect }: { onSelect: (id: number) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch('/api/portal/projects')
      .then(r => r.ok ? r.json() : [])
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 text-sm p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Projects</h2>
      {projects.length === 0 && <p className="text-gray-500 text-sm">No projects yet.</p>}
      <div className="space-y-3">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className="w-full text-left bg-[#0A0E1A] border border-gray-800 rounded-lg p-4 hover:border-indigo-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-white font-medium">{p.name}</p>
              <Badge variant={p.status === 'active' ? 'default' : 'outline'} className="text-xs">{p.status}</Badge>
            </div>
            {p.description && <p className="text-xs text-gray-400 mt-1">{p.description}</p>}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              {p.start_date && <span>Started {p.start_date.slice(0, 10)}</span>}
              <span>Created {formatDate(p.created_at)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
