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
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Logo size="small" />
                <h3 className="text-xl font-display font-bold">Iceberg Data</h3>
              </div>
              <p className="text-light-600 mb-4">
                Intelligent web scraping and data integration solutions for modern businesses.
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/company/icebergdataio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-600 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/icebergdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-600 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleNavClick('about')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('services')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('case-studies')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <Link to="/press" className="text-light-600 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('faq')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-light-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <a 
                    href="mailto:info@iceberg-data.com"
                    className="hover:text-white transition-colors"
                  >
                    info@iceberg-data.com
                  </a>
                </li>
                <li className="flex items-center text-light-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <a 
                    href="https://wa.me/14383206634"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +1 438-320-6634
                  </a>
                </li>
                <li className="flex items-center text-light-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  447 Broadway, 2nd Floor – 1978, NY, New York, US, 10013
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveModal('terms')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('privacy')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('cookies')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('refund')} 
                    className="text-light-600 hover:text-white transition-colors"
                  >
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-light-600 text-sm">
                © {new Date().getFullYear()} Iceberg Data. All rights reserved.
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