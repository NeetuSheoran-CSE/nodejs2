import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Server,
  Download,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const SettingsModal = ({ isOpen, onClose, notes = [] }) => {
  const { user, updateUserProfile, backendStatus, verifyBackend, token } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [testingConnection, setTestingConnection] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty', 'warning');
      return;
    }
    updateUserProfile({ name: name.trim() });
    showToast('Profile name updated successfully!', 'success');
  };

  const handleTestBackend = async () => {
    setTestingConnection(true);
    await verifyBackend();
    setTestingConnection(false);
    showToast(
      backendStatus.online ? 'Backend connection healthy on port 8080!' : 'Backend is currently offline or unreachable',
      backendStatus.online ? 'success' : 'warning'
    );
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auranotes_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported all notes successfully!', 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(37, 33, 59, 0.45)',
        backdropFilter: 'blur(5px)',
        zIndex: 92,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-down card-clean"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9FD',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Account & App Settings
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Preferences and backend connectivity details
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Profile Section */}
          <form onSubmit={handleSaveProfile}>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
              User Profile
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Display Name
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Email Address (Registered Account)
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-field"
                  style={{ backgroundColor: 'var(--surface-alt)', cursor: 'not-allowed', color: 'var(--text-muted)' }}
                />
              </div>
            </div>
          </form>

          {/* Backend Connection Diagnostics */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={15} color="var(--primary)" />
                <span>Backend API Integration</span>
              </h4>
              <button
                type="button"
                onClick={handleTestBackend}
                disabled={testingConnection}
                className="btn-ghost"
                style={{ fontSize: '0.78rem', padding: '4px 8px' }}
              >
                <RefreshCw size={13} className={testingConnection ? 'animate-spin' : ''} />
                <span>Test Connection</span>
              </button>
            </div>

            <div
              style={{
                backgroundColor: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.82rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Backend URL:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontFamily: 'monospace' }}>
                  http://localhost:8080
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service Status:</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: backendStatus.online ? '#10B981' : '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: backendStatus.online ? '#10B981' : '#F59E0B',
                    }}
                  />
                  {backendStatus.online ? 'Online & Responsive' : 'Port 8080 Active'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Auth Token:</span>
                <span style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>{token ? 'Authenticated (Active JWT)' : 'None'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Backup / Export */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              Data Export & Backup
            </h4>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--text-main)' }}>
                  Export Notes Backup
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Download a JSON archive of all your saved notes ({notes.length} total)
                </div>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                <Download size={14} />
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#FAF9FD',
          }}
        >
          <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '7px 18px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
