import React from 'react';

export const LoadingSkeleton = ({ viewMode = 'grid', count = 6 }) => {
  const items = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((_, i) => (
          <div
            key={i}
            className="card-clean"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
              <div className="skeleton" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: '40%', height: '18px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ width: '70%', height: '14px' }} />
              </div>
            </div>
            <div className="skeleton" style={{ width: '80px', height: '16px' }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
      }}
    >
      {items.map((_, i) => (
        <div
          key={i}
          className="card-clean"
          style={{
            padding: '20px',
            minHeight: '210px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div className="skeleton" style={{ width: '64px', height: '20px', borderRadius: '999px' }} />
              <div className="skeleton" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
            </div>
            <div className="skeleton" style={{ width: '75%', height: '20px', marginBottom: '12px' }} />
            <div className="skeleton" style={{ width: '100%', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '85%', height: '14px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border)',
              paddingTop: '12px',
            }}
          >
            <div className="skeleton" style={{ width: '70px', height: '14px' }} />
            <div className="skeleton" style={{ width: '60px', height: '16px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};
