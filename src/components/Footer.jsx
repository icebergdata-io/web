import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Terms from '../policies/Terms';
import Privacy from '../policies/Privacy';
import Cookies from '../policies/Cookies';
import Refund from '../policies/Refund';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

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
              <h3 className="text-xl font-display font-bold mb-4">Iceberg Data</h3>
              <p className="text-light-600 mb-4">
                Intelligent web scraping and data integration solutions for modern businesses.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-light-600 hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="text-light-600 hover:text-white transition-colors">Services</a></li>
                <li><a href="#case-studies" className="text-light-600 hover:text-white transition-colors">Case Studies</a></li>
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
                  info@iceberg-data.com
                </li>
                <li className="flex items-center text-light-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  +1 438-320-6634
                </li>
                <li className="flex items-center text-light-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  447 Broadway, 2nd Floor – 1978, NY, New York, US, 10013
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com/icebergdata" target="_blank" rel="noopener noreferrer" className="text-light-600 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/icebergdata" target="_blank" rel="noopener noreferrer" className="text-light-600 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-light-600 text-sm">
                © {new Date().getFullYear()} Iceberg Data. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <button 
                  onClick={() => setActiveModal('terms')} 
                  className="text-light-600 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="text-light-600 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setActiveModal('cookies')} 
                  className="text-light-600 hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
                <button 
                  onClick={() => setActiveModal('refund')} 
                  className="text-light-600 hover:text-white transition-colors"
                >
                  Refund Policy
                </button>
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