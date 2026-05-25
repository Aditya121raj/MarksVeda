import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTutorPool } from './hooks/useTutorPool';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';

// Sections
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Subjects from './components/sections/Subjects';
import HowItWorks from './components/sections/HowItWorks';
import WhyChoose from './components/sections/WhyChoose';
import TutorRequestForm from './components/sections/TutorRequestForm';
import TutorSpotlight from './components/sections/TutorSpotlight';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';

// Lazy-loaded modals
const TrackerModal = lazy(() => import('./components/modals/TrackerModal'));
const AdminModal = lazy(() => import('./components/modals/AdminModal'));

const ModalFallback = (label) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,21,48,0.65)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
    {label}
  </div>
);

export default function App() {
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const tutorPool = useTutorPool();

  // Ctrl+Shift+A → open admin panel
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

  return (
    <div>
      <Navbar onTrackClick={() => setTrackerOpen(true)} />

      <Hero onTrackClick={() => setTrackerOpen(true)} />
      <Stats />
      <Subjects />
      <HowItWorks />
      <WhyChoose />
      <TutorRequestForm onTrackClick={() => setTrackerOpen(true)} />
      <TutorSpotlight tutorPool={tutorPool} />
      <Testimonials />
      <FAQ />

      <FloatingActions />
      <Footer
        onTrackClick={() => setTrackerOpen(true)}
        onAdminClick={() => setAdminOpen(true)}
      />

      {/* Lazy-loaded modals */}
      {trackerOpen && (
        <Suspense fallback={ModalFallback('Loading Tracker...')}>
          <TrackerModal onClose={() => setTrackerOpen(false)} />
        </Suspense>
      )}

      {adminOpen && (
        <Suspense fallback={ModalFallback('Loading Panel...')}>
          <AdminModal onClose={() => setAdminOpen(false)} tutorPool={tutorPool} />
        </Suspense>
      )}
    </div>
  );
}
