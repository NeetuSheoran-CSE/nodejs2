import React, { useState } from 'react';
import {
  X,
  Calendar,
  Tag,
  Copy,
  Check,
  Edit3,
  Trash2,
  Clock,
  Leaf,
} from 'lucide-react';

export const NoteDetailModal = ({
  note,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !note) return null;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCopy = () => {
    const text = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = note.content ? note.content.trim().split(/\s+/).length : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 38, 31, 0.45)',
        backdropFilter: 'blur(5px)',
        zIndex: 85,
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
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
          borderTop: `5px solid ${note.color || 'var(--primary)'}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 26px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            backgroundColor: '#FAFBF8',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Tag size={12} />
                {note.category || 'General'}
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                {wordCount} words
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.38rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.3,
              }}
            >
              {note.title}
            </h2>
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

        {/* Note Timestamps Bar */}
        <div
          style={{
            padding: '10px 26px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: 'var(--text-light)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={13} />
            <span>Created: {formatDate(note.createdAt)}</span>
          </div>
          {note.updatedAt && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} />
              <span>Last edited: {formatDate(note.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: '26px',
            overflowY: 'auto',
            flex: 1,
            fontSize: '0.96rem',
            color: 'var(--text-main)',
            lineHeight: 1.75,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {note.content}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 26px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFBF8',
          }}
        >
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              padding: '7px 14px',
              fontSize: '0.84rem',
            }}
          >
            {copied ? (
              <>
                <Check size={15} color="var(--primary)" />
                <span style={{ color: 'var(--primary)' }}>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy size={15} />
                <span>Copy Note</span>
              </>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                onClose();
                onDelete(note);
              }}
              className="btn-ghost"
              style={{
                color: 'var(--danger)',
                padding: '7px 12px',
                fontSize: '0.84rem',
              }}
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(note);
              }}
              className="btn-primary"
              style={{
                padding: '7px 16px',
                fontSize: '0.84rem',
              }}
            >
              <Edit3 size={15} />
              <span>Edit Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
