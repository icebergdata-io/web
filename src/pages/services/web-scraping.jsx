import { useState } from 'react';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';

const features = [
  {
    title: 'Advanced Proxy Management',
    description: 'Intelligent IP rotation and proxy management to ensure reliable data collection.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'CAPTCHA Handling',
    description: 'Sophisticated CAPTCHA solving mechanisms to maintain uninterrupted data extraction.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Data Validation',
    description: 'Automated quality checks and data validation to ensure accuracy and completeness.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: 'E-commerce',
    description: 'Monitor competitor prices, track product availability, and gather market intelligence.',
  },
  {
    title: 'Real Estate',
    description: 'Collect property listings, pricing trends, and market analytics.',
  },
  {
    title: 'Travel',
    description: 'Extract flight prices, hotel rates, and travel package information.',
  },
];

const WebScrapingPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <SEO
        title="Web Scraping Solutions - Iceberg Data | Enterprise Data Extraction"
        description="Enterprise-grade web scraping solutions with advanced proxy management, CAPTCHA handling, and data validation. Extract valuable data reliably and at scale."
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800 text-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Web Scraping Solutions
            </h1>
            <p className="text-lg sm:text-xl text-light-400 mb-8">
              Enterprise-grade web scraping infrastructure for reliable and scalable data extraction
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-300"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-dark-600">
            Our web scraping solution comes packed with powerful features to handle your data extraction needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-dark-100/5"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-bold text-dark-900">
                  {feature.title}
                </h3>
                <p className="text-dark-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-dark-50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
              Industry Use Cases
            </h2>
            <p className="text-lg text-dark-600">
              See how different industries leverage our web scraping solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-display font-bold text-dark-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-dark-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Ready to Start Extracting Data?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get in touch with us to discuss your web scraping needs
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-primary-600 font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Schedule a Demo
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CalendlyPopup
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </>
  );
};

export default WebScrapingPage; 