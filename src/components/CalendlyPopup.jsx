import React from 'react';

const CalendlyPopup = ({ isOpen, onClose }) => {
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
          
          <div className="w-full h-full">
            <iframe
              src="https://calendly.com/icedata/dm?month=2025-01&hide_gdpr_banner=1&background_color=ffffff&text_color=111827&primary_color=0070f3&layout=horizontal"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyPopup; 