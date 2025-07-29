import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const CarRentalLanding = () => {

  useEffect(() => {
    // Smooth scrolling for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Add parallax effect to hero
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Car Rental Pricing Intelligence | Competitive Edge | Iceberg Data</title>
        <meta name="description" content="Empower your car rental business with precise, real-time market intelligence through specialized web scraping services. Optimize pricing and boost profitability." />
        <meta name="keywords" content="car rental pricing, competitor analysis, market intelligence, web scraping, rental pricing optimization" />
        <meta property="og:title" content="Car Rental Pricing Intelligence | Competitive Edge | Iceberg Data" />
        <meta property="og:description" content="Empower your car rental business with precise, real-time market intelligence through specialized web scraping services." />
        <meta property="og:image" content="/logos/logo-large.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Car Rental Pricing Intelligence | Competitive Edge" />
        <meta name="twitter:description" content="Empower your car rental business with precise, real-time market intelligence." />
        <meta name="twitter:image" content="/logos/logo-large.png" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple">
          <div className="absolute inset-0 bg-mesh-pattern opacity-10 animate-float"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="hero-content text-center text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Your Competitive Edge in{' '}
                <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                  Car Rental Pricing
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 leading-relaxed">
                Empower your business with precise, real-time market intelligence through specialized web scraping services. Optimize pricing and boost profitability in the competitive car rental market.
              </p>
              <a 
                href="https://calendly.com/icedata/data-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-8 py-4 bg-gradient-to-r from-accent-cyan to-primary-500 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Schedule Your Call Today</span>
              </a>
            </div>
          </div>
        </section>

        {/* Core Offerings */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-dark-900">
              Our Core Offerings
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-purple mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-cyan rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Real-Time Competitor Pricing</h3>
                <p className="text-dark-600 leading-relaxed">Get continuously updated data from leading platforms like Hertz, Avis, Enterprise, Kayak, and Expedia.</p>
              </div>
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Availability & Inventory Insights</h3>
                <p className="text-dark-600 leading-relaxed">Gain immediate visibility into competitor fleet sizes and rental availability.</p>
              </div>
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-teal rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Dynamic Market Analysis</h3>
                <p className="text-dark-600 leading-relaxed">Understand seasonal trends, market fluctuations, and competitor pricing strategies.</p>
              </div>
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-teal to-accent-cyan rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Customized Data Reports</h3>
                <p className="text-dark-600 leading-relaxed">Receive tailored analytics reports formatted to meet your specific business needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Transformation */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-purple">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-white">
              Transforming Your Business
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-white mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-cyan to-white rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Increased Revenue</h3>
                <p className="text-white/90 leading-relaxed">Refine your pricing strategy to seize market opportunities and maximize profitability.</p>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-white rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Operational Efficiency</h3>
                <p className="text-white/90 leading-relaxed">Automate competitor tracking, allowing your team to focus on strategic initiatives.</p>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-teal to-white rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Market Leadership</h3>
                <p className="text-white/90 leading-relaxed">Stay ahead of the curve by anticipating competitor moves with actionable data insights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Superiority */}
        <section className="py-20 bg-gradient-to-br from-white to-primary-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-dark-900">
              Technical Superiority
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-purple mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-teal to-primary-500 rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Fully Compliant</h3>
                <p className="text-dark-600 leading-relaxed">Data collection methodologies that meet all industry standards and regulations.</p>
              </div>
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-cyan rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Reliable Infrastructure</h3>
                <p className="text-dark-600 leading-relaxed">Scalable cloud-based infrastructure ensuring 99.9% uptime for your data needs.</p>
              </div>
              <div className="fade-in bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2 border border-primary-100">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-dark-900">Seamless Integration</h3>
                <p className="text-dark-600 leading-relaxed">Easy integration with your existing analytics or CRM tools for immediate value.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-purple">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-white">
              Why Choose Iceberg Data?
              <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-white mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-accent-cyan mb-4">99%</div>
                <div className="text-white font-semibold">Data Accuracy Guaranteed</div>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-accent-cyan mb-4">24/7</div>
                <div className="text-white font-semibold">Real-Time Monitoring</div>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
                <div className="text-5xl font-bold text-accent-cyan mb-4">100+</div>
                <div className="text-white font-semibold">Industry Leaders Trust Us</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Trusted by Industry Leaders</h3>
                <p className="text-white/90 leading-relaxed">Trusted by industry leaders across the car rental sector with proven results.</p>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Scalable Solutions</h3>
                <p className="text-white/90 leading-relaxed">Scalable solutions uniquely designed for the car rental industry.</p>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Dedicated Support</h3>
                <p className="text-white/90 leading-relaxed">Dedicated customer success manager for smooth integration and ongoing support.</p>
              </div>
              <div className="fade-in bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">Proven Results</h3>
                <p className="text-white/90 leading-relaxed">Proven track record of increasing client revenue by 15-30%.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section id="contact" className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
              Ready to Optimize Your Pricing Strategy?
            </h2>
            <p className="text-xl mb-12 text-white/80 max-w-3xl mx-auto">
              Join the industry leaders who trust Iceberg Data for their competitive intelligence needs.
            </p>
            <a 
              href="https://calendly.com/icedata/data-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-8 py-4 bg-gradient-to-r from-accent-cyan to-primary-500 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Get Started Today</span>
            </a>
          </div>
        </section>
      </div>




    </>
  );
};

export default CarRentalLanding; 