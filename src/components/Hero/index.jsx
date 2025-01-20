import { useState } from 'react';
import { Helmet } from 'react-helmet';
import CalendlyPopup from '../CalendlyPopup';
import Logo from '../Logo';
import VideoBackground from './VideoBackground';

const Hero = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Iceberg Data Web Scraping Services",
    "serviceType": "Web Scraping & Data Collection",
    "description": "Professional web scraping service with daily automated data collection and maintenance. Enterprise-grade web scrapers built and maintained by experts.",
    "provider": {
      "@type": "Organization",
      "name": "Iceberg Data LLC",
      "description": "Enterprise web scraping and data collection solutions"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "Custom",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <title>Enterprise Web Scraping Services | Custom Data Collection Solutions | Iceberg Data</title>
        <meta name="description" content="Expert web scraping services for enterprises. We build & maintain reliable scrapers for daily automated data collection. Get clean, structured data with 24/7 monitoring and maintenance." />
        <meta name="keywords" content="web scraping service, automated data collection, daily web scraping, web scraper maintenance, enterprise web scraping, reliable data extraction" />
        <meta property="og:title" content="Enterprise Web Scraping Services | Daily Automated Data Collection" />
        <meta property="og:description" content="Professional web scraping service with daily automated data collection. Expert-built scrapers with 24/7 monitoring and maintenance." />
        <meta property="og:image" content="/logos/logo-large.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enterprise Web Scraping Services | Daily Data Collection" />
        <meta name="twitter:description" content="Professional web scraping service with daily automated data collection. Expert-built scrapers with 24/7 monitoring." />
        <meta name="twitter:image" content="/logos/logo-large.png" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main>
        <section 
          className="relative min-h-[70vh] md:h-[85vh] flex flex-col justify-between overflow-hidden"
          aria-labelledby="hero-title"
        >
          <VideoBackground />
          
          {/* Main Content with improved mobile spacing */}
          <div className="relative flex-grow flex items-center z-10">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
              <div className="text-center">
                <header className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8 pt-16 md:pt-10">
                  <Logo size="small" className="animate-float hidden md:block mt-[3%]" alt="Iceberg Data Logo" />
                  <div className="inline-block px-4 md:px-6 py-2 md:py-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">
                    <span className="bg-gradient-to-r from-primary-700 to-accent-purple bg-clip-text text-transparent font-semibold text-sm md:text-base">
                      Enterprise Web Scraping Services
                    </span>
                  </div>
                </header>

                <h1 
                  id="hero-title"
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dark-900 mb-6 md:mb-8 leading-tight opacity-0 animate-fade-in-up drop-shadow-sm"
                >
                  <span className="text-dark-800">Reliable Web Scrapers</span>{' '}
                  <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent bg-300% animate-subtle-gradient drop-shadow">
                    Built & Maintained Daily
                  </span>
                </h1>

                <p className="text-base md:text-xl text-dark-700 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up-delay font-light px-4 md:px-0">
                  Expert-built web scrapers with 24/7 monitoring and maintenance. Get your data reliably, every single day.
                </p>

                <div className="flex flex-col items-center gap-4 md:gap-6 px-4 md:px-0">
                  <button 
                    onClick={() => setShowCalendly(true)}
                    className="group relative w-full md:w-auto px-6 md:px-8 py-4 rounded-xl text-base md:text-lg font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 touch-manipulation"
                    aria-label="Schedule a consultation"
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary-600 to-accent-purple transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                      aria-hidden="true"
                    ></div>
                    <span className="relative text-white flex items-center justify-center">
                      Get Started with Web Scraping
                      <svg 
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>

                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/30 shadow-md transition-all duration-300 hover:bg-white/80" role="status">
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 text-green-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs md:text-sm font-medium text-dark-600">SSL Secured & GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CalendlyPopup 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </>
  );
};

export default Hero; 