import React, { useEffect, useState } from 'react';

const CALENDLY_URL = "https://calendly.com/icedata/dm";

const CalendlyPopup = ({ isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add Calendly script to head if not already present
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    // Initialize Calendly as soon as possible
    const initCalendly = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: document.getElementById('calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
      } else {
        setTimeout(initCalendly, 100);
      }
    };

    if (isOpen && isLoaded) {
      initCalendly();
    }

    return () => {
      // Cleanup if needed
    };
  }, [isOpen, isLoaded]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-dark-900/75 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative w-[95vw] h-[90vh] max-w-[1400px] bg-white shadow-xl rounded-2xl">
          <div className="absolute top-2 right-2 z-10">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none bg-white/80 backdrop-blur-sm rounded-lg"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="w-full h-full relative">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div 
              id="calendly-inline-widget"
              className="w-full h-full rounded-2xl"
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyPopup; 