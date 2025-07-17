import { motion, AnimatePresence } from 'framer-motion';

const PublicationsModal = ({ isOpen, onClose, publications }) => {
  const getDomainName = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0];
    } catch {
      return url;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 transition-opacity"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-dark-900/75 backdrop-blur-sm"></div>
          </motion.div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl sm:p-8"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="text-dark-400 hover:text-dark-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold text-dark-900">
                All Press Coverage
              </h3>
              <p className="mt-2 text-dark-600">
                Browse our comprehensive media coverage across different countries
              </p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-8">
              {publications.map((country, index) => (
                <div key={index} className="border-b border-light-200 last:border-0 pb-8 last:pb-0">
                  <h4 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">
                      {country.country === "Argentina" ? "🇦🇷" : country.country === "Mexico" ? "🇲🇽" : "🇨🇱"}
                    </span>
                    {country.country}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {country.publications.map((pub, pubIndex) => (
                      <a
                        key={pubIndex}
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-xl bg-light-50 hover:bg-light-100 transition-colors group"
                      >
                        <div className="flex-grow text-dark-800 group-hover:text-primary-600 transition-colors">
                          {getDomainName(pub.url)}
                        </div>
                        <svg
                          className="w-4 h-4 text-dark-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PublicationsModal; 