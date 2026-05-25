import React, { useState, useEffect } from 'react';

export default function AdminModal({ onClose, tutorPool }) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [allRequests, setAllRequests] = useState([]);
  const [selectedRequestForAssign, setSelectedRequestForAssign] = useState(null);

  // Fetch requests for coordinator dashboard
  const fetchAllRequests = async () => {
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (data.success) {
        setAllRequests(data.data);
      }
    } catch (err) {
      // failed silently
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllRequests();
    }
  }, [isAdminAuthenticated]);

  // Admin login handling
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError('Invalid security password. Access Denied!');
    }
  };

  // Admin: Assign specific elite tutor
  const handleAdminAssignTutor = async (reqId, tutor) => {
    try {
      const res = await fetch(`/api/requests/${reqId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutor,
          status: 'Assigned & Learning',
          demoDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
          demoTime: '05:00 PM'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Elite Tutor ${tutor.name} assigned successfully! Simulated SMS alerts sent.`);
        fetchAllRequests();
        setSelectedRequestForAssign(null);
      }
    } catch (err) {
      alert('Failed to assign tutor.');
    }
  };

  // Admin: Update matched status
  const handleAdminUpdateStatus = async (reqId, newStatus) => {
    try {
      const res = await fetch(`/api/requests/${reqId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert('Pipeline status updated.');
        fetchAllRequests();
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Admin: Delete Request
  const handleAdminDelete = async (reqId) => {
    if (!window.confirm('Delete this tuition request permanently?')) return;
    try {
      const res = await fetch(`/api/requests/${reqId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        alert('Tuition inquiry deleted.');
        fetchAllRequests();
      }
    } catch (err) {
      alert('Failed to delete inquiry.');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '960px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: '1px solid #cbd5e1' }}>
        
        {/* Header */}
        <div style={{ padding: '16px 24px', backgroundColor: '#0b1530', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>🛡️ MarksVeda Lead Control Panel</h3>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>

        {/* Content body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {!isAdminAuthenticated ? (
            <div style={{ maxWidth: '380px', margin: '40px auto', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Enter Security Password</h4>
              <form onSubmit={handleAdminAuth}>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Hint: admin123" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{ marginBottom: '15px', textAlign: 'center' }}
                  required
                />
                {adminError && <p style={{ color: '#ef4444', fontSize: '0.78rem', fontWeight: '700', marginBottom: '10px' }}>{adminError}</p>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>🔓 Verify Lock</button>
              </form>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px' }}>
                Assign pre-verified elite tutors, manage demo schedules, adjust statuses, and review SMS alerts generated in the system.
              </p>

              <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1', fontWeight: '700' }}>
                      <th style={{ padding: '10px 12px' }}>ID</th>
                      <th style={{ padding: '10px 12px' }}>Parent & Student</th>
                      <th style={{ padding: '10px 12px' }}>Request Details</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px' }}>Assigned Tutor</th>
                      <th style={{ padding: '10px 12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequests.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No requests submitted yet.</td>
                      </tr>
                    ) : (
                      allRequests.map((req) => (
                        <tr key={req._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{req.reqId}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: '700' }}>{req.parentName}</div>
                            <span style={{ color: '#64748b' }}>Stud: {req.studentName}</span><br />
                            <span style={{ color: '#059669', fontWeight: 'bold' }}>{req.phone}</span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <strong>{req.subject}</strong> — {req.gradeClass} ({req.syllabusBoard})<br />
                            <span style={{ color: '#64748b' }}>Loc: {req.location} | timing: {req.preferredTiming}</span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <select 
                              value={req.status} 
                              onChange={(e) => handleAdminUpdateStatus(req._id, e.target.value)}
                              style={{ padding: '4px', fontSize: '0.75rem', borderRadius: '4px', fontWeight: 'bold' }}
                            >
                              <option>Requirement Logged</option>
                              <option>Shortlisting Tutors</option>
                              <option>Demo Scheduled</option>
                              <option>Assigned & Learning</option>
                            </select>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            {req.assignedTutor && req.assignedTutor.name ? (
                              <div>
                                <strong>🎓 {req.assignedTutor.name}</strong><br />
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{req.assignedTutor.education}</span>
                              </div>
                            ) : (
                              <button 
                                className="btn btn-primary" 
                                style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                                onClick={() => setSelectedRequestForAssign(req)}
                              >
                                ➕ Assign
                              </button>
                            )}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <button 
                              onClick={() => handleAdminDelete(req._id)}
                              style={{ padding: '4px 8px', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tutor Assign overlay */}
      {selectedRequestForAssign && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ fontWeight: '800', marginBottom: '10px', color: 'var(--primary-dark)' }}>Assign Elite Tutor</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '15px' }}>
              Assign one of our verified spotlight experts to {selectedRequestForAssign.parentName}'s requirement ({selectedRequestForAssign.subject}).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {tutorPool.map((t, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.82rem', fontWeight: '700', margin: 0 }}>{t.name}</h5>
                    <span style={{ fontSize: '0.7rem', color: '#059669' }}>{t.education}</span>
                  </div>
                  <button 
                    onClick={() => handleAdminAssignTutor(selectedRequestForAssign._id, t)}
                    className="btn btn-accent" 
                    style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedRequestForAssign(null)} 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '15px', padding: '8px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
