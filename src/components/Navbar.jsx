import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const ServicesDropdown = ({ onClose }) => (
  <div className="absolute left-1/2 z-10 mt-1 w-screen max-w-md -translate-x-1/2 transform px-2">
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
      <div className="relative grid gap-6 bg-white p-6">
        <Link
          to="/services/web-scraping"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-1 ring-blue-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">Web Scraping Solutions</p>
            <p className="mt-1 text-sm text-slate-500">Enterprise-grade web scraping infrastructure powered by AI</p>
          </div>
        </Link>

        <Link
          to="/services/data-integration"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg ring-1 ring-purple-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">Data Cleaning & Normalization</p>
            <p className="mt-1 text-sm text-slate-500">AI-powered data cleaning and standardization</p>
          </div>
        </Link>

        <Link
          to="/services/custom-solutions"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg ring-1 ring-pink-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">Custom Solutions</p>
            <p className="mt-1 text-sm text-slate-500">Tailored data solutions for your unique needs</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

const CaseStudiesDropdown = ({ onClose }) => (
  <div className="absolute left-1/2 z-10 mt-1 w-screen max-w-sm -translate-x-1/2 transform px-2">
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5">
      <div className="relative grid gap-3 bg-white p-4">
        <button
          onClick={() => {
            onClose();
            const element = document.getElementById('case-studies');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50 text-left"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg ring-1 ring-green-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">Featured Case Studies</p>
            <p className="mt-1 text-sm text-slate-500">View our featured success stories</p>
          </div>
        </button>

        <Link
          to="/case-studies"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg ring-1 ring-orange-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">All Case Studies</p>
            <p className="mt-1 text-sm text-slate-500">Browse our complete collection</p>
          </div>
        </Link>

        <Link
          to="/private-case-studies"
          onClick={() => {
            onClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-start rounded-lg p-3 hover:bg-slate-50"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg ring-1 ring-purple-500/10">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-slate-900">Private Case Studies</p>
            <p className="mt-1 text-sm text-slate-500">Advanced social media solutions</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

ServicesDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

CaseStudiesDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};

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
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showCaseStudiesDropdown, setShowCaseStudiesDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    setShowServicesDropdown(false);
    setShowCaseStudiesDropdown(false);
  }, [location.pathname]);

  const handleServicesDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowServicesDropdown(true);
    setShowCaseStudiesDropdown(false);
  };

  const handleServicesDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 150); // 150ms delay before closing
    setDropdownTimeout(timeout);
  };

  const handleCaseStudiesDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowCaseStudiesDropdown(true);
    setShowServicesDropdown(false);
  };

  const handleCaseStudiesDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowCaseStudiesDropdown(false);
    }, 150); // 150ms delay before closing
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleNavClick = (section, event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
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
              <div 
                className="relative"
                onMouseEnter={handleServicesDropdownEnter}
                onMouseLeave={handleServicesDropdownLeave}
              >
                <button
                  onClick={(e) => handleNavClick('services', e)}
                  className={`px-3 py-2 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
                    location.pathname.includes('/services') || activeSection === 'services' ? 'bg-primary-50 text-primary-600 font-medium' : ''
                  }`}
                >
                  Services
                </button>
                {showServicesDropdown && (
                  <ServicesDropdown 
                    onClose={() => setShowServicesDropdown(false)} 
                  />
                )}
              </div>
              <div 
                className="relative"
                onMouseEnter={handleCaseStudiesDropdownEnter}
                onMouseLeave={handleCaseStudiesDropdownLeave}
              >
                <button
                  onClick={(e) => handleNavClick('case-studies', e)}
                  className={`px-3 py-2 rounded-xl text-dark-800 hover:text-primary-600 transition-colors ${
                    location.pathname.includes('/case-studies') || activeSection === 'case-studies' ? 'bg-primary-50 text-primary-600 font-medium' : ''
                  }`}
                >
                  Case Studies
                </button>
                {showCaseStudiesDropdown && (
                  <CaseStudiesDropdown 
                    onClose={() => setShowCaseStudiesDropdown(false)} 
                  />
                )}
              </div>
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
              <Link 
                to="/services" 
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <MobileNavLink active={location.pathname.includes('/services')}>Services</MobileNavLink>
              </Link>
              <div className="pl-4 space-y-2 mt-2">
                <Link
                  to="/services/web-scraping"
                  className="block px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Web Scraping Solutions
                </Link>
                <Link
                  to="/services/data-integration"
                  className="block px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Data Cleaning & Normalization
                </Link>
                <Link
                  to="/services/custom-solutions"
                  className="block px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Custom Solutions
                </Link>
              </div>
              <div className="space-y-2">
                <MobileNavLink active={activeSection === 'case-studies'} onClick={(e) => handleNavClick('case-studies', e)}>Case Studies</MobileNavLink>
                <div className="pl-4 space-y-2 mt-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      const element = document.getElementById('case-studies');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                  >
                    Featured Case Studies
                  </button>
                  <Link
                    to="/case-studies"
                    className="block px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    All Case Studies
                  </Link>
                  <Link
                    to="/private-case-studies"
                    className="block px-4 py-3 rounded-lg text-dark-800 hover:text-primary-600 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Private Case Studies
                  </Link>
                </div>
              </div>
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