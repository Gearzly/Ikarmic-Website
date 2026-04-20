import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { TableRow, TableCell } from '../../../components/ui/table';
import NotesPanel from './NotesPanel';
import ActivityTimeline from './ActivityTimeline';
import {
  type Lead,
  STAGES,
  formatDate,
  formatDateInput,
  isOverdue,
  sourceLabel,
  sourceVariant,
  adminFetch,
  adminPutJson,
} from '../utils';

export default function LeadRow({
  lead,
  onUpdate,
}: {
  lead: Lead;
  onUpdate: (updated: Partial<Lead> & { id: number }) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [editValue, setEditValue] = useState(lead.deal_value != null ? String(lead.deal_value) : '');
  const [editFollowUp, setEditFollowUp] = useState(formatDateInput(lead.follow_up_at));
  const [editTags, setEditTags] = useState((lead.tags ?? []).join(', '));

  const updateStage = async (stage: string) => {
    await adminPutJson(`/api/admin/leads/${lead.id}/stage`, { stage }).catch(() => {});
    onUpdate({ id: lead.id, stage });
  };

  const markRead = async () => {
    await adminFetch(`/api/admin/leads/${lead.id}/read`, { method: 'PUT' }).catch(() => {});
    onUpdate({ id: lead.id, read_at: new Date().toISOString() });
  };

  const saveValue = async () => {
    const v = editValue === '' ? null : parseInt(editValue, 10);
    if (v !== null && (isNaN(v) || v < 0)) return;
    await adminPutJson(`/api/admin/leads/${lead.id}/value`, { deal_value: v }).catch(() => {});
    onUpdate({ id: lead.id, deal_value: v });
  };

  const saveFollowUp = async () => {
    await adminPutJson(`/api/admin/leads/${lead.id}/followup`, { follow_up_at: editFollowUp || null }).catch(() => {});
    onUpdate({ id: lead.id, follow_up_at: editFollowUp || null });
  };

  const saveTags = async () => {
    const tags = editTags.split(',').map((t) => t.trim()).filter(Boolean);
    await adminPutJson(`/api/admin/leads/${lead.id}/tags`, { tags }).catch(() => {});
    onUpdate({ id: lead.id, tags });
  };

  const overdue = isOverdue(lead.follow_up_at);

  return (
    <>
      <TableRow
        className={`border-gray-800 transition-colors ${
          lead.read_at ? 'opacity-60' : 'bg-[#0A0E1A]'
        }${overdue ? ' border-l-2 border-l-red-600' : ''}`}
      >
        <TableCell className="text-gray-300 text-sm whitespace-nowrap">{formatDate(lead.created_at)}</TableCell>
        <TableCell>
          <Badge variant={sourceVariant(lead.source)} className="text-xs">{sourceLabel(lead.source)}</Badge>
          {lead.utm_source && (
            <span className="block text-xs text-gray-600 mt-0.5" title={[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / ')}>
              utm: {lead.utm_source}
            </span>
          )}
        </TableCell>
        <TableCell>
          <select
            value={lead.stage}
            onChange={(e) => updateStage(e.target.value)}
            className="bg-[#0F1420] border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            style={{ color: STAGES.find((s) => s.value === lead.stage)?.color ?? '#fff' }}
          >
            {STAGES.map((s) => (
              <option key={s.value} value={s.value} style={{ color: s.color }}>{s.label}</option>
            ))}
          </select>
        </TableCell>
        <TableCell className="text-white font-medium">{lead.name}</TableCell>
        <TableCell>
          <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:text-indigo-300 text-sm">{lead.email}</a>
        </TableCell>
        <TableCell className="text-gray-300 text-sm">{lead.company || '—'}</TableCell>
        <TableCell>
          <input
            type="number"
            min="0"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveValue}
            placeholder="—"
            className="w-20 bg-transparent border-b border-gray-700 text-sm text-gray-300 focus:outline-none focus:border-indigo-500 py-0.5"
          />
        </TableCell>
        <TableCell>
          <input
            type="date"
            value={editFollowUp}
            onChange={(e) => setEditFollowUp(e.target.value)}
            onBlur={saveFollowUp}
            className={`bg-transparent border-b text-xs focus:outline-none py-0.5 ${
              overdue ? 'border-red-500 text-red-400' : 'border-gray-700 text-gray-300 focus:border-indigo-500'
            }`}
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            onBlur={saveTags}
            placeholder="tag1, tag2"
            className="w-28 bg-transparent border-b border-gray-700 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 py-0.5"
          />
        </TableCell>
        <TableCell className="text-gray-300 text-sm max-w-[200px]">
          <span title={lead.message}>{lead.message.length > 60 ? lead.message.slice(0, 60) + '…' : lead.message}</span>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)} className={`text-xs px-2 h-7 ${expanded ? 'text-indigo-300' : 'text-gray-400 hover:text-white'}`}>
              Notes{expanded ? ' ▲' : ' ▼'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowActivity((v) => !v)} className={`text-xs px-2 h-7 ${showActivity ? 'text-indigo-300' : 'text-gray-400 hover:text-white'}`}>
              Activity
            </Button>
            {!lead.read_at && (
              <Button variant="ghost" size="sm" onClick={markRead} className="text-xs text-indigo-400 hover:text-indigo-300 px-2 h-7">
                Read
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow className="border-gray-800">
          <TableCell colSpan={11} className="p-0"><NotesPanel leadId={lead.id} /></TableCell>
        </TableRow>
      )}
      {showActivity && (
        <TableRow className="border-gray-800">
          <TableCell colSpan={11} className="p-0"><ActivityTimeline leadId={lead.id} /></TableCell>
        </TableRow>
      )}
    </>
  );
}
