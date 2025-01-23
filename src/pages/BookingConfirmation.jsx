import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SEO from '../components/SEO';

const BookingConfirmation = () => {
  return (
    <>
      <SEO 
        title="Booking Confirmation - Iceberg Data"
        description="Thank you for booking a consultation with Iceberg Data. We look forward to discussing your data needs."
        noindex={true} // Prevent indexing of transactional pages
      />
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block">
              <Logo size="medium" />
            </Link>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 border border-primary-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-dark-700 mb-6">
                Thank you for scheduling a consultation with Iceberg Data.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-primary-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-2">What's Next?</h2>
                <ul className="space-y-3 text-dark-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>You'll receive a calendar invitation for our meeting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>We'll send you a brief email with any preparation details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>Our team will review your requirements before the call</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent-purple/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-2">Have Questions?</h2>
                <p className="text-dark-700 mb-4">
                  If you need to make any changes or have questions before our meeting, please don't hesitate to reach out.
                </p>
                <a 
                  href="mailto:david@icebergdata.co"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  Contact Support
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-accent-purple hover:shadow-lg transition-all duration-300"
              >
                Return to Homepage
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-dark-500 text-sm">
            © {new Date().getFullYear()} Iceberg Data. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation; 