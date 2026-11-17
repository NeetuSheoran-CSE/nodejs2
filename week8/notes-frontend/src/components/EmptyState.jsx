import React from 'react';
import { FileQuestion, PlusCircle, Search, Trash2, Star, Sparkles } from 'lucide-react';

export const EmptyState = ({
  tab = 'all',
  searchQuery = '',
  onClearSearch,
  onOpenCreateModal,
}) => {
  if (searchQuery) {
    return (
      <div
        className="card-clean"
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9FD 100%)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.15)',
          }}
        >
          <Search size={28} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
          No notes match "{searchQuery}"
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px', marginBottom: '20px' }}>
          We couldn't find any note titles, tags, or content matching your search terms.
        </p>
        <button onClick={onClearSearch} className="btn-secondary" style={{ fontSize: '0.86rem' }}>
          Clear Search Query
        </button>
      </div>
    );
  }

  if (tab === 'trash') {
    return (
      <div
        className="card-clean"
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9FD 100%)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: '#F3F4F6',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Trash2 size={28} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
          Your Trash is completely empty
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
          Deleted notes will appear here. You can restore or permanently remove them at any time.
        </p>
      </div>
    );
  }

  if (tab === 'favorites') {
    return (
      <div
        className="card-clean"
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9FD 100%)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: '#FEF3C7',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.15)',
          }}
        >
          <Star size={28} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
          No starred favorites yet
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '380px', marginBottom: '20px' }}>
          Click the star icon on any note card to pin your most important notes right here.
        </p>
        <button onClick={onOpenCreateModal} className="btn-primary" style={{ fontSize: '0.86rem' }}>
          <PlusCircle size={17} />
          <span>Create a Note</span>
        </button>
      </div>
    );
  }

  // Default empty state (No notes created yet)
  return (
    <div
      className="card-clean"
      style={{
        padding: '56px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9FD 100%)',
        border: '1.5px dashed var(--border-focus)',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 12px 28px rgba(139, 92, 246, 0.28)',
        }}
      >
        <Sparkles size={34} />
      </div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
        No notes yet — let's create something brilliant!
      </h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '440px', lineHeight: 1.6, marginBottom: '24px' }}>
        Capture your project ideas, meeting notes, daily checklists, or study summaries in a clean, distraction-free environment.
      </p>
      <button
        onClick={onOpenCreateModal}
        className="btn-primary"
        style={{ padding: '10px 22px', fontSize: '0.92rem' }}
      >
        <PlusCircle size={18} />
        <span>Create Your First Note</span>
      </button>
    </div>
  );
};
