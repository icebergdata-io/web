import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PreCalendlyForm from './PreCalendlyForm';

const CalendlyPopup = ({ isOpen, onClose }) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset states when popup is closed
  useEffect(() => {
    if (!isOpen) {
      setShowCalendly(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-1 sm:p-4">
        <div className="fixed inset-0 bg-dark-900/30 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-[101]">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {showCalendly ? (
            <div className="w-full h-[85vh]">
              <iframe
                src="https://calendly.com/icedata/dm"
                width="100%"
                height="100%"
                frameBorder="0"
                onLoad={() => setIsLoading(false)}
                className="z-[101]"
              />
            </div>
          ) : (
            <PreCalendlyForm
              onSubmit={() => {
                setIsLoading(true);
                setShowCalendly(true);
              }}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

CalendlyPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CalendlyPopup; 