import React from 'react';

const SUBJECTS = [
  { icon: '➗', name: 'Maths', desc: 'Arithmetic, Algebra, Calculus & Geometry support' },
  { icon: '🧪', name: 'Science', desc: 'General foundational science for early classes' },
  { icon: '⚛', name: 'Physics', desc: 'Concept building, numerical formulas, kinematics' },
  { icon: '🧫', name: 'Chemistry', desc: 'Organic reactions, inorganic periodic equations' },
  { icon: '🧬', name: 'Biology', desc: 'Anatomy, cell botany, diagrams & genetics' },
  { icon: '🇬🇧', name: 'English', desc: 'Grammar mastery, literature prose, text composition' },
  { icon: '💻', name: 'Coding', desc: 'Scratch, Python, HTML/JS for early developers' },
  { icon: '🎯', name: 'JEE Prep', desc: 'Advanced engineering entrance exam drills' },
  { icon: '🏥', name: 'NEET Prep', desc: 'Medical science concepts and question practice' },
  { icon: '🗣', name: 'Spoken English', desc: 'Confidence building, public speech & conversation' },
];

export default function Subjects() {
  return (
    <section id="subjects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge">Comprehensive Curriculums</span>
          <h2 className="section-title">Popular Subjects We Teach</h2>
          <p className="section-subtitle">We offer bespoke learning programs matching CBSE, ICSE, IB, State Boards, and competitive exams across multiple classes.</p>
        </div>

        <div className="subjects-grid">
          {SUBJECTS.map((s) => (
            <div key={s.name} className="subject-card">
              <div className="subject-icon-box">{s.icon}</div>
              <h3 className="subject-name">{s.name}</h3>
              <p className="subject-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
