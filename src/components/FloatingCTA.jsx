import { motion } from 'framer-motion';
import { useState } from 'react';
import CalendlyPopup from './CalendlyPopup';

const FloatingCTA = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50 md:hidden"
      >
        <button
          onClick={() => setShowCalendly(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-600 via-accent-purple to-accent-purple hover:from-accent-purple hover:via-primary-600 hover:to-primary-600 text-white px-6 py-3 rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 hover:-translate-y-1 border border-white/20 bg-[length:200%_200%] bg-[0%_0%] hover:bg-[100%_100%]"
        >
          <span className="font-medium">Book a Demo</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </motion.div>

      <CalendlyPopup 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </>
  );
};

export default FloatingCTA; 