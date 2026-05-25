import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/testimonials';

export default function Testimonials() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const prev = () => setSliderIndex(sliderIndex === 0 ? TESTIMONIALS.length - 1 : sliderIndex - 1);
  const next = () => setSliderIndex(sliderIndex === TESTIMONIALS.length - 1 ? 0 : sliderIndex + 1);

  return (
    <section className="section section-bg">
      <div className="container">
        <div className="section-header">
          <span className="badge">Parent Endorsements</span>
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-subtitle">Real feedback from satisfied parents whose children have experienced significant conceptual clarity and improved grades.</p>
        </div>

        <div className="testimonials-slider">
          <div className="slider-container">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="testimonial-card" style={{ flex: '0 0 100%', maxWidth: '100%', display: idx === sliderIndex ? 'block' : 'none' }}>
                <div className="testimonial-inner">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-profile">
                    <div className="testimonial-avatar" style={{ backgroundColor: t.bg }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="testimonial-details">
                      <h4>{t.name}</h4>
                      <p>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button className="slider-btn" onClick={prev}>◀</button>
            <div className="slider-dots">
              {TESTIMONIALS.map((_, i) => (
                <span key={i} onClick={() => setSliderIndex(i)} className={`slider-dot ${i === sliderIndex ? 'active' : ''}`}></span>
              ))}
            </div>
            <button className="slider-btn" onClick={next}>▶</button>
          </div>
        </div>
      </div>
    </section>
  );
}
