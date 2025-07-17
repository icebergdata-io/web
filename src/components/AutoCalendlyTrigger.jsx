import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AutoCalendlyTrigger = ({ onTrigger }) => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Count down every second
    const interval = setInterval(() => {
      if (isTabActive && !hasTriggered) {  // Only count down if tab is active and not triggered
        setTimeLeft(prev => {
          const newTime = Math.max(0, prev - 1);
          if (newTime === 0 && !hasTriggered) {
            onTrigger();
            setHasTriggered(true);
          }
          return newTime;
        });
      }
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [hasTriggered, onTrigger, isTabActive]);

  // Only show debug display in development
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg z-50">
      {hasTriggered ? 'Triggered!' : `Triggering in: ${timeLeft}s${!isTabActive ? ' (paused)' : ''}`}
    </div>
  );
};

AutoCalendlyTrigger.propTypes = {
  onTrigger: PropTypes.func.isRequired
};

export default AutoCalendlyTrigger; 