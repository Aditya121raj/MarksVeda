import React, { useState, useEffect, lazy, Suspense } from 'react';
import confetti from 'canvas-confetti';

const TrackerModal = lazy(() => import('./components/modals/TrackerModal'));
const AdminModal = lazy(() => import('./components/modals/AdminModal'));

// Static data declared outside to prevent recreation on every render
const TESTIMONIALS = [
  { name: 'Meenakshi Sharma', role: 'Parent of Class 10 Student • Noida', quote: 'MarksVeda has been a blessing. My daughter in Class 10 was struggling with Physics numericals. The tutor provided by MarksVeda made concepts so easy that she scored 94% in her boards! Absolutely recommend their personalized approach.', bg: '#2563eb' },
  { name: 'Raman Krishnan', role: 'Parent of Class 8 Student • Bengaluru', quote: 'We tried several tuition centers, but my son got lost in the crowded classrooms. MarksVeda matched us with a coding and math tutor. One-on-one attention made a huge difference. He is now designing games!', bg: '#10b981' },
  { name: 'Amit Patel', role: 'Parent of Class 12 Student • Gurugram', quote: 'The process is incredibly seamless. I submitted the form on a Tuesday, the coordinator called back in 10 minutes, and the demo was set for Thursday. The tutor is highly professional and punctual.', bg: '#f59e0b' },
  { name: 'Dr. Vineeta Prasad', role: 'Parent of NEET Aspirant • Delhi', quote: "Finding a good tutor for NEET Physics was stressful. MarksVeda matched us with a specialized master educator. My daughter's confidence has skyrocketed and mock scores went up from 420 to 610.", bg: '#6366f1' }
];

const FAQ_DATA = [
  { q: 'How does the 100% Free Trial work?', a: 'Once you submit your requirements, we assign a custom-matched tutor for a demo class. This demo class is completely free of charge. If you like the teacher, you pay only for subsequent scheduled classes. If you are not satisfied, we assign another tutor for a new demo without any extra charge.' },
  { q: 'How do you verify the tutors?', a: 'Every tutor matched by MarksVeda passes through a comprehensive multi-layered check. This includes identity validation, educational credential verification, and a subjective screening of their previous teaching track record.' },
  { q: 'Is there a teacher profile portal?', a: 'No, there is no teacher profile search or login portal. MarksVeda does not rely on random automated lists. Our academic experts review each tutoring request manually to align teacher expertise, geography, availability, and personality with your child for a perfect, lasting match.' },
  { q: 'What if we need to change the class timing?', a: 'Timings can be easily coordinated directly with the tutor or through our helpline support coordinate panel. We support reschedule changes in case of upcoming school exams, travels, or personal events.' }
];

