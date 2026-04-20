import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { adminFetch, adminPutJson, formatDate } from './utils';

interface SiteSetting {
  key: string;
  value: string;
  group: string;
  updated_at: string;
}

export default function SettingsView() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newGroup, setNewGroup] = useState('general');

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/settings');
      if (res.ok) setSettings(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const saveSetting = async (key: string) => {
    const value = edits[key];
    if (value === undefined) return;
    setSaving(true);
    try {
      await adminPutJson(`/api/admin/settings/${encodeURIComponent(key)}`, { value, group: settings.find(s => s.key === key)?.group ?? 'general' });
      setEdits(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
      fetchSettings();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const addSetting = async () => {
    if (!newKey.trim()) return;
    setSaving(true);
    try {
      await adminPutJson(`/api/admin/settings/${encodeURIComponent(newKey.trim())}`, { value: newValue, group: newGroup });
      setNewKey('');
      setNewValue('');
      fetchSettings();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const deleteSetting = async (key: string) => {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await adminFetch(`/api/admin/settings/${encodeURIComponent(key)}`, { method: 'DELETE' }).catch(() => {});
    fetchSettings();
  };

  const groups = [...new Set(settings.map(s => s.group))].sort();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-white">Site Settings</h2>
      {loading && <p className="text-gray-400 text-sm">Loading…</p>}

      {groups.map(group => (
        <div key={group} className="space-y-2">
          <h3 className="text-sm font-medium text-indigo-400 uppercase tracking-wider">{group}</h3>
          <div className="rounded-lg border border-gray-800 divide-y divide-gray-800">
            {settings.filter(s => s.group === group).map(s => (
              <div key={s.key} className="flex items-center gap-3 px-4 py-3">
                <span className="text-sm text-gray-300 font-mono min-w-[200px]">{s.key}</span>
                <input
                  type="text"
                  value={edits[s.key] ?? s.value}
                  onChange={e => setEdits(prev => ({ ...prev, [s.key]: e.target.value }))}
                  className="flex-1 bg-[#0F1420] border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {edits[s.key] !== undefined && (
                  <Button size="sm" onClick={() => saveSetting(s.key)} disabled={saving}>Save</Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => deleteSetting(s.key)} className="text-red-400 hover:text-red-300">✕</Button>
                <span className="text-xs text-gray-600">{formatDate(s.updated_at)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border border-gray-800 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-400">Add new setting</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <Input placeholder="Key" value={newKey} onChange={e => setNewKey(e.target.value)} className="w-48 bg-[#0F1420] border-gray-700 text-white text-sm" />
          <Input placeholder="Value" value={newValue} onChange={e => setNewValue(e.target.value)} className="flex-1 bg-[#0F1420] border-gray-700 text-white text-sm" />
          <Input placeholder="Group" value={newGroup} onChange={e => setNewGroup(e.target.value)} className="w-32 bg-[#0F1420] border-gray-700 text-white text-sm" />
          <Button size="sm" onClick={addSetting} disabled={saving || !newKey.trim()}>Add</Button>
        </div>
      </div>
    </div>
  );
}
