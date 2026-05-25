import React from 'react';

export default function Hero({ onTrackClick }) {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        {/* Left Text */}
        <div className="hero-content">
          <div className="hero-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            100% Home Tutor Verification Guaranteed
          </div>
          <h1 className="hero-headline">
            Unlock Better <br /><span>Learning at Home</span>
          </h1>
          <p className="hero-subheadline">
            Experienced, verified personal tutors for every class, board, and exam syllabus delivered right at your doorstep. Customized one-on-one attention for maximum results.
          </p>
          <div className="hero-cta">
            <a href="#book-tutor" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Book a Tutor
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <button onClick={onTrackClick} className="btn btn-secondary">
              Track Application
            </button>
          </div>
          {/* Social Proof */}
          <div className="hero-trust">
            <div className="trust-avatars">
              <img className="trust-avatar" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop" alt="Parent" />
              <img className="trust-avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&fit=crop" alt="Parent" />
              <img className="trust-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop" alt="Parent" />
            </div>
            <div className="trust-info">
              <div className="trust-stars">★★★★★</div>
              <p>Trusted by <strong>500+ Happy Parents</strong> in your city</p>
            </div>
          </div>
        </div>

        {/* Right Vector Illustration */}
        <div className="hero-illustration">
          <img src="/assets/hero.png" alt="Student studying" className="illustration-img" onError={(e) => { e.target.src = 'https://img.freepik.com/free-vector/teacher-concept-illustration_114360-1638.jpg' }} />

          {/* Float Badges */}
          <div className="illustration-badge badge-1">
            <div className="badge-icon">👨‍🏫</div>
            <div className="badge-text">
              <h5>100+ Expert Tutors</h5>
              <p>Verified Profiles Only</p>
            </div>
          </div>

          <div className="illustration-badge badge-2">
            <div className="badge-icon">🎓</div>
            <div className="badge-text">
              <h5>95% Success Rate</h5>
              <p>Proven Grade Boost</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
