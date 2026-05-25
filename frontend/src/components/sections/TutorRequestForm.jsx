import React, { useState } from 'react';
import confetti from 'canvas-confetti';
const API_URL = import.meta.env.VITE_API_URL || 'https://marksveda.onrender.com';
export default function TutorRequestForm({ onTrackClick }) {
  // Study Planner sliders
  const [sliderClassesPerWeek, setSliderClassesPerWeek] = useState(3);
  const [sliderDuration, setSliderDuration] = useState(1.5);
  const totalMonthlyHours = Math.round(sliderClassesPerWeek * sliderDuration * 4);

  // Form fields
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

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleSubmit = async (e) => {
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
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        setParentName(''); setStudentName(''); setSubject('');
        setPhone(''); setLocation(''); setPreferredTiming('');
        setDemoDate(''); setDemoTime(''); setNotes('');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
  console.log(err);
  alert('Could not connect to MarksVeda server.');
} finally {
      setIsSubmitting(false);
    }
  };

  // Urgency label helper
  const urgencyLabel = totalMonthlyHours <= 10
    ? '🟢 Available Match'
    : totalMonthlyHours <= 24
      ? '⚡ Instant Match'
      : '🔥 Premium Priority';
  const urgencyColor = totalMonthlyHours <= 10
    ? { bg: 'var(--accent-green-light)', color: 'var(--accent-green-dark)' }
    : totalMonthlyHours <= 24
      ? { bg: 'rgba(37,99,235,0.1)', color: 'var(--primary-blue)' }
      : { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: '1px solid var(--border-color)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)'
  };
  const inputIconStyle = { ...inputStyle, padding: '12px 16px 12px 42px' };
  const selectStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: '1px solid var(--border-color)', fontSize: '0.95rem',
    outline: 'none', backgroundColor: 'var(--bg-slate)', cursor: 'pointer'
  };
  const labelStyle = {
    display: 'block', fontSize: '0.85rem', fontWeight: '700',
    color: 'var(--text-dark)', marginBottom: '8px'
  };
  const iconWrap = { position: 'relative' };
  const iconSpan = {
    position: 'absolute', left: '14px', top: '50%',
    transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#94a3b8'
  };
  const focusBlue = (e) => (e.target.style.borderColor = 'var(--primary-blue)');
  const blurDefault = (e) => (e.target.style.borderColor = 'var(--border-color)');
  const blurGray = (e) => (e.target.style.borderColor = '#cbd5e1');

  return (
    <section id="book-tutor" className="section section-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background accents */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>

      <div className="container form-grid">
        {/* Left: Info pane + Planner */}
        <div className="form-info-pane">
          <span className="badge">Inquire Now</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Request a <span style={{ color: 'var(--primary-blue)' }}>Verified Tutor</span> Today
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Takes less than 60 seconds. Our academic coordinator will call you back within 15 minutes of submission to lock in your free trial.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {[
              { title: 'No Registration Fees', desc: 'Free custom profiling and trial assignment.' },
              { title: 'Experienced Faculty', desc: 'Bespoke specialists for primary, high school, coding, and JEE/NEET.' }
            ].map(({ title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>✓</div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>{title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Planner sliders */}
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
              <input type="range" min="1" max="6" style={{ width: '100%', accentColor: 'var(--primary-blue)', height: '6px', borderRadius: '4px', cursor: 'pointer' }} value={sliderClassesPerWeek} onChange={(e) => setSliderClassesPerWeek(Number(e.target.value))} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Class Duration</span>
                <strong style={{ color: 'var(--primary-blue)' }}>{sliderDuration} Hours / Class</strong>
              </div>
              <input type="range" min="1" max="3" step="0.5" style={{ width: '100%', accentColor: 'var(--primary-blue)', height: '6px', borderRadius: '4px', cursor: 'pointer' }} value={sliderDuration} onChange={(e) => setSliderDuration(Number(e.target.value))} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--bg-slate)', borderRadius: '12px' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Monthly Focus</p>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-dark)', marginTop: '4px' }}>~ {totalMonthlyHours} Hours</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matching Urgency</p>
                <strong style={{ fontSize: '1rem', display: 'inline-block', marginTop: '4px', padding: '4px 10px', borderRadius: '6px', backgroundColor: urgencyColor.bg, color: urgencyColor.color }}>
                  {urgencyLabel}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(11,21,48,0.08)', border: '1px solid rgba(226,232,240,0.8)', position: 'relative', zIndex: 10 }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '8px' }}>Tuition Inquiry Form</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Provide student details below to assign the perfect home educator.</p>
          </div>

          {submitSuccess ? (
            <div style={{ backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green)', padding: '30px', borderRadius: '16px', color: 'var(--accent-green-dark)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎉</div>
              <h4 style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '12px' }}>Tuition Inquiry Logged Successfully!</h4>
              <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: '1.6' }}>
                Ref ID: <strong style={{ color: 'var(--primary-dark)' }}>{submitSuccess.reqId}</strong><br />
                We have sent a matching confirmation WhatsApp/SMS alert to <strong style={{ color: 'var(--primary-dark)' }}>{submitSuccess.phone}</strong>.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <button onClick={() => { onTrackClick(); setSubmitSuccess(null); }} className="btn btn-accent" style={{ padding: '12px 24px', width: '100%', maxWidth: '300px' }}>
                  ⚡ Open Live Status Tracker
                </button>
                <button onClick={() => setSubmitSuccess(null)} className="btn btn-secondary" style={{ padding: '12px 24px', width: '100%', maxWidth: '300px' }}>
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Parent Name *</label>
                  <div style={iconWrap}>
                    <span style={iconSpan}>👤</span>
                    <input type="text" style={inputIconStyle} placeholder="e.g. Sanjay Sharma" value={parentName} onChange={(e) => setParentName(e.target.value)} required onFocus={focusBlue} onBlur={blurDefault} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Student Name</label>
                  <div style={iconWrap}>
                    <span style={iconSpan}>🎓</span>
                    <input type="text" style={inputIconStyle} placeholder="e.g. Amit Sharma" value={studentName} onChange={(e) => setStudentName(e.target.value)} onFocus={focusBlue} onBlur={blurDefault} />
                  </div>
                </div>
              </div>

              {/* Class / Subject / Board */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Class / Grade *</label>
                  <select style={selectStyle} value={gradeClass} onChange={(e) => setGradeClass(e.target.value)}>
                    <option>Class 6-8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                    <option>JEE/NEET Prep</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Subject Needed *</label>
                  <input type="text" style={inputStyle} placeholder="e.g. Maths, Physics" value={subject} onChange={(e) => setSubject(e.target.value)} required onFocus={focusBlue} onBlur={blurDefault} />
                </div>
                <div>
                  <label style={labelStyle}>Syllabus Board</label>
                  <select style={selectStyle} value={syllabusBoard} onChange={(e) => setSyllabusBoard(e.target.value)}>
                    <option>CBSE</option>
                    <option>ICSE/ISC</option>
                    <option>State Board</option>
                    <option>IB / IGCSE</option>
                  </select>
                </div>
              </div>

              {/* Phone & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>WhatsApp/Mobile No *</label>
                  <div style={iconWrap}>
                    <span style={iconSpan}>📞</span>
                    <input type="tel" style={inputIconStyle} placeholder="e.g. +91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required onFocus={focusBlue} onBlur={blurDefault} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Area / Location *</label>
                  <div style={iconWrap}>
                    <span style={iconSpan}>📍</span>
                    <input type="text" style={inputIconStyle} placeholder="e.g. Whitefield, Noida" value={location} onChange={(e) => setLocation(e.target.value)} required onFocus={focusBlue} onBlur={blurDefault} />
                  </div>
                </div>
              </div>

              {/* Timing & Tuition Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Preferred Timings</label>
                  <input type="text" style={inputStyle} placeholder="e.g. Weekdays 5-7 PM" value={preferredTiming} onChange={(e) => setPreferredTiming(e.target.value)} onFocus={focusBlue} onBlur={blurDefault} />
                </div>
                <div>
                  <label style={labelStyle}>Tuition Format *</label>
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

              {/* Gender & Budget */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={labelStyle}>Tutor Gender Preference</label>
                  <select style={selectStyle} value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)}>
                    <option>No Preference</option>
                    <option>Male Tutor</option>
                    <option>Female Tutor</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Budget Limit</label>
                  <select style={selectStyle} value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
                    <option>₹300–₹500/hr</option>
                    <option>₹500–₹800/hr</option>
                    <option>₹800+/hr</option>
                  </select>
                </div>
              </div>

              {/* Demo Slot */}
              <div style={{ backgroundColor: 'var(--bg-slate)', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📅 Free Demo Class Slot (Optional)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Select Date</label>
                    <input type="date" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', color: 'var(--text-dark)' }} value={demoDate} onChange={(e) => setDemoDate(e.target.value)} onFocus={focusBlue} onBlur={blurGray} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Select Time</label>
                    <input type="time" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', color: 'var(--text-dark)' }} value={demoTime} onChange={(e) => setDemoTime(e.target.value)} onFocus={focusBlue} onBlur={blurGray} />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Special Instructions / Guidelines</label>
                <textarea style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', backgroundColor: 'var(--bg-slate)', resize: 'vertical', minHeight: '80px' }} rows="2" placeholder="e.g. Focus on CBSE board prep, algebra numericals..." value={notes} onChange={(e) => setNotes(e.target.value)} onFocus={focusBlue} onBlur={blurDefault}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700' }} disabled={isSubmitting}>
                {isSubmitting ? 'Processing Tutors...' : 'Match & Assign Tutor Now ➔'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
