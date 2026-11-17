import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Star,
  Trash2,
  Settings,
  LogOut,
  Leaf,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({
  currentTab,
  setCurrentTab,
  onOpenCreateModal,
  notesCount = 0,
  favoritesCount = 0,
  trashCount = 0,
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'all',
      label: 'All Notes',
      icon: FileText,
      badge: notesCount,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: Star,
      badge: favoritesCount,
    },
    {
      id: 'trash',
      label: 'Trash',
      icon: Trash2,
      badge: trashCount,
    },
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (onClose) onClose();
  };

  const getInitials = (name) => {
    if (!name) return 'G';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 38, 31, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
            display: 'block',
          }}
          className="md-hidden"
        />
      )}

      <aside
        style={{
          width: '260px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'translateX(0)' : undefined,
        }}
        className={`sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '28px 22px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #4A6B53 0%, #3D5944 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(74, 107, 83, 0.28)',
                color: '#FFFFFF',
              }}
            >
              <Leaf size={20} strokeWidth={2.4} />
            </div>
            <div>
              <span
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.025em',
                  display: 'block',
                  lineHeight: 1.15,
                }}
              >
                Grove
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Mindful Workspace
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md-hidden"
            style={{
              padding: '6px',
              color: 'var(--text-muted)',
              borderRadius: '8px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Create Note Button */}
        <div style={{ padding: '8px 18px 20px' }}>
          <button
            onClick={() => {
              onOpenCreateModal();
              if (onClose) onClose();
            }}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '11px 16px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '12px',
            }}
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>New Note</span>
          </button>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, padding: '0 14px', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-light)',
              padding: '4px 10px 10px',
            }}
          >
            Navigation
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.91rem',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'var(--surface-alt)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <div
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        border: isActive ? 'none' : '1.5px solid var(--text-light)',
                        transition: 'var(--transition)',
                      }}
                    />
                    <Icon
                      size={18}
                      color={isActive ? 'var(--primary)' : 'var(--text-muted)'}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge > 0 && (
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        backgroundColor: isActive ? 'var(--primary)' : '#E2ECE4',
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        minWidth: '22px',
                        textAlign: 'center',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer: Settings & Profile */}
        <div
          style={{
            padding: '18px 16px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Settings button */}
          <button
            onClick={() => {
              if (onOpenSettings) onOpenSettings();
              if (onClose) onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '9px 12px',
              borderRadius: '10px',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 500,
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-alt)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          {/* User profile card with Logout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--surface-alt)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '9px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  flexShrink: 0,
                }}
              >
                {getInitials(user?.name)}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.name || 'Grove User'}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.email || ''}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              style={{
                padding: '6px',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--danger)';
                e.currentTarget.style.backgroundColor = 'var(--danger-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
