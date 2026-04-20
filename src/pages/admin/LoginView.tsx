import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function LoginView({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const csrfRes = await fetch('/api/auth/csrf', { credentials: 'include' });
      const { csrfToken } = await csrfRes.json();

      await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ csrfToken, username, password }),
        redirect: 'manual',
      });

      const sessionRes = await fetch('/api/auth/session', { credentials: 'include' });
      const session = await sessionRes.json();
      if (session?.user) {
        onLogin();
      } else {
        setError('Invalid username or password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-gray-400">Ikarmic leads dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            autoComplete="username"
            required
            className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
