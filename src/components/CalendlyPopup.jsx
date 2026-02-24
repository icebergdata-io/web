import PropTypes from 'prop-types';
import PreCalendlyForm from './PreCalendlyForm';

const BOOKING_URL = 'https://calendar.app.google/31yW5kUHxW93HzEh6';

const CalendlyPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-1 sm:p-4">
        <div className="fixed inset-0 bg-dark-900/30 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <PreCalendlyForm
            onSubmit={() => {
              window.open(BOOKING_URL, '_blank', 'noopener');
              onClose();
            }}
            onClose={onClose}
          />
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