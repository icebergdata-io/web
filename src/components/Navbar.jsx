import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'case-studies', 'contact'];
      let current = '';

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative group"
            >
              <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Iceberg Data
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-purple transition-all duration-300 group-hover:w-full"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="#about" active={activeSection === 'about'}>About</NavLink>
              <NavLink href="#services" active={activeSection === 'services'}>Services</NavLink>
              <NavLink href="#case-studies" active={activeSection === 'case-studies'}>Case Studies</NavLink>
              <div className="ml-4">
                <button 
                  onClick={() => setShowCalendly(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Schedule a Call
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 focus:outline-none"
              >
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span
                    className={`absolute block h-0.5 w-6 bg-dark-800 transform transition duration-300 ease-in-out ${
                      isOpen ? 'rotate-45' : '-translate-y-2'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-dark-800 transform transition duration-300 ease-in-out ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-dark-800 transform transition duration-300 ease-in-out ${
                      isOpen ? '-rotate-45' : 'translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? 'max-h-96 opacity-100 mt-4'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="py-2 space-y-1">
              <MobileNavLink href="#about" active={activeSection === 'about'}>About</MobileNavLink>
              <MobileNavLink href="#services" active={activeSection === 'services'}>Services</MobileNavLink>
              <MobileNavLink href="#case-studies" active={activeSection === 'case-studies'}>Case Studies</MobileNavLink>
              <div className="pt-2">
                <button
                  onClick={() => setShowCalendly(true)}
                  className="w-full px-4 py-2 text-center rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CalendlyPopup 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </>
  );
};

const NavLink = ({ href, active, children }) => (
  <a
    href={href}
    className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 group ${
      active
        ? 'text-primary-600'
        : 'text-dark-800 hover:text-primary-600'
    }`}
  >
    {children}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-accent-purple transform origin-left transition-transform duration-300 ${
      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
    }`}></span>
  </a>
);

const MobileNavLink = ({ href, active, children }) => (
  <a
    href={href}
    className={`block px-4 py-2 text-base rounded-lg transition-all duration-300 ${
      active
        ? 'bg-primary-50 text-primary-600 font-medium'
        : 'text-dark-800 hover:bg-primary-50 hover:text-primary-600'
    }`}
  >
    {children}
  </a>
);

export default Navbar; 