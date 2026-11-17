import React, { useState, useEffect } from 'react';
import { X, Leaf, Check, Tag, Palette } from 'lucide-react';

const CATEGORIES = ['General', 'Work', 'Personal', 'Ideas', 'Study', 'Tasks'];

const ACCENT_COLORS = [
  { name: 'Olive', value: '#4A6B53' },
  { name: 'Sage', value: '#708F78' },
  { name: 'Forest', value: '#2C4A34' },
  { name: 'Warm Amber', value: '#C27835' },
  { name: 'Moss', value: '#556B2F' },
  { name: 'Slate', value: '#475569' },
];

export const NoteEditorModal = ({ isOpen, onClose, onSave, editingNote = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [color, setColor] = useState('#4A6B53');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
      setCategory(editingNote.category || 'General');
      setColor(editingNote.color || '#4A6B53');
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
      setColor('#4A6B53');
    }
    setError('');
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for your note.');
      return;
    }
    if (!content.trim()) {
      setError('Please enter some content for your note.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        category,
        color,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 38, 31, 0.45)',
        backdropFilter: 'blur(5px)',
        zIndex: 90,
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
          maxWidth: '620px',
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
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, #FAFBF8, #FFFFFF)',
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
              <Leaf size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {editingNote ? 'Update and refine your saved thoughts' : 'Express your thoughts, tasks, and ideas'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
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
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {error && (
              <div
                style={{
                  backgroundColor: 'var(--danger-light)',
                  color: 'var(--danger)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            {/* Title Input */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '6px',
                }}
              >
                Note Title <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Weekly Reflections & Project Goals"
                className="input-field"
                style={{ fontWeight: 600 }}
                autoFocus
              />
            </div>

            {/* Category and Accent Color Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {/* Category selector */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '6px',
                  }}
                >
                  <Tag size={13} color="var(--primary)" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accent Color picker */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '6px',
                  }}
                >
                  <Palette size={13} color="var(--primary)" />
                  <span>Color Accent</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.value)}
                      title={c.name}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: c.value,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: color === c.value ? '2.5px solid #1C261F' : '2px solid transparent',
                        transform: color === c.value ? 'scale(1.15)' : 'scale(1)',
                        transition: 'var(--transition)',
                      }}
                    >
                      {color === c.value && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Textarea */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  marginBottom: '6px',
                }}
              >
                <span>
                  Content <span style={{ color: 'var(--danger)' }}>*</span>
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 400 }}>
                  {wordCount} words · {charCount} chars
                </span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note peacefully here..."
                className="input-field"
                rows={9}
                style={{
                  resize: 'vertical',
                  lineHeight: 1.6,
                  fontSize: '0.92rem',
                }}
              />
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              backgroundColor: 'var(--surface-alt)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ minWidth: '120px' }}
            >
              {isSubmitting ? 'Saving...' : editingNote ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
