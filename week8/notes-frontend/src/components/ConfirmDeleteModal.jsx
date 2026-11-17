import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  noteTitle = 'this note',
  isPermanent = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(37, 33, 59, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 95,
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
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={22} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              {isPermanent ? 'Delete Note Permanently?' : 'Move Note to Trash?'}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {isPermanent ? (
                <>
                  Are you sure you want to permanently erase <strong>"{noteTitle}"</strong>? This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to move <strong>"{noteTitle}"</strong> to Trash? You can restore it later if needed.
                </>
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.86rem' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-danger"
            style={{ padding: '8px 18px', fontSize: '0.86rem' }}
          >
            <Trash2 size={16} />
            <span>{isPermanent ? 'Delete Forever' : 'Move to Trash'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
