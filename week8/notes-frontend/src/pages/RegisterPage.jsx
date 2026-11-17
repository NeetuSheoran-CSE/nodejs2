import React, { useState } from 'react';
import {
  Leaf,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage = ({ onNavigateToLogin, onNavigateToHome }) => {
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: '#E2E8DF', width: '0%' };
    if (password.length < 5) return { label: 'Weak', color: '#DC2626', width: '33%' };
    if (password.length < 8) return { label: 'Medium', color: '#B45309', width: '66%' };
    return { label: 'Strong', color: '#15803D', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      showToast('Welcome to Grove! Please sign in.', 'success');
      onNavigateToLogin();
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
      {/* Back to Home */}
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
          maxWidth: '460px',
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
            Create your space
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Start capturing and growing your ideas in Grove
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Full Name */}
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
              Full Name
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
                <User size={17} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="input-field"
                style={{ paddingLeft: '42px' }}
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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
              Password
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
                <Lock size={17} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
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
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Password strength bar */}
            {password && (
              <div style={{ marginTop: '7px' }}>
                <div
                  style={{
                    height: '4px',
                    backgroundColor: 'var(--border)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: strength.width,
                      backgroundColor: strength.color,
                      transition: 'var(--transition)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: strength.color, fontWeight: 600 }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
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
              Confirm Password
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
                <Lock size={17} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="input-field"
                style={{ paddingLeft: '42px', paddingRight: '40px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
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
              marginTop: '6px',
            }}
          >
            {loading ? (
              <span>Creating your space...</span>
            ) : (
              <>
                <span>Join Grove Free</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <button
            onClick={onNavigateToLogin}
            style={{
              color: 'var(--primary)',
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
