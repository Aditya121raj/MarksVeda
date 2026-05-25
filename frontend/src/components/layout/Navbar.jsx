import React, { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';

export default function Navbar({ onTrackClick }) {
  const scrolled = useScroll(40);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
          <button className="btn btn-secondary" onClick={onTrackClick} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
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
  );
}
