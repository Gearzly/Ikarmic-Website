import { useState, useEffect } from 'react';
import { Badge } from '../../../components/ui/badge';
import { adminFetch, formatDate } from '../utils';

interface Activity {
  id: number;
  type: string;
  summary: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const typeIcons: Record<string, string> = {
  stage_change: '🔄',
  note_added: '📝',
  email_sent: '✉️',
  converted_to_client: '🎉',
};

export default function ActivityTimeline({ leadId }: { leadId: number }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch(`/api/admin/leads/${leadId}/activity`)
      .then((r) => r.ok ? r.json() : [])
      .then(setActivities)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [leadId]);

  if (loading) return <p className="text-xs text-gray-500 p-4">Loading activity…</p>;
  if (activities.length === 0) return <p className="text-xs text-gray-500 p-4">No activity yet.</p>;

  return (
    <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
      {activities.map((a) => (
        <div key={a.id} className="flex items-start gap-3">
          <span className="text-sm mt-0.5">{typeIcons[a.type] ?? '•'}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{a.type.replace(/_/g, ' ')}</Badge>
              <span className="text-xs text-gray-500">{formatDate(a.created_at)}</span>
            </div>
            <p className="text-sm text-gray-300 mt-0.5 truncate">{a.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
