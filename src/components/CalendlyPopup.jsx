import React, { useState } from 'react';
import PreCalendlyForm from './PreCalendlyForm';

const CalendlyPopup = ({ isOpen, onClose }) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-dark-900/30 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className={`relative bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[85vh] overflow-hidden transition-opacity duration-500 ${!showCalendly ? 'opacity-20' : 'opacity-100'}`}>
          <div className="absolute right-4 top-4 z-[102]">
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-[101]">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div className="w-full h-full">
            <iframe
              src="https://calendly.com/icedata/dm"
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={() => setIsLoading(false)}
              className="z-[101]"
            ></iframe>
          </div>
        </div>

        {!showCalendly && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[103]">
            <PreCalendlyForm
              onSubmit={() => {
                setShowCalendly(true);
                setIsLoading(true);
              }}
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendlyPopup; 