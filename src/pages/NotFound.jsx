import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - Iceberg Data"
        description="The page you're looking for could not be found. Please check the URL or navigate back to our homepage."
        noindex={true} // Prevent indexing of 404 pages
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
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-lg text-dark-700 mb-6">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-primary-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-2">Looking For Something?</h2>
                <ul className="space-y-3 text-dark-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600">→</span>
                    <Link to="/" className="hover:text-primary-600 transition-colors">
                      Return to Homepage
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600">→</span>
                    <Link to="/#solutions" className="hover:text-primary-600 transition-colors">
                      View Our Solutions
                    </Link>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600">→</span>
                    <Link to="/#contact" className="hover:text-primary-600 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-accent-purple/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-dark-900 mb-2">Need Help?</h2>
                <p className="text-dark-700 mb-4">
                  If you can't find what you're looking for, our team is here to help.
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
                Back to Homepage
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

export default NotFound; 