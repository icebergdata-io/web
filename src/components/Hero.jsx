import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CalendlyPopup from './CalendlyPopup';
import Logo from './Logo';

const Hero = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
    }
  }, []);

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
        <title>Enterprise Web Scraping Services | Daily Automated Data Collection | Iceberg Data</title>
        <meta name="description" content="Professional web scraping service for enterprises. We build & maintain reliable scrapers for daily automated data collection. Expert-built, always up-to-date, 24/7 monitoring." />
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

      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero Section"
      >
        {/* Background Video with reduced opacity */}
        <div className="absolute inset-0 w-full h-full">
          <video
            id="hero-video"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-90' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <source src="/videos/backgroundheroivideo.mp4" type="video/mp4" />
            <track kind="captions" />
          </video>
          <div className="absolute inset-0 bg-gradient-radial from-white/85 via-primary-50/85 to-white/85"></div>
          <div className="absolute inset-0 bg-mesh-pattern opacity-15"></div>
        </div>

        {/* Animated Gradients */}
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -left-64 -bottom-64 w-[800px] h-[800px] bg-gradient-to-tr from-accent-cyan/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-32 relative">
          <div className="text-center">
            <header className="flex flex-col items-center gap-6 mb-8">
              <Logo size="large" className="animate-float" alt="Iceberg Data Logo" />
              <div className="inline-block px-6 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                <span className="bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent font-medium">
                  Enterprise Web Scraping Services
                </span>
              </div>
            </header>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-dark-900 mb-8 leading-tight opacity-0 animate-fade-in-up">
              Reliable Web Scrapers{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent bg-300% animate-subtle-gradient">
                Built & Maintained Daily
              </span>
            </h1>
            <p className="text-xl text-dark-700 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up-delay">
              Expert-built web scrapers with 24/7 monitoring and maintenance. Get your data reliably, every single day.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => setShowCalendly(true)}
                className="group relative px-10 py-5 rounded-2xl text-xl font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                aria-label="Schedule a consultation"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
                <span className="relative text-white flex items-center">
                  Get Started with Web Scraping
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <p className="text-dark-600 font-medium animate-pulse">
                Limited Project Slots Available Until {' '}
                {(() => {
                  const nextMonth = new Date();
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  nextMonth.setDate(3);
                  return `${nextMonth.toLocaleDateString('en-US', { month: 'long' })} 3rd`;
                })()}
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 shadow-lg" role="status">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-dark-600">SSL Secured & GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      <CalendlyPopup 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </>
  );
};

export default Hero; 