import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ServiceSection from './components/ServiceSection';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Constants
const DOMAIN = "https://www.icebergdata.co";
const CALENDLY_URL = "https://calendly.com/icedata/dm";

function App() {
  const [scrolled, setScrolled] = useState(false);

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
    <Router>
      <Routes>
        <Route path="/dm" element={<Navigate to={CALENDLY_URL} replace />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navbar scrolled={scrolled} />
              <main>
                <div id="hero">
                  <Hero />
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="services">
                  <ServiceSection />
                </div>
                <div id="case-studies">
                  <CaseStudies />
                </div>
                <div id="faq">
                  <FAQ />
                </div>
                <div id="contact">
                  <Contact />
                </div>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
