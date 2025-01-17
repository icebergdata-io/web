import React, { useState, useRef, useEffect } from 'react';
import CalendlyPopup from './CalendlyPopup';

const Hero = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Start fading when approaching the end
      if (video.currentTime >= video.duration - 0.5) {
        setOpacity(Math.max(0, (video.duration - video.currentTime) * 2));
      } else if (video.currentTime <= 0.5) {
        setOpacity(Math.min(1, video.currentTime * 2));
      } else {
        setOpacity(1);
      }
    };

    const handleEnded = () => {
      // Smoothly reset to start
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity }}
          >
            <source src="/videos/backgroundheroivideo.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-white/90 via-primary-50/90 to-white/90"></div>
          <div className="absolute inset-0 bg-mesh-pattern opacity-20"></div>
        </div>

        {/* Animated Gradients */}
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/30 to-primary-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -left-64 -bottom-64 w-[800px] h-[800px] bg-gradient-to-tr from-accent-cyan/30 to-primary-300/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-32 relative">
          <div className="text-center">
            <div className="inline-block animate-float mb-6 px-6 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
              <span className="bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent font-medium">
                Enterprise Data Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-dark-900 mb-8 leading-tight">
              Intelligent Web Scraping &{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan animate-gradient bg-300% bg-clip-text text-transparent">
                Data Integration
              </span>
            </h1>
            <p className="text-xl text-dark-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Automate Data Collection & Integration Across Industries
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setShowCalendly(true)}
                className="group w-full sm:w-auto relative px-8 py-4 rounded-2xl text-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
                <span className="relative text-white">Schedule a Call</span>
              </button>
              <button 
                onClick={() => setShowCalendly(true)}
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-dark-800 px-8 py-4 rounded-2xl text-lg font-semibold border border-gray-200 hover:bg-white hover:border-primary-200 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
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