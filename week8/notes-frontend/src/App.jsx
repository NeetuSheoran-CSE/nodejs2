import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { Leaf } from 'lucide-react';

const MainRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'landing'

  if (isLoading) {
    return (
      <div
        className="bg-ambient-glow"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4A6B53 0%, #3D5944 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-olive)',
            animation: 'pulseGlow 1.8s infinite ease-in-out',
          }}
        >
          <Leaf size={26} strokeWidth={2.4} />
        </div>
        <div style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Loading your workspace...
        </div>
      </div>
    );
  }

  // Protected route logic: if authenticated, render Dashboard directly
  if (isAuthenticated) {
    return <DashboardPage />;
  }

  // Unauthenticated routing:
  if (authView === 'register') {
    return (
      <RegisterPage
        onNavigateToLogin={() => setAuthView('login')}
        onNavigateToHome={() => setAuthView('landing')}
      />
    );
  }

  if (authView === 'landing') {
    return (
      <LandingPage
        onNavigateToLogin={() => setAuthView('login')}
        onNavigateToRegister={() => setAuthView('register')}
      />
    );
  }

  // Default: Direct, clean, simple Login
  return (
    <LoginPage
      onNavigateToRegister={() => setAuthView('register')}
      onNavigateToHome={() => setAuthView('landing')}
    />
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ToastProvider>
  );
}
