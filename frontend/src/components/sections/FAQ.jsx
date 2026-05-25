import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/faq';

export default function FAQ() {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Clear information regarding tutor match processes, trial classes, billing, and scheduling queries.</p>
        </div>

        <div className="faq-grid">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className={`faq-item ${faqOpen === i ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <span className="faq-question">{faq.q}</span>
                <span className="faq-chevron">{faqOpen === i ? '▲' : '▼'}</span>
              </div>
              {faqOpen === i && (
                <div className="faq-body">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
