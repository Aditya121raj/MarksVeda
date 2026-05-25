import React, { useState } from 'react';

const getStatusStepIndex = (status) => {
  switch (status) {
    case 'Logged': return 0;
    case 'Shortlisting': return 1;
    case 'Demo Fixed': return 2;
    case 'Assigned & Learning': return 3;
    default: return 0;
  }
};

export default function TrackerModal({ onClose }) {
  const [trackerPhone, setTrackerPhone] = useState('');
  const [trackedRequest, setTrackedRequest] = useState(null);
  const [trackerError, setTrackerError] = useState('');

  const handleSearchTracker = async (e) => {
    e.preventDefault();
    if (!trackerPhone) {
      setTrackerError('Please enter parent mobile number');
      return;
    }
    setTrackerError('');
    setTrackedRequest(null);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(r => r.phone.replace(/[^0-9]/g, '').includes(trackerPhone.replace(/[^0-9]/g, '')));
        if (found) {
          setTrackedRequest(found);
        } else {
          setTrackerError('No matching tuition requirement found for this phone number.');
        }
      }
    } catch (err) {
      setTrackerError('Error pulling tracker results.');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div className="notebook-container" style={{ maxWidth: '600px', width: '100%', padding: '25px', position: 'relative', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        
        {/* Close */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>⚡ Live Requirement Status Tracker</h3>
        <p style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', marginBottom: '20px' }}>
          Check assignment, free trial slot, and logs using parent's WhatsApp / Mobile number.
        </p>

        <form onSubmit={handleSearchTracker} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter 10-digit phone number"
            value={trackerPhone}
            onChange={(e) => setTrackerPhone(e.target.value)}
            style={{ flex: 1, padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.82rem', whiteSpace: 'nowrap', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            Fetch Status
          </button>
        </form>

        {trackerError && (
          <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center', marginBottom: '15px' }}>{trackerError}</p>
        )}

        {trackedRequest && (
          <div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.8rem' }}>
              <div>
                <strong>Ref ID:</strong> {trackedRequest.reqId}<br />
                <strong>Parent:</strong> {trackedRequest.parentName}
              </div>
              <div>
                <strong>Subject:</strong> {trackedRequest.subject}<br />
                <strong>Grade Class:</strong> {trackedRequest.gradeClass} ({trackedRequest.syllabusBoard})
              </div>
            </div>

            {/* Milestones */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '20px 0', paddingBottom: '10px' }}>
              <div style={{ position: 'absolute', top: '15px', left: 0, right: 0, height: '4px', backgroundColor: '#e2e8f0', zIndex: 1 }}></div>
              
              {['Logged', 'Shortlisting', 'Demo', 'Assigned'].map((step, idx) => {
                const currentIdx = getStatusStepIndex(trackedRequest.status);
                const isActive = currentIdx === idx;
                const isDone = currentIdx > idx;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: isActive ? '#2563eb' : isDone ? '#0b1530' : '#e2e8f0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', marginTop: '6px', color: isActive ? '#2563eb' : '#64748b' }}>{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Assigned tutor card details */}
            {trackedRequest.assignedTutor && trackedRequest.assignedTutor.name ? (
              <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h5 style={{ color: '#065f46', fontWeight: '800', marginBottom: '8px' }}>🎓 Assigned Verified Personal Tutor</h5>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#065f46', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {trackedRequest.assignedTutor.avatar || 'T'}
                  </div>
                  <div style={{ fontSize: '0.78rem' }}>
                    <strong>{trackedRequest.assignedTutor.name}</strong> ({trackedRequest.assignedTutor.education})<br />
                    <strong>Helpline Contact:</strong> {trackedRequest.assignedTutor.phone}
                  </div>
                </div>
                {trackedRequest.demoDate && (
                  <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#065f46', background: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px dashed #a7f3d0', fontWeight: '700' }}>
                    📅 Demo Trial Scheduled: {trackedRequest.demoDate} at {trackedRequest.demoTime}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', padding: '12px', borderRadius: '6px', fontSize: '0.78rem', color: '#92400e', textAlign: 'center', marginBottom: '20px', fontWeight: '600' }}>
                ⏳ Coordinator is shortlisting elite teachers matching {trackedRequest.subject}. We will update you via SMS shortly!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
