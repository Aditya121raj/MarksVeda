import React from 'react';

export default function TutorSpotlight({ tutorPool }) {
  if (!tutorPool || tutorPool.length === 0) return null;

  return (
    <section className="section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Verified Quality</span>
          <h2 className="section-title">Pre-Verified Elite Tutors</h2>
          <p className="section-subtitle">Our top hand-picked academic specialists who have successfully guided dozens of students in your region.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {tutorPool.map((t, i) => (
            <div key={i} className="benefit-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #cbd5e1', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: '#0b1530', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{t.name}</h4>
                  <span style={{ color: '#059669', fontSize: '0.78rem', fontWeight: '700' }}>{t.education}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#475569' }}>
                <strong>Experience:</strong> {t.experience}<br />
                <strong>Teaches:</strong> {t.subjectsTeaches}
              </p>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ fontSize: '0.65rem', marginBottom: 0, padding: '2px 8px' }}>✓ Government ID Verified</span>
                <span className="badge" style={{ fontSize: '0.65rem', marginBottom: 0, padding: '2px 8px' }}>✓ Certificate Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
