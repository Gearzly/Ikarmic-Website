// Shared helpers for portal pages

export interface PortalUser {
  id: number;
  name: string;
  email: string;
  company: string | null;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface PortalInvoice {
  id: number;
  number: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string | null;
  paid_date: string | null;
  description: string | null;
  created_at: string;
}

export interface Message {
  id: number;
  project_id: number | null;
  sender_type: 'client' | 'admin';
  message: string;
  read_at: string | null;
  created_at: string;
}

export interface Document {
  id: number;
  name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  project_id: number | null;
  created_at: string;
}

export function portalFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('portal_token');
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export function portalPost(url: string, body: unknown) {
  const token = localStorage.getItem('portal_token');
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function portalLogout() {
  const token = localStorage.getItem('portal_token');
  if (token) {
    fetch('/api/portal/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }
  localStorage.removeItem('portal_token');
}
