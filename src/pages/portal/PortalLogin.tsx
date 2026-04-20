import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function PortalLogin({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Login failed.');
        return;
      }
      const { token } = await res.json();
      localStorage.setItem('portal_token', token);
      onLogin();
    } catch {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Registration failed.');
        return;
      }
      const { token } = await res.json();
      localStorage.setItem('portal_token', token);
      onLogin();
    } catch {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/portal/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess('If an account exists with that email, a reset link has been sent.');
      } else {
        setSuccess('If an account exists with that email, a reset link has been sent.');
      }
    } catch {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Client Portal</h1>
          <p className="mt-1 text-sm text-gray-400">
            {mode === 'login' && 'Sign in to view your projects'}
            {mode === 'register' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </p>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
            <div className="flex justify-between text-xs">
              <button type="button" onClick={() => { setMode('register'); setError(''); }} className="text-indigo-400 hover:text-indigo-300">Create account</button>
              <button type="button" onClick={() => { setMode('forgot'); setError(''); }} className="text-gray-400 hover:text-white">Forgot password?</button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <Input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required autoFocus className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            <Input type="password" placeholder="Password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)} required className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
            <button type="button" onClick={() => { setMode('login'); setError(''); }} className="text-xs text-indigo-400 hover:text-indigo-300">Back to sign in</button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-400">{success}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</Button>
            <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="text-xs text-indigo-400 hover:text-indigo-300">Back to sign in</button>
          </form>
        )}
      </div>
    </div>
  );
}
