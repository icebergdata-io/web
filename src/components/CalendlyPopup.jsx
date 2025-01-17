import React, { useState } from 'react';
import PreCalendlyForm from './PreCalendlyForm';

const CalendlyPopup = ({ isOpen, onClose }) => {
  const [showCalendly, setShowCalendly] = useState(false);

  if (!isOpen) return null;

  if (!showCalendly) {
    return (
      <PreCalendlyForm
        onSubmit={() => setShowCalendly(true)}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-dark-900/30 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden">
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="w-full h-full">
            <iframe
              src="https://calendly.com/icebergdata/30min"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyPopup; 