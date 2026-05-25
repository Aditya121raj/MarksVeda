const mongoose = require('mongoose');

const assignedTutorSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  subjectsTeaches: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  kycVerified: { type: Boolean, default: true },
  degreeVerified: { type: Boolean, default: true },
  bgChecked: { type: Boolean, default: true }
});

const requestSchema = new mongoose.Schema({
  reqId: { type: String, unique: true },
  parentName: { type: String, required: true },
  studentName: { type: String, default: 'Not Specified' },
  gradeClass: { type: String, required: true },
  subject: { type: String, required: true },
  syllabusBoard: { type: String, default: 'CBSE' },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  preferredTiming: { type: String, default: 'Flexible' },
  tuitionType: { type: String, enum: ['Home', 'Online'], default: 'Home' },
  genderPreference: { type: String, default: 'No Preference' },
  budgetRange: { type: String, default: '₹300–₹500/hr' },
  classesPerWeek: { type: Number, default: 3 },
  classDuration: { type: Number, default: 1.5 },
  notes: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Requirement Logged', 'Shortlisting Tutors', 'Demo Scheduled', 'Assigned & Learning'],
    default: 'Requirement Logged'
  },
  demoDate: { type: String, default: '' },
  demoTime: { type: String, default: '' },
  assignedTutor: { type: assignedTutorSchema, default: () => ({}) },
  smsLogs: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate MV-XXXXXX ID before saving
requestSchema.pre('save', async function (next) {
  if (!this.reqId) {
    this.reqId = 'MV-' + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

module.exports = mongoose.model('Request', requestSchema);
