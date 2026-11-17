import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

export const LandingPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
  return (
    <div className="bg-ambient-glow" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <header
        style={{
          height: '74px',
          padding: '0 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'rgba(249, 250, 247, 0.9)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4A6B53 0%, #3D5944 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 6px 14px rgba(74, 107, 83, 0.25)',
            }}
          >
            <Leaf size={19} strokeWidth={2.4} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
            Grove
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onNavigateToLogin}
            className="btn-secondary"
            style={{
              padding: '8px 18px',
              fontSize: '0.88rem',
              borderRadius: '10px',
            }}
          >
            Log In
          </button>
          <button
            onClick={onNavigateToRegister}
            className="btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.88rem',
              borderRadius: '10px',
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Simple, Fresh Hero (No extra columns or philosophy cards) */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <span className="pill-badge animate-fade-in">
            <Leaf size={14} />
            <span>Simple & Mindful Notes</span>
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            marginBottom: '18px',
          }}
        >
          Where ideas grow <span className="gradient-heading">peacefully.</span>
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: '0 auto 36px',
          }}
        >
          A quiet, minimal space for capturing daily thoughts, tasks, and reflections without distraction.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={onNavigateToRegister}
            className="btn-primary"
            style={{
              padding: '13px 30px',
              fontSize: '1rem',
              borderRadius: '12px',
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={onNavigateToLogin}
            className="btn-secondary"
            style={{
              padding: '13px 26px',
              fontSize: '1rem',
              borderRadius: '12px',
            }}
          >
            Log In
          </button>
        </div>
      </main>
    </div>
  );
};
