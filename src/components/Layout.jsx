import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import CalendlyPopup from './CalendlyPopup';
import AutoCalendlyTrigger from './AutoCalendlyTrigger';

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
      <AutoCalendlyTrigger onTrigger={() => setShowCalendly(true)} />
      <CalendlyPopup 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </div>
  );
};

export default Layout; 