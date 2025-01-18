import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoPopup = ({ isOpen, onClose, title, description, items, theme = 'dark', position }) => {
  const themes = {
    dark: {
      bg: 'bg-dark-900',
      text: 'text-white',
      border: 'border-dark-700'
    },
    gradient: {
      bg: 'bg-gradient-to-r from-primary-600 to-accent-purple',
      text: 'text-white',
      border: 'border-primary-500'
    },
    light: {
      bg: 'bg-white',
      text: 'text-dark-900',
      border: 'border-primary-100'
    }
  };

  const currentTheme = themes[theme];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
          >
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="z-[60] w-full max-w-lg max-h-[85vh] overflow-y-auto overscroll-contain"
              onClick={e => e.stopPropagation()}
            >
              <div className={`${currentTheme.bg} ${currentTheme.text} p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl border ${currentTheme.border}`}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 md:top-7 md:right-7 lg:top-9 lg:right-9 p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold mb-3 md:mb-4 pr-12">{title}</h3>
                <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8">{description}</p>

                {items && (
                  <div className="space-y-10 md:space-y-2">
                    {items.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start gap-3 md:gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-xl md:text-2xl mt-1">{item.icon}</div>
                        <div>
                          <h4 className="font-medium mb-1 md:mb-2 text-base md:text-lg">{item.title}</h4>
                          <p className="opacity-75 text-sm md:text-base">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoPopup; 