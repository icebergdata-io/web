import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Terms from '../policies/Terms';
import Privacy from '../policies/Privacy';
import Cookies from '../policies/Cookies';
import Refund from '../policies/Refund';
import Logo from './Logo';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => setActiveModal(null);

  const handleNavClick = (section) => {
    navigate('/', { state: { scrollTo: section } });
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      case 'cookies':
        return <Cookies />;
      case 'refund':
        return <Refund />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'terms':
        return 'Terms and Conditions';
      case 'privacy':
        return 'Privacy Policy';
      case 'cookies':
        return 'Cookie Policy';
      case 'refund':
        return 'Refund Policy';
      default:
        return '';
    }
  };

  return (
    <>
      <footer className="bg-dark-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 opacity-50"></div>
        <div className="absolute -left-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="lg:col-span-4 sm:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Logo size="small" />
                <h3 className="text-lg sm:text-xl font-display font-bold">Iceberg Data</h3>
              </div>
              <p className="text-sm sm:text-base text-light-400 mb-4 sm:mb-6 max-w-md">
                Intelligent web scraping and data integration solutions for modern businesses. Transform raw data into actionable insights with our enterprise-grade solutions.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/company/icebergdataio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-dark-800 text-light-400 hover:text-white hover:bg-dark-700 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/icebergdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-dark-800 text-light-400 hover:text-white hover:bg-dark-700 transition-all duration-300"
                  aria-label="Twitter/X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 sm:col-span-1">
              <h3 className="text-base sm:text-lg font-display font-bold mb-3 sm:mb-4 text-white/90">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={() => handleNavClick('about')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <Link 
                    to="/services"
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/web-scraping"
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Web Scraping
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/data-integration"
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Data Integration
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/custom-solutions"
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Custom Solutions
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('case-studies')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('faq')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 sm:col-span-1">
              <h3 className="text-base sm:text-lg font-display font-bold mb-3 sm:mb-4 text-white/90">Contact</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a 
                    href="mailto:info@iceberg-data.com"
                    className="text-light-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg className="w-5 h-5 text-light-500 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@iceberg-data.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/14383206634"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg className="w-5 h-5 text-light-500 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 438-320-6634
                  </a>
                </li>
                <li className="flex items-start gap-2 text-light-400">
                  <svg className="w-5 h-5 text-light-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  447 Broadway, 2nd Floor – 1978,<br />NY, New York, US, 10013
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-3 sm:col-span-1">
              <h3 className="text-base sm:text-lg font-display font-bold mb-3 sm:mb-4 text-white/90">Legal</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={() => setActiveModal('terms')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('privacy')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('cookies')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('refund')} 
                    className="text-light-400 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-dark-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-light-400 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Iceberg Data. All rights reserved.
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-light-400 text-xs sm:text-sm">
                <span>Made with</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>by Iceberg Data Team</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={!!activeModal}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default Footer; 