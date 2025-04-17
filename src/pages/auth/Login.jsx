
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Email atau password salah');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Masukkan email Anda');
      return;
    }
    try {
      setIsResetting(true);
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err) {
      setError('Email tidak ditemukan');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-[400px] p-8 bg-card rounded-xl shadow-lg border border-border/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-primary">Govnetic</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isResetting ? 'Reset Password' : 'Login untuk melanjutkan'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 text-sm bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {resetSent && (
          <div className="mb-6 p-3 text-sm bg-emerald-500/10 text-emerald-500 rounded-lg">
            Link reset password telah dikirim ke email Anda
          </div>
        )}

        {!isResetting ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-3 py-2.5 bg-background border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => setIsResetting(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Lupa password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-3 py-2.5 bg-background border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Masuk
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-3 py-2.5 bg-background border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsResetting(false)}
                className="flex-1 py-2.5 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
