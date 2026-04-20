import { useState, useEffect, useCallback } from 'react';
import { Badge } from '../../components/ui/badge';
import { type Lead, STAGES, adminFetch, adminPutJson } from './utils';

export default function KanbanView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/leads');
      if (res.ok) setLeads(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleDrop = async (stage: string) => {
    if (draggedId === null) return;
    const lead = leads.find(l => l.id === draggedId);
    if (!lead || lead.stage === stage) { setDraggedId(null); return; }
    setLeads(prev => prev.map(l => l.id === draggedId ? { ...l, stage } : l));
    setDraggedId(null);
    await adminPutJson(`/api/admin/leads/${draggedId}/stage`, { stage }).catch(() => {});
  };

  if (loading) return <div className="p-6"><p className="text-gray-400 text-sm">Loading pipeline…</p></div>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Pipeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-[60vh]">
        {STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.stage === stage.value);
          return (
            <div
              key={stage.value}
              className="bg-[#0A0E1A] border border-gray-800 rounded-lg flex flex-col"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(stage.value)}
            >
              <div className="px-3 py-2 border-b border-gray-800 flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: stage.color }}>{stage.label}</span>
                <Badge variant="outline" className="text-xs">{stageLeads.length}</Badge>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[65vh]">
                {stageLeads.map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setDraggedId(lead.id)}
                    className={`bg-[#0F1420] border border-gray-700 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-indigo-600 transition-colors ${
                      draggedId === lead.id ? 'opacity-50' : ''
                    }`}
                  >
                    <p className="text-sm text-white font-medium truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.email}</p>
                    {lead.company && <p className="text-xs text-gray-500 truncate">{lead.company}</p>}
                    <div className="flex items-center justify-between mt-2">
                      {lead.deal_value != null && (
                        <span className="text-xs text-green-400 font-medium">£{lead.deal_value.toLocaleString()}</span>
                      )}
                      {lead.tags && lead.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {lead.tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <p className="text-xs text-gray-600 text-center py-4">No leads</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