export default function App() {
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navbar sticky scroll state (Optimized to prevent excessive re-renders)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let isScrolled = false;
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 40;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        setScrolled(shouldBeScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Counter State (Simulate counting)
  const [stats, setStats] = useState({ guided: 500, tutors: 100, subjects: 20, rating: 95 });

  // Accordion FAQ states
  const [faqOpen, setFaqOpen] = useState(null);

  // Testimonials Slider state
  const [sliderIndex, setSliderIndex] = useState(0);

  // Study Planner Slider states
  const [sliderClassesPerWeek, setSliderClassesPerWeek] = useState(3);
  const [sliderDuration, setSliderDuration] = useState(1.5);
  const totalMonthlyHours = Math.round(sliderClassesPerWeek * sliderDuration * 4);

  // Form input states
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [gradeClass, setGradeClass] = useState('Class 10 (CBSE/ICSE)');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [preferredTiming, setPreferredTiming] = useState('');
  const [tuitionType, setTuitionType] = useState('Home');
  const [syllabusBoard, setSyllabusBoard] = useState('CBSE');
  const [genderPreference, setGenderPreference] = useState('No Preference');
  const [budgetRange, setBudgetRange] = useState('₹300–₹500/hr');
  const [demoDate, setDemoDate] = useState('');
  const [demoTime, setDemoTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Submit actions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Status Tracker Overlay
  const [trackerOpen, setTrackerOpen] = useState(false);

  // Admin Dashboard States
  const [adminOpen, setAdminOpen] = useState(false);
  const [tutorPool, setTutorPool] = useState([]);

  // Load elite tutor spotlight pool
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/requests/tutorpool', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setTutorPool(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          // ignore or handle gracefully in production
        }
      });
    return () => controller.abort();
  }, []);



  // Hook Ctrl + Shift + A for Admin login
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form Submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!parentName || !phone || !gradeClass || !subject || !location) {
      alert('Please fill in all mandatory fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const formattedNotes = `[Planner: ${sliderClassesPerWeek} classes/wk @ ${sliderDuration} hrs/class] ` + (notes || 'No extra guidelines');
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          studentName: studentName || 'Not Specified',
          gradeClass,
          subject,
          syllabusBoard,
          phone,
          location,
          preferredTiming: preferredTiming || 'Flexible',
          tuitionType,
          genderPreference,
          budgetRange,
          demoDate,
          demoTime,
          classesPerWeek: sliderClassesPerWeek,
          classDuration: sliderDuration,
          notes: formattedNotes
        })
      });
      const result = await res.json();
      if (result.success) {
        setSubmitSuccess(result.data);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        // Clear fields
        setParentName('');
        setStudentName('');
        setSubject('');
        setPhone('');
        setLocation('');
        setPreferredTiming('');
        setDemoDate('');
        setDemoTime('');
        setNotes('');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Connection failed. Make sure server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };




  // Map status to roadmap slider step index
  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'Requirement Logged': return 0;
      case 'Shortlisting Tutors': return 1;
      case 'Demo Scheduled': return 2;
      case 'Assigned & Learning': return 3;
      default: return 0;
    }
  };

  return (
    <div>
      {/* 1. Sticky Navigation Bar */}
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar">
          {/* Logo */}
          <a href="#home" className="logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            </div>
            <span>MarksVeda</span>
          </a>

          {/* Links */}
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#subjects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Subjects</a>
            <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#why-choose" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#book-tutor" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Planner Form</a>
          </nav>

          {/* Navigation Actions */}
          <div className="nav-actions">
            <button className="btn btn-secondary" onClick={() => setTrackerOpen(true)} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              ⚡ Track Booking
            </button>
            <a href="#book-tutor" className="btn btn-accent">Free Demo</a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Drawer">
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? '0' : '1' }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
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
              <button onClick={() => setTrackerOpen(true)} className="btn btn-secondary">
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

      {/* 3. Stats Section */}
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
            <div className="stat-label">Subjects & Boards</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.rating}%</div>
            <div className="stat-label">Satisfaction Score</div>
          </div>
        </div>
      </section>

      {/* 4. Subject Spotlight */}
      <section id="subjects" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Comprehensive Curriculums</span>
            <h2 className="section-title">Popular Subjects We Teach</h2>
            <p className="section-subtitle">We offer bespoke learning programs matching CBSE, ICSE, IB, State Boards, and competitive exams across multiple classes.</p>
          </div>

          <div className="subjects-grid">
            <div className="subject-card">
              <div className="subject-icon-box">➗</div>
              <h3 className="subject-name">Maths</h3>
              <p className="subject-desc">Arithmetic, Algebra, Calculus & Geometry support</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🧪</div>
              <h3 className="subject-name">Science</h3>
              <p className="subject-desc">General foundational science for early classes</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">⚛</div>
              <h3 className="subject-name">Physics</h3>
              <p className="subject-desc">Concept building, numerical formulas, kinematics</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🧫</div>
              <h3 className="subject-name">Chemistry</h3>
              <p className="subject-desc">Organic reactions, inorganic periodic equations</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🧬</div>
              <h3 className="subject-name">Biology</h3>
              <p className="subject-desc">Anatomy, cell botany, diagrams & genetics</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🇬🇧</div>
              <h3 className="subject-name">English</h3>
              <p className="subject-desc">Grammar mastery, literature prose, text composition</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">💻</div>
              <h3 className="subject-name">Coding</h3>
              <p className="subject-desc">Scratch, Python, HTML/JS for early developers</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🎯</div>
              <h3 className="subject-name">JEE Prep</h3>
              <p className="subject-desc">Advanced engineering entrance exam drills</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🏥</div>
              <h3 className="subject-name">NEET Prep</h3>
              <p className="subject-desc">Medical science concepts and question practice</p>
            </div>
            <div className="subject-card">
              <div className="subject-icon-box">🗣</div>
              <h3 className="subject-name">Spoken English</h3>
              <p className="subject-desc">Confidence building, public speech & conversation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How MarksVeda Works */}
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
                <h3 className="step-title">Tutor Match & Demo</h3>
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

      {/* 6. Why Parents Trust Us */}
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

      {/* 7. Interactive Planner Form Section */}
      <section id="book-tutor" className="section section-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Soft background accents */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>

        <div className="container form-grid">
          {/* Left planner calculator info pane */}
          <div className="form-info-pane">
            <span className="badge">Inquire Now</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Request a <span style={{ color: 'var(--primary-blue)' }}>Verified Tutor</span> Today
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Takes less than 60 seconds. Our academic coordinator will call you back within 15 minutes of submission to lock in your free trial.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>✓</div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>No Registration Fees</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Free custom profiling and trial assignment.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>✓</div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>Experienced Faculty</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Bespoke specialists for primary, high school, coding, and JEE/NEET.</p>
                </div>
              </div>
            </div>

            {/* Premium Planner sliders */}
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>📊</span> Dynamic Monthly Study Planner
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '25px' }}>Drag sliders below to estimate the required academic attention per month.</p>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Classes per Week</span>
                  <strong style={{ color: 'var(--primary-blue)' }}>{sliderClassesPerWeek} Classes / Week</strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  style={{ width: '100%', accentColor: 'var(--primary-blue)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                  value={sliderClassesPerWeek} 
                  onChange={(e) => setSliderClassesPerWeek(Number(e.target.value))} 
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Class Duration</span>
                  <strong style={{ color: 'var(--primary-blue)' }}>{sliderDuration} Hours / Class</strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.5" 
                  style={{ width: '100%', accentColor: 'var(--primary-blue)', height: '6px', borderRadius: '4px', cursor: 'pointer' }}
                  value={sliderDuration} 
                  onChange={(e) => setSliderDuration(Number(e.target.value))} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--bg-slate)', borderRadius: '12px' }}>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Monthly Focus</p>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-dark)', marginTop: '4px' }}>~ {totalMonthlyHours} Hours</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matching Urgency</p>
                  <strong style={{ fontSize: '1rem', display: 'inline-block', marginTop: '4px', padding: '4px 10px', borderRadius: '6px', backgroundColor: totalMonthlyHours <= 10 ? 'var(--accent-green-light)' : totalMonthlyHours <= 24 ? 'rgba(37, 99, 235, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: totalMonthlyHours <= 10 ? 'var(--accent-green-dark)' : totalMonthlyHours <= 24 ? 'var(--primary-blue)' : '#ef4444' }}>
                    {totalMonthlyHours <= 10 ? '🟢 Available Match' : totalMonthlyHours <= 24 ? '⚡ Instant Match' : '🔥 Premium Priority'}
                  </strong>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column: Premium Glassmorphism Form Container */}
          <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(11, 21, 48, 0.08)', border: '1px solid rgba(226, 232, 240, 0.8)', position: 'relative', zIndex: 10 }}>
            
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '8px' }}>Tuition Inquiry Form</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Provide student details below to assign the perfect home educator.</p>
            </div>

            {submitSuccess ? (
              <div style={{ backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green)', padding: '30px', borderRadius: '16px', color: 'var(--accent-green-dark)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎉</div>
                <h4 style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '12px' }}>Tuition Inquiry Logged Successfully!</h4>
                <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: '1.6' }}>
                  Ref ID: <strong style={{ color: 'var(--primary-dark)' }}>{submitSuccess.reqId}</strong><br/>
                  We have sent a matching confirmation WhatsApp/SMS alert to <strong style={{ color: 'var(--primary-dark)' }}>{submitSuccess.phone}</strong>.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      setTrackerOpen(true);
                      setSubmitSuccess(null);
                    }}
                    className="btn btn-accent" 
                    style={{ padding: '12px 24px', width: '100%', maxWidth: '300px' }}
                  >
                    ⚡ Open Live Status Tracker
                  </button>
                  <button 
                    onClick={() => setSubmitSuccess(null)}
                    className="btn btn-secondary" 
                    style={{ padding: '12px 24px', width: '100%', maxWidth: '300px' }}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm}>
                
                {/* Name fields row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Parent Name *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94a3b8' }}>👤</span>
                      <input 
                        type="text" 
                        style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                        placeholder="e.g. Sanjay Sharma" 
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        required 
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Student Name</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94a3b8' }}>🎓</span>
                      <input 
                        type="text" 
                        style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                        placeholder="e.g. Amit Sharma" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Class, Subject, Board row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Class / Grade *</label>
                    <select 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', backgroundColor: 'var(--bg-slate)', cursor: 'pointer' }}
                      value={gradeClass} onChange={(e) => setGradeClass(e.target.value)}
                    >
                      <option>Class 6-8</option>
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                      <option>JEE/NEET Prep</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Subject Needed *</label>
                    <input 
                      type="text" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                      placeholder="e.g. Maths, Physics" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required 
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Syllabus Board</label>
                    <select 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', backgroundColor: 'var(--bg-slate)', cursor: 'pointer' }}
                      value={syllabusBoard} onChange={(e) => setSyllabusBoard(e.target.value)}
                    >
                      <option>CBSE</option>
                      <option>ICSE/ISC</option>
                      <option>State Board</option>
                      <option>IB / IGCSE</option>
                    </select>
                  </div>
                </div>

                {/* Phone & Area Location row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>WhatsApp/Mobile No *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94a3b8' }}>📞</span>
                      <input 
                        type="tel" 
                        style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                        placeholder="e.g. +91 98765 43210" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Area / Location *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94a3b8' }}>📍</span>
                      <input 
                        type="text" 
                        style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                        placeholder="e.g. Whitefield, Noida" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required 
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Timing & Tuition type selection */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Preferred Timings</label>
                    <input 
                      type="text" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)' }}
                      placeholder="e.g. Weekdays 5-7 PM" 
                      value={preferredTiming}
                      onChange={(e) => setPreferredTiming(e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Tuition Format *</label>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                      <label style={{ cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <input type="radio" checked={tuitionType === 'Home'} onChange={() => setTuitionType('Home')} style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }} /> 🏡 Home Tuition
                      </label>
                      <label style={{ cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <input type="radio" checked={tuitionType === 'Online'} onChange={() => setTuitionType('Online')} style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }} /> 💻 Online Live
                      </label>
                    </div>
                  </div>
                </div>

                {/* Gender preference & Budget range row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Tutor Gender Preference</label>
                    <select 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', backgroundColor: 'var(--bg-slate)', cursor: 'pointer' }}
                      value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)}
                    >
                      <option>No Preference</option>
                      <option>Male Tutor</option>
                      <option>Female Tutor</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Budget Limit</label>
                    <select 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', backgroundColor: 'var(--bg-slate)', cursor: 'pointer' }}
                      value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}
                    >
                      <option>₹300–₹500/hr</option>
                      <option>₹500–₹800/hr</option>
                      <option>₹800+/hr</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Free Trial Scheduler */}
                <div style={{ backgroundColor: 'var(--bg-slate)', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📅 Free Demo Class Slot (Optional)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Select Date</label>
                      <input 
                        type="date" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', color: 'var(--text-dark)' }}
                        value={demoDate} onChange={(e) => setDemoDate(e.target.value)} 
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Select Time</label>
                      <input 
                        type="time" 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', color: 'var(--text-dark)' }}
                        value={demoTime} onChange={(e) => setDemoTime(e.target.value)} 
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                      />
                    </div>
                  </div>
                </div>

                {/* Notes / specific requirements */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Special Instructions / Guidelines</label>
                  <textarea 
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)', resize: 'vertical', minHeight: '80px' }}
                    rows="2" 
                    placeholder="e.g. Focus on CBSE board prep, algebra numericals..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing Tutors...' : 'Match & Assign Tutor Now ➔'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Verified Elite Tutors Spotlight Pool */}
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

      {/* 8. Testimonials slider */}
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

            {/* Slider controls */}
            <div className="slider-controls">
              <button className="slider-btn" onClick={() => setSliderIndex(sliderIndex === 0 ? TESTIMONIALS.length - 1 : sliderIndex - 1)}>
                ◀
              </button>
              <div className="slider-dots">
                {TESTIMONIALS.map((_, i) => (
                  <span 
                    key={i} 
                    onClick={() => setSliderIndex(i)} 
                    className={`slider-dot ${i === sliderIndex ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
              <button className="slider-btn" onClick={() => setSliderIndex(sliderIndex === TESTIMONIALS.length - 1 ? 0 : sliderIndex + 1)}>
                ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
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
                <div 
                  className="faq-header" 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-chevron">{faqOpen === i ? '▲' : '▼'}</span>
                </div>
                {faqOpen === i && (
                  <div className="faq-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Actions */}
      <div className="floating-actions" style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1000 }}>
        <a href="https://wa.me/919102384309?text=Hi%20MarksVeda,%20I%20am%20looking%20for%20a%20home%20tutor%20for%20my%20child." target="_blank" title="Chat on WhatsApp" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>
        <a href="tel:+919102384309" title="Call Us Now" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
      </div>


      {/* 11. Footer */}
      <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '80px 0 40px', backgroundColor: 'var(--primary-dark)', color: '#94a3b8', fontSize: '0.9rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-green))', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              </div>
              <h3 style={{ color: 'white', fontWeight: '800', fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>MarksVeda</h3>
            </div>
            <p style={{ lineHeight: '1.7', marginBottom: '25px', color: '#cbd5e1' }}>Premium Doorstep & Online Learning platform connecting students with verified, top-tier educators across India.</p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-blue)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e1306c'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1da1f2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '20px', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#home" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Home</a></li>
              <li><a href="#how-it-works" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>How it Works</a></li>
              <li><a href="#subjects" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Popular Subjects</a></li>
              <li><a href="#book-tutor" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-green)'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Book a Free Demo</a></li>
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
                <button onClick={() => setTrackerOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '0.95rem', marginTop: '10px' }}>⚡ Open Live Status Tracker</button>
              </li>
              <li>
                <button onClick={() => setAdminOpen(true)} style={{ background: 'none', border: 'none', color: '#f43f5e', fontWeight: '600', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}>🔓 Coordinator Access</button>
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
        
        <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <p>© {new Date().getFullYear()} MarksVeda Tutors. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Privacy Policy</a>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          POPUP MODALS & TRACKER / ADMIN PANELS
         ======================================================== */}

      {/* 1. Track Booking Modal Overlay (Lazy Loaded) */}
      {trackerOpen && (
        <Suspense fallback={<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.65)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading Tracker...</div>}>
          <TrackerModal onClose={() => setTrackerOpen(false)} />
        </Suspense>
      )}

      {/* 2. Coordinator Dashboard Portal Modal (Lazy Loaded) */}
      {adminOpen && (
        <Suspense fallback={<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.65)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading Panel...</div>}>
          <AdminModal onClose={() => setAdminOpen(false)} tutorPool={tutorPool} />
        </Suspense>
      )}
    </div>
  );
}
