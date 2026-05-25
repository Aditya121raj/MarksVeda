import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section-bg">
      <div className="container">
        <div className="section-header">
          <span className="badge">Smooth Onboarding</span>
          <h2 className="section-title">How MarksVeda Works</h2>
          <p className="section-subtitle">A simple, verified, and hassle-free onboarding flow for parents. No complex portals—just easy learning.</p>
        </div>

        <div className="steps-container">
          <div className="steps-timeline">
            <div className="steps-timeline-progress" style={{ width: '80%' }}></div>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number-box">1</div>
              <h3 className="step-title">Submit Requirements</h3>
              <p className="step-desc">Fill out our quick tuition requirement form below with student class, area, and timing.</p>
            </div>
            <div className="step-card">
              <div className="step-number-box">2</div>
              <h3 className="step-title">Coordinator Call</h3>
              <p className="step-desc">Our expert academic coordinator contacts you to understand student focus and learning gaps.</p>
            </div>
            <div className="step-card">
              <div className="step-number-box">3</div>
              <h3 className="step-title">Tutor Match &amp; Demo</h3>
              <p className="step-desc">We manually hand-pick the perfect qualified home tutor and schedule a 100% free trial class.</p>
            </div>
            <div className="step-card">
              <div className="step-number-box">4</div>
              <h3 className="step-title">Start Learning</h3>
              <p className="step-desc">Once satisfied with the demo, lock the schedule and watch your child excel in academics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
