import React from 'react';

export const StatsOverview = ({ notes = [] }) => {
  const activeNotes = notes.filter((n) => !n.isTrash);
  const totalNotes = activeNotes.length;
  const favoritesCount = activeNotes.filter((n) => n.isFavorite).length;

  // Notes updated today
  const today = new Date().toDateString();
  const updatedTodayCount = activeNotes.filter((n) => {
    if (!n.updatedAt) return false;
    return new Date(n.updatedAt).toDateString() === today;
  }).length;

  const statCards = [
    {
      dotColor: '#7C3AED',
      value: `${totalNotes} Notes`,
      subtext: totalNotes === 1 ? '1 active note in space' : `${totalNotes} total notes saved`,
    },
    {
      dotColor: '#10B981',
      value: updatedTodayCount > 0 ? `${updatedTodayCount} Updated Today` : 'Recently Updated',
      subtext: 'Synchronized with cloud database',
    },
    {
      dotColor: '#06B6D4',
      value: 'All Synced',
      subtext: 'Auto-saved in MongoDB',
    },
    {
      dotColor: '#F59E0B',
      value: `${favoritesCount} Starred`,
      subtext: 'Pinned for quick access',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}
    >
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          className="card-clean"
          style={{
            padding: '20px 22px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: stat.dotColor,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </span>
          </div>

          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              paddingLeft: '19px',
            }}
          >
            {stat.subtext}
          </div>
        </div>
      ))}
    </div>
  );
};
