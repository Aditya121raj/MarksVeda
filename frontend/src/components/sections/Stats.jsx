import React, { useState } from 'react';

const INITIAL_STATS = { guided: 500, tutors: 100, subjects: 20, rating: 95 };

export default function Stats() {
  const [stats] = useState(INITIAL_STATS);

  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        <div className="stat-item">
          <div className="stat-number">{stats.guided}+</div>
          <div className="stat-label">Students Guided</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.tutors}+</div>
          <div className="stat-label">Verified Home Tutors</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.subjects}+</div>
          <div className="stat-label">Subjects &amp; Boards</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.rating}%</div>
          <div className="stat-label">Satisfaction Score</div>
        </div>
      </div>
    </section>
  );
}
