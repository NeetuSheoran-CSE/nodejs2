import React, { useState } from 'react';
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = ({ onNavigateToRegister, onNavigateToHome }) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      showToast('Welcome back to Grove!', 'success');
    } else {
      setErrorMessage(result.message);
      showToast(result.message, 'error');
    }
  };

  return (
    <div
      className="bg-ambient-glow"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
      }}
    >
      {/* Back to Home Button */}
      {onNavigateToHome && (
        <button
          onClick={onNavigateToHome}
          className="btn-ghost"
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      )}

      {/* Brand Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px',
          cursor: 'pointer',
        }}
        onClick={onNavigateToHome}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4A6B53 0%, #3D5944 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 8px 18px rgba(74, 107, 83, 0.28)',
          }}
        >
          <Leaf size={20} strokeWidth={2.4} />
        </div>
        <span
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.025em',
          }}
        >
          Grove
        </span>
      </div>

      {/* Clean Spacious Card */}
      <div
        className="card-clean animate-slide-down"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Welcome back
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Enter your credentials to access your notes
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.86rem',
              fontWeight: 500,
              marginBottom: '20px',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '7px',
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)',
                  display: 'flex',
                }}
              >
                <Mail size={17} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input-field"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          {/* Password field with Show/Hide toggle */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '7px',
              }}
            >
              <label
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)',
                  display: 'flex',
                }}
              >
                <Lock size={17} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                style={{ paddingLeft: '42px', paddingRight: '40px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  padding: '2px',
                  display: 'flex',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--primary)',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="rememberMe"
              style={{ fontSize: '0.84rem', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Remember me on this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '0.96rem',
              borderRadius: '12px',
              marginTop: '4px',
            }}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Grove</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Switch to Register */}
        <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <button
            onClick={onNavigateToRegister}
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Create free space
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 38, 31, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="animate-slide-down card-clean"
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              Reset Password
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              If you have forgotten your password, you can register a new Grove account or contact your administrator.
            </p>
            <button
              onClick={() => setShowForgotModal(false)}
              className="btn-primary"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
