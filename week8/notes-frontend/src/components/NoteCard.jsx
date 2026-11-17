import React from 'react';
import {
  Star,
  Edit3,
  Trash2,
  Calendar,
  RotateCcw,
  Eye,
  Tag,
} from 'lucide-react';

export const NoteCard = ({
  note,
  viewMode = 'grid',
  onSelect,
  onEdit,
  onDelete,
  onToggleFavorite,
  onRestore,
  onPermanentDelete,
}) => {
  const isTrash = note.isTrash;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'work':
        return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
      case 'personal':
        return { bg: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' };
      case 'ideas':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' };
      case 'study':
        return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
      case 'tasks':
        return { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' };
      default:
        return { bg: '#F3EEFF', text: '#7C3AED', border: '#E9DEFE' };
    }
  };

  const catStyle = getCategoryColor(note.category);

  // List View Mode
  if (viewMode === 'list') {
    return (
      <div
        className="card-clean"
        style={{
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '12px',
          borderRadius: '16px',
          borderLeft: `4px solid ${note.color || 'var(--primary)'}`,
          cursor: 'pointer',
        }}
        onClick={() => onSelect(note)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          {!isTrash && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(note._id);
              }}
              style={{
                padding: '4px',
                color: note.isFavorite ? '#F59E0B' : 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
              }}
              title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                size={18}
                fill={note.isFavorite ? '#F59E0B' : 'none'}
              />
            </button>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {note.title || 'Untitled Note'}
              </h3>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  backgroundColor: catStyle.bg,
                  color: catStyle.text,
                  border: `1px solid ${catStyle.border}`,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  flexShrink: 0,
                }}
              >
                {note.category || 'General'}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '3px',
              }}
            >
              {note.content || 'No additional text'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <div
            style={{
              fontSize: '0.76rem',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            className="xs-hidden"
          >
            <Calendar size={13} />
            <span>{formatDate(note.updatedAt || note.createdAt)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isTrash ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestore(note._id);
                  }}
                  title="Restore note"
                  className="btn-ghost"
                  style={{ padding: '6px' }}
                >
                  <RotateCcw size={16} color="var(--primary)" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPermanentDelete(note._id);
                  }}
                  title="Delete permanently"
                  className="btn-ghost"
                  style={{ padding: '6px' }}
                >
                  <Trash2 size={16} color="var(--danger)" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(note);
                  }}
                  title="View full note"
                  className="btn-ghost"
                  style={{ padding: '6px' }}
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(note);
                  }}
                  title="Edit note"
                  className="btn-ghost"
                  style={{ padding: '6px' }}
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note);
                  }}
                  title="Move to trash"
                  className="btn-ghost"
                  style={{ padding: '6px' }}
                >
                  <Trash2 size={16} color="var(--danger)" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid Card Mode (Default - Fresh & Spacious)
  return (
    <div
      className="card-clean note-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '22px 24px',
        minHeight: '220px',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '16px',
        borderLeft: `4px solid ${note.color || 'var(--primary)'}`,
      }}
      onClick={() => onSelect(note)}
    >
      {/* Top row: Category tag & Star button */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: note.color || 'var(--primary)',
              }}
            />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 600,
                backgroundColor: catStyle.bg,
                color: catStyle.text,
                border: `1px solid ${catStyle.border}`,
                padding: '3px 9px',
                borderRadius: '999px',
              }}
            >
              {note.category || 'General'}
            </span>
          </div>

          {!isTrash && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(note._id);
              }}
              style={{
                padding: '4px',
                color: note.isFavorite ? '#F59E0B' : 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                transition: 'var(--transition)',
              }}
              title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                size={18}
                fill={note.isFavorite ? '#F59E0B' : 'none'}
              />
            </button>
          )}
        </div>

        {/* Note Title */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '8px',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {note.title || 'Untitled Note'}
        </h3>

        {/* Note Content preview */}
        <p
          style={{
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '18px',
          }}
        >
          {note.content || 'Empty note'}
        </p>
      </div>

      {/* Footer: Date & Action icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border)',
          paddingTop: '12px',
          marginTop: 'auto',
        }}
      >
        <span
          style={{
            fontSize: '0.74rem',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Calendar size={13} />
          {formatDate(note.updatedAt || note.createdAt)}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {isTrash ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRestore(note._id);
                }}
                title="Restore note"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'var(--primary)',
                  display: 'flex',
                }}
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPermanentDelete(note._id);
                }}
                title="Delete permanently"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'var(--danger)',
                  display: 'flex',
                }}
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(note);
                }}
                title="Quick view"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Eye size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                title="Edit note"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note);
                }}
                title="Move to trash"
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
