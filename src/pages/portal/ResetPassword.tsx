import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!token) { setError('Invalid reset link.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/portal/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Reset failed. The link may have expired.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold text-white">Password Reset</h1>
          <p className="text-sm text-gray-400">Your password has been updated. You can now sign in.</p>
          <a href="/portal" className="text-indigo-400 hover:text-indigo-300 text-sm">Go to sign in →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white tracking-tight text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="password" placeholder="New password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)} required className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
          <Input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="bg-[#0F1420] border-gray-700 text-white placeholder:text-gray-500" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Resetting…' : 'Reset password'}</Button>
        </form>
      </div>
    </div>
  );
}
