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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-[60] w-full max-w-lg"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`${currentTheme.bg} ${currentTheme.text} p-8 rounded-3xl shadow-xl border ${currentTheme.border} mx-4`}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
              <p className="text-lg opacity-90 mb-6">{description}</p>

              {items && (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-xl mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="opacity-75 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InfoPopup; 