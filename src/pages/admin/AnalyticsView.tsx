import { useState, useEffect } from 'react';
import { Badge } from '../../components/ui/badge';
import { STAGES, adminFetch } from './utils';

interface AnalyticsData {
  pipeline: { stage: string; count: number }[];
  monthly: { month: string; count: number }[];
  total_value: number;
  overdue_followups: number;
  avg_response_hours: number | null;
}

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch('/api/admin/analytics')
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6"><p className="text-gray-400 text-sm">Loading analytics…</p></div>;
  if (!data) return <div className="p-6"><p className="text-red-400 text-sm">Failed to load analytics.</p></div>;

  const maxCount = Math.max(...data.pipeline.map(p => p.count), 1);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-lg font-semibold text-white">Analytics</h2>

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-white mt-1">£{(data.total_value ?? 0).toLocaleString()}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Overdue Follow-ups</p>
          <p className="text-2xl font-bold text-white mt-1">{data.overdue_followups}</p>
        </div>
        <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Avg Response Time</p>
          <p className="text-2xl font-bold text-white mt-1">
            {data.avg_response_hours != null ? `${Math.round(data.avg_response_hours)}h` : '—'}
          </p>
        </div>
      </div>

      {/* Pipeline funnel */}
      <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Pipeline Stages</h3>
        <div className="space-y-3">
          {data.pipeline.map(p => {
            const stage = STAGES.find(s => s.value === p.stage);
            const pct = Math.round((p.count / maxCount) * 100);
            return (
              <div key={p.stage} className="flex items-center gap-3">
                <span className="text-sm w-24 text-right" style={{ color: stage?.color ?? '#fff' }}>
                  {stage?.label ?? p.stage}
                </span>
                <div className="flex-1 h-6 bg-[#0F1420] rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all"
                    style={{ width: `${pct}%`, backgroundColor: stage?.color ?? '#6366f1' }}
                  />
                </div>
                <Badge variant="outline" className="text-xs min-w-[32px] justify-center">{p.count}</Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly trend */}
      <div className="bg-[#0A0E1A] border border-gray-800 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Monthly Leads (last 6 months)</h3>
        {data.monthly.length === 0 ? (
          <p className="text-gray-500 text-sm">No data yet.</p>
        ) : (
          <div className="flex items-end gap-2 h-32">
            {data.monthly.map(m => {
              const max = Math.max(...data.monthly.map(x => x.count), 1);
              const h = Math.round((m.count / max) * 100);
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400">{m.count}</span>
                  <div className="w-full bg-indigo-600 rounded-t" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-gray-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
