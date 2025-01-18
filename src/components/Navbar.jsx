import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import Logo from './Logo';
import PropTypes from 'prop-types';

const NavLink = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
      active ? 'bg-primary-50 text-primary-600 font-medium' : ''
    }`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-4 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
      active ? 'bg-primary-50 text-primary-600 font-medium' : ''
    } touch-manipulation`}
  >
    {children}
  </button>
);

NavLink.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

MobileNavLink.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const navigate = useNavigate();

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      setIsOpen(diff > 0);
      setTouchStart(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'solutions', 'services', 'case-studies', 'faq', 'contact'];
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

  const handleNavClick = (section, event) => {
    event.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      // If we're not on the home page, navigate there with the section to scroll to
      navigate('/', { state: { scrollTo: section } });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-white/20' : 'bg-transparent'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="relative group flex items-center gap-2 md:gap-3"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const heroElement = document.getElementById('hero');
                if (heroElement) {
                  heroElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/', { state: { scrollTo: 'hero' } });
                }
                setIsOpen(false);
              }}
            >
              <Logo size="small" className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110" />
              <div className="text-lg md:text-2xl font-display font-bold bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-80">
                Iceberg Data
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink active={activeSection === 'about'} onClick={(e) => handleNavClick('about', e)}>About</NavLink>
              <NavLink active={activeSection === 'solutions'} onClick={(e) => handleNavClick('solutions', e)}>Solutions</NavLink>
              <NavLink active={activeSection === 'services'} onClick={(e) => handleNavClick('services', e)}>Services</NavLink>
              <NavLink active={activeSection === 'case-studies'} onClick={(e) => handleNavClick('case-studies', e)}>Case Studies</NavLink>
              <NavLink active={activeSection === 'faq'} onClick={(e) => handleNavClick('faq', e)}>FAQ</NavLink>
              <div className="ml-4">
                <button 
                  onClick={() => setShowCalendly(true)}
                  className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 via-accent-purple to-accent-purple hover:from-accent-purple hover:via-primary-600 hover:to-primary-600 text-white font-medium hover:shadow-lg transition-all duration-500 border border-white/20 bg-[length:200%_200%] bg-[0%_0%] hover:bg-[100%_100%]"
                >
                  <span className="flex items-center gap-2">
                    Schedule a Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="absolute -top-3 -right-3 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-accent-purple/30 backdrop-blur-sm text-[10px] text-white items-center justify-center border border-white/20">
                      New
                    </span>
                  </span>
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 focus:outline-none touch-manipulation"
                aria-label={isOpen ? "Close menu" : "Open menu"}
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

          <div
            className={`md:hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 ${
              isOpen
                ? 'max-h-[calc(100vh-6rem)] opacity-100 mt-4 overflow-y-auto'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="py-6 px-4 space-y-2">
              <MobileNavLink active={activeSection === 'about'} onClick={(e) => handleNavClick('about', e)}>About</MobileNavLink>
              <MobileNavLink active={activeSection === 'solutions'} onClick={(e) => handleNavClick('solutions', e)}>Solutions</MobileNavLink>
              <MobileNavLink active={activeSection === 'services'} onClick={(e) => handleNavClick('services', e)}>Services</MobileNavLink>
              <MobileNavLink active={activeSection === 'case-studies'} onClick={(e) => handleNavClick('case-studies', e)}>Case Studies</MobileNavLink>
              <MobileNavLink active={activeSection === 'faq'} onClick={(e) => handleNavClick('faq', e)}>FAQ</MobileNavLink>
              <div className="pt-4 px-2">
                <button
                  onClick={() => {
                    setShowCalendly(true);
                    setIsOpen(false);
                  }}
                  className="group relative w-full px-6 py-4 text-center rounded-xl bg-gradient-to-r from-primary-600 via-accent-purple to-accent-purple hover:from-accent-purple hover:via-primary-600 hover:to-primary-600 text-white font-medium hover:shadow-lg transition-all duration-500 border border-white/20 bg-[length:200%_200%] bg-[0%_0%] hover:bg-[100%_100%] touch-manipulation"
                >
                  <span className="flex items-center justify-center gap-2">
                    Schedule a Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
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