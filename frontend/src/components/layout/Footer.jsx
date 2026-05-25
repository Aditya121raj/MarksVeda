import React from 'react';

export default function Footer({ onTrackClick, onAdminClick }) {
  const linkStyle = { color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' };
  const socialBase = { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background-color 0.3s' };

  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '80px 0 40px', backgroundColor: 'var(--primary-dark)', color: '#94a3b8', fontSize: '0.9rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-green))', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            </div>
            <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>MarksVeda</h3>
          </div>
          <p style={{ lineHeight: '1.7', marginBottom: '25px', color: '#cbd5e1' }}>Premium Doorstep &amp; Online Learning platform connecting students with verified, top-tier educators across India.</p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={socialBase} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-blue)')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" style={socialBase} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e1306c')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" style={socialBase} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1da1f2')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { href: '#home', label: 'Home' },
              { href: '#how-it-works', label: 'How it Works' },
              { href: '#subjects', label: 'Popular Subjects' },
              { href: '#book-tutor', label: 'Book a Free Demo' },
            ].map(({ href, label }) => (
              <li key={href}>
                <a href={href} style={linkStyle} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-green)')} onMouseOut={(e) => (e.currentTarget.style.color = '#cbd5e1')}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Support</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--primary-blue)' }}>📞</span>
              <a href="tel:+919102384309" style={{ color: '#cbd5e1', textDecoration: 'none' }}>+91 9102384309</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--primary-blue)' }}>📧</span>
              <span style={{ color: '#cbd5e1' }}>support@marksveda.com</span>
            </li>
            <li>
              <button onClick={onTrackClick} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '0.95rem', marginTop: '10px' }}>⚡ Open Live Status Tracker</button>
            </li>
            <li>
              <button onClick={onAdminClick} style={{ background: 'none', border: 'none', color: '#f43f5e', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}>🔓 Coordinator Access</button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Stay Updated</h4>
          <p style={{ color: '#cbd5e1', marginBottom: '15px', lineHeight: '1.6' }}>Subscribe to get the latest educational tips and priority tutor access.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
            <button style={{ backgroundColor: 'var(--primary-blue)', color: 'white', border: 'none', borderRadius: '8px', padding: '0 20px', fontWeight: '600', cursor: 'pointer' }}>➔</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <p>© {new Date().getFullYear()} MarksVeda Tutors. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'white')} onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}>Privacy Policy</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'white')} onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
