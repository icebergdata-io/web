import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import Logo from './Logo';
import PropTypes from 'prop-types';

const NavLink = ({ href, active, children }) => (
  <a
    href={href}
    className={`px-3 py-2 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
      active ? 'bg-primary-50 text-primary-600 font-medium' : ''
    }`}
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, active, children }) => (
  <a
    href={href}
    className={`block px-3 py-2 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
      active ? 'bg-primary-50 text-primary-600 font-medium' : ''
    }`}
  >
    {children}
  </a>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

MobileNavLink.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

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

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Contact', href: '#contact' }
  ];

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
              className="relative group flex items-center gap-3"
            >
              <Logo size="small" className="w-12 h-12" />
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
              <NavLink href="#solutions" active={activeSection === 'solutions'}>Solutions</NavLink>
              <NavLink href="#faq" active={activeSection === 'faq'}>FAQ</NavLink>
              <div className="ml-4">
                <button 
                  onClick={() => setShowCalendly(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white/20"
                >
                  Schedule a Demo
                  <span className="ml-2 text-xs font-normal animate-pulse">Limited Time Offer</span>
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
            className={`md:hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 ${
              isOpen
                ? 'max-h-96 opacity-100 mt-4'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="py-4 px-2 space-y-1">
              <MobileNavLink href="#about" active={activeSection === 'about'}>About</MobileNavLink>
              <MobileNavLink href="#services" active={activeSection === 'services'}>Services</MobileNavLink>
              <MobileNavLink href="#case-studies" active={activeSection === 'case-studies'}>Case Studies</MobileNavLink>
              <MobileNavLink href="#solutions" active={activeSection === 'solutions'}>Solutions</MobileNavLink>
              <MobileNavLink href="#faq" active={activeSection === 'faq'}>FAQ</MobileNavLink>
              <div className="pt-2 px-2">
                <button
                  onClick={() => setShowCalendly(true)}
                  className="w-full px-6 py-3 text-center rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple text-white font-bold hover:shadow-lg transition-all duration-300"
                >
                  Schedule a Demo
                  <span className="ml-2 text-xs font-normal animate-pulse">Limited Time Offer</span>
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

Navbar.propTypes = {
  scrolled: PropTypes.bool
};

export default Navbar; 