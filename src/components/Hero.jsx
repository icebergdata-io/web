import React, { useState } from 'react';
import CalendlyPopup from './CalendlyPopup';
import Logo from './Logo';

const trustIndicators = [
  {
    logo: "Client 1",
    testimonial: "Iceberg Data transformed our data collection process, saving us countless hours and improving accuracy.",
    author: "John D., CTO"
  },
  {
    logo: "Client 2",
    testimonial: "The AI-powered matching system is revolutionary. It's exactly what we needed for our multi-source data.",
    author: "Sarah M., Data Director"
  },
  {
    logo: "Client 3",
    testimonial: "Outstanding enterprise solution. The scalability and reliability are exactly what we were looking for.",
    author: "Michael R., CEO"
  }
];

const Hero = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with reduced opacity */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          >
            <source src="/videos/backgroundheroivideo.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient with reduced opacity */}
          <div className="absolute inset-0 bg-gradient-radial from-white/85 via-primary-50/85 to-white/85"></div>
          <div className="absolute inset-0 bg-mesh-pattern opacity-15"></div>
        </div>

        {/* Animated Gradients with reduced opacity */}
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -left-64 -bottom-64 w-[800px] h-[800px] bg-gradient-to-tr from-accent-cyan/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-32 relative">
          <div className="text-center">
            <div className="flex flex-col items-center gap-6 mb-8">
              <Logo size="large" className="animate-float" />
              <div className="inline-block px-6 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                <span className="bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent font-medium">
                  Data Solutions Simplified for Every Enterprise
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-dark-900 mb-8 leading-tight opacity-0 animate-fade-in-up">
              Transforming Raw Data Into{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent bg-300% animate-subtle-gradient">
                Actionable Insights
              </span>
            </h1>
            <p className="text-xl text-dark-700 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up-delay">
              Our end-to-end data pipeline ensures you get clean, structured, and ready-to-use data.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => setShowCalendly(true)}
                className="group relative px-10 py-5 rounded-2xl text-xl font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
                <span className="relative text-white flex items-center">
                  Talk to an Expert Now
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          {/* Trust Indicators */}
          <div className="hidden mt-24 text-center">
            <p className="text-dark-600 font-medium mb-8">Trusted By Industry Leaders</p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              {trustIndicators.map((indicator, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="w-32 h-16 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/80 transition-all duration-300 border border-white/20">
                    <div className="text-dark-400 font-medium">{indicator.logo}</div>
                  </div>
                  {/* Testimonial Popup */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full w-64 bg-white rounded-xl shadow-xl p-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 pointer-events-none z-10">
                    <div className="text-sm text-dark-700 italic mb-2">{indicator.testimonial}</div>
                    <div className="text-xs text-dark-500 font-medium">{indicator.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Badge - Repositioned */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 shadow-lg">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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