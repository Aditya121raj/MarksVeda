const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Elite pre-verified tutor pool
const ELITE_TUTOR_POOL = [
  {
    name: 'Prof. Rajesh Kumar',
    education: 'M.Sc. Mathematics, IIT Delhi',
    experience: '10+ Years — Class 9 to 12 Board Exams',
    subjectsTeaches: 'Maths, Physics, Applied Calculus',
    rating: 4.9,
    phone: '+91 98100 11234',
    avatar: 'RK',
    kycVerified: true, degreeVerified: true, bgChecked: true
  },
  {
    name: 'Dr. Anjali Roy',
    education: 'M.B.B.S. + B.Ed., AIIMS Graduate',
    experience: '8+ Years — NEET & Biology Specialist',
    subjectsTeaches: 'Biology, Chemistry, NEET Preparation',
    rating: 4.8,
    phone: '+91 98200 22345',
    avatar: 'AR',
    kycVerified: true, degreeVerified: true, bgChecked: true
  },
  {
    name: 'Mr. Vikram Singh',
    education: 'B.Tech Computer Science, NIT Trichy',
    experience: '6+ Years — Coding & Maths Expert',
    subjectsTeaches: 'Python, Web Dev, Maths, JEE Prep',
    rating: 4.7,
    phone: '+91 97300 33456',
    avatar: 'VS',
    kycVerified: true, degreeVerified: true, bgChecked: true
  },
  {
    name: 'Ms. Priya Verma',
    education: 'M.A. English Literature, Delhi University',
    experience: '7+ Years — English & Spoken Communication',
    subjectsTeaches: 'English Grammar, Literature, Spoken English',
    rating: 4.9,
    phone: '+91 96400 44567',
    avatar: 'PV',
    kycVerified: true, degreeVerified: true, bgChecked: true
  },
  {
    name: 'Dr. Suresh Nair',
    education: 'Ph.D. Physics, IISc Bangalore',
    experience: '12+ Years — JEE Advanced & Board Exams',
    subjectsTeaches: 'Physics, Mechanics, Electromagnetism, JEE',
    rating: 5.0,
    phone: '+91 95500 55678',
    avatar: 'SN',
    kycVerified: true, degreeVerified: true, bgChecked: true
  },
  {
    name: 'Ms. Fatima Khan',
    education: 'B.Sc. Chemistry (Hons.), Aligarh Muslim University',
    experience: '5+ Years — Chemistry & NEET Foundation',
    subjectsTeaches: 'Organic Chemistry, Inorganic, Physical Chemistry',
    rating: 4.6,
    phone: '+91 94600 66789',
    avatar: 'FK',
    kycVerified: true, degreeVerified: true, bgChecked: true
  }
];

// GET /api/requests/tutorpool
router.get('/tutorpool', (req, res) => {
  res.json(ELITE_TUTOR_POOL);
});

// POST /api/requests — Submit new inquiry
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newRequest = new Request(data);
    await newRequest.save();

    // Simulate SMS log on creation
    newRequest.smsLogs.push(
      `[${new Date().toLocaleTimeString()}] SMS sent to Parent ${data.parentName}: "Thank you! Your tuition request (${newRequest.reqId}) has been received. Our coordinator will call you in 15 minutes."`
    );
    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/requests — Get all inquiries
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/requests/:id — Get single request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/requests/:id/assign — Assign a tutor
router.put('/:id/assign', async (req, res) => {
  try {
    const { tutor, status, demoDate, demoTime } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    request.assignedTutor = tutor;
    request.status = status || 'Assigned & Learning';
    if (demoDate) request.demoDate = demoDate;
    if (demoTime) request.demoTime = demoTime;

    // Generate SMS log
    const smsToParent = `[${new Date().toLocaleTimeString()}] SMS to Parent ${request.parentName}: "Great news! ${tutor.name} (${tutor.subjectsTeaches}) has been assigned as your child's tutor. Demo class: ${demoDate || 'TBD'} at ${demoTime || 'TBD'}. Contact: ${tutor.phone}"`;
    const smsToTutor = `[${new Date().toLocaleTimeString()}] SMS to Tutor ${tutor.name}: "New assignment! Student: ${request.studentName}, Class: ${request.gradeClass}, Subject: ${request.subject}. Location: ${request.location}. Demo: ${demoDate || 'TBD'} at ${demoTime || 'TBD'}.`;
    request.smsLogs.push(smsToParent, smsToTutor);

    await request.save();
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/requests/:id/status — Update status only
router.put('/:id/status', async (req, res) => {
  try {
    const { status, demoDate, demoTime } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status, demoDate, demoTime },
      { new: true }
    );
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/requests/:id
router.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
