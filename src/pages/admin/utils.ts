// Shared types, constants, and helpers for admin pages

export interface AdminUser {
  id: number;
  username: string;
  role: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  source: string;
  created_at: string;
  read_at: string | null;
  stage: string;
  deal_value: number | null;
  tags: string[] | null;
  follow_up_at: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface Note {
  id: number;
  note: string;
  created_at: string;
}

export type Stage = 'new' | 'qualified' | 'proposal' | 'won' | 'lost';

export const STAGES: { value: Stage; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: '#818cf8' },
  { value: 'qualified', label: 'Qualified', color: '#c084fc' },
  { value: 'proposal', label: 'Proposal', color: '#fbbf24' },
  { value: 'won', label: 'Won', color: '#4ade80' },
  { value: 'lost', label: 'Lost', color: '#6b7280' },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateInput(iso: string | null) {
  if (!iso) return '';
  return iso.slice(0, 10);
}

export function isOverdue(follow_up_at: string | null) {
  if (!follow_up_at) return false;
  return new Date(follow_up_at) < new Date();
}

export function sourceLabel(source: string) {
  if (source === 'contact-page') return 'Contact';
  if (source === 'home-cta') return 'Home CTA';
  return source;
}

export function sourceVariant(source: string): 'default' | 'secondary' | 'outline' {
  if (source === 'contact-page') return 'default';
  if (source === 'home-cta') return 'secondary';
  return 'outline';
}

// Authenticated fetch helpers — send session cookie automatically
export function adminFetch(url: string, options: RequestInit = {}) {
  return fetch(url, { ...options, credentials: 'include' });
}

export function adminFetchJson(url: string, body: unknown) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
}

export function adminPutJson(url: string, body: unknown) {
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
}
