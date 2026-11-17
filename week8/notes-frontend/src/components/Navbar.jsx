import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  X,
  Plus,
  LayoutGrid,
  List,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Sparkles,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({
  onToggleSidebar,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onOpenCreateModal,
  onOpenSettings,
}) => {
  const { user, logout, backendStatus } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Time-based dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        transition: 'var(--transition)',
      }}
    >
      {/* Left: Mobile Toggle & Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            padding: '8px',
            borderRadius: '10px',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--surface-alt)',
            border: '1px solid var(--border)',
          }}
          className="md-hidden"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {getGreeting()}, {firstName}!
            </span>
            <span style={{ fontSize: '1.05rem' }}>✨</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            Capture your thoughts and organize ideas seamlessly.
          </p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: '440px',
          margin: '0 20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your notes by title, tag, or content..."
          className="input-field"
          style={{
            paddingLeft: '38px',
            paddingRight: searchQuery ? '36px' : '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            fontSize: '0.88rem',
            borderRadius: '999px',
            backgroundColor: 'var(--surface-alt)',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              padding: '2px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Right Controls: View Mode, Create Note, Backend Status, Profile Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* View Mode Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--surface-alt)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '2px',
          }}
          className="sm-hidden"
        >
          <button
            onClick={() => setViewMode('grid')}
            title="Grid View"
            style={{
              padding: '6px 8px',
              borderRadius: '8px',
              backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="List View"
            style={{
              padding: '6px 8px',
              borderRadius: '8px',
              backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <List size={16} />
          </button>
        </div>

        {/* Primary Create Button */}
        <button
          onClick={onOpenCreateModal}
          className="btn-primary"
          style={{
            padding: '8px 14px',
            fontSize: '0.86rem',
            borderRadius: '10px',
          }}
        >
          <Plus size={17} />
          <span className="xs-hidden">New Note</span>
        </button>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 6px 4px 4px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              backgroundColor: '#FFFFFF',
              transition: 'var(--transition)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {profileDropdownOpen && (
            <div
              className="animate-slide-down"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 8px)',
                width: '240px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
                zIndex: 60,
              }}
            >
              {/* User overview inside dropdown */}
              <div
                style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '6px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  {user?.name || 'Aura User'}
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.email || 'user@example.com'}
                </div>
              </div>

              {/* Menu items */}
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onOpenSettings();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Settings size={16} color="var(--text-muted)" />
                <span>Account & Settings</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  logout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  color: 'var(--danger)',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--danger-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <LogOut size={16} color="var(--danger)" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
