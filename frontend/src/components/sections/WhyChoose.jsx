import React from 'react';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="section">
      <div className="container benefits-grid">
        <div className="benefits-text">
          <span className="badge">Our Pillars</span>
          <h2 className="benefits-title">Why Parents Trust MarksVeda</h2>
          <p className="benefits-desc">We bridge the gap between struggling students and exceptional tutoring talent. With zero complex logins, we handle everything for you manually to ensure maximum control over quality.</p>
          <a href="#book-tutor" className="btn btn-primary">Book Free Trial Class</a>
        </div>

        <div className="benefits-list-cards">
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3 className="benefit-title">Verified Tutors</h3>
            <p className="benefit-desc">Every educator undergoes strict background, identity, and academic checks.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎁</div>
            <h3 className="benefit-title">Free Demo Class</h3>
            <p className="benefit-desc">Pay only after you are completely satisfied with the assigned tutor's teaching.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💸</div>
            <h3 className="benefit-title">Affordable Fees</h3>
            <p className="benefit-desc">Top-tier customized learning structured within standard market budgets.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🏡</div>
            <h3 className="benefit-title">At-Home Safety</h3>
            <p className="benefit-desc">Save travel time. Let your child study securely inside the comfort of home.</p>
          </div>
          <div className="benefit-card benefit-card-accent">
            <div className="benefit-icon">⚡</div>
            <h3 className="benefit-title">1:1 Personalized Blueprint</h3>
            <p className="benefit-desc">Unlike generic school classes, we study the child's strengths and adapt the pace specifically to them. Perfect for fast learners and students who require intensive revision alike.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
