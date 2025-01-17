import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const CaseModal = ({ caseStudy, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-white to-primary-50 rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-6 mb-10">
          <div className="flex-1">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium mb-4">
              {caseStudy.Sector}
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent mb-3">
              {caseStudy.Title}
            </h3>
            <p className="text-lg text-dark-600">{caseStudy.Subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {showDetails ? 'Hide Details' : 'More Details'}
              <motion.svg
                className="w-4 h-4"
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-dark-400 hover:text-dark-600 bg-white rounded-full p-2 shadow-md"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-dark-800 rounded-xl p-8 text-white">
                <h4 className="text-xl font-bold mb-6">Technical Details</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-semibold mb-4 text-primary-300">Matching Algorithm</h5>
                    <p className="text-light-700 leading-relaxed mb-6">
                      {caseStudy["Matching algorithm used to integrate the data"]}
                    </p>
                    <h5 className="text-lg font-semibold mb-4 text-primary-300">Why This Matters</h5>
                    <p className="text-light-700 leading-relaxed">
                      {caseStudy["Why this matters"]}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-semibold mb-4 text-primary-300">Input Schema</h5>
                      <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        {caseStudy["Input Schema"]}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold mb-4 text-primary-300">Output Schema</h5>
                      <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        {caseStudy["Output Schema"]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary-600 to-accent-purple text-white rounded-xl p-8">
              <h4 className="text-xl font-bold mb-4">Business Impact</h4>
              <p className="leading-relaxed">{caseStudy["Business Impact"]}</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h4 className="text-xl font-bold text-dark-900 mb-6">Implementation Details</h4>
              <ul className="space-y-6">
                <li>
                  <span className="block text-sm font-medium text-primary-600 mb-1">Sector</span>
                  <span className="text-dark-900 text-lg">{caseStudy.Sector}</span>
                </li>
                <li>
                  <span className="block text-sm font-medium text-primary-600 mb-1">Implementation Time</span>
                  <span className="text-dark-900 text-lg">{caseStudy["Implementation time"]}</span>
                </li>
                <li>
                  <span className="block text-sm font-medium text-primary-600 mb-1">Data Collection</span>
                  <span className="text-dark-900 text-lg">{caseStudy["What data was collected"]}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-dark-900 rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-6">Technical Approach</h4>
              <div className="space-y-6">
                <div>
                  <span className="block text-sm font-medium text-primary-300 mb-2">Input Schema</span>
                  <div className="bg-dark-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    {caseStudy["Input Schema"]}
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-medium text-primary-300 mb-2">Output Schema</span>
                  <div className="bg-dark-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    {caseStudy["Output Schema"]}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h4 className="text-xl font-bold text-dark-900 mb-4">Problem Solving</h4>
              <div className="space-y-3">
                {caseStudy["Problems this solves"].split(". ").map((problem, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-dark-600 leading-relaxed">{problem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h4 className="text-xl font-bold text-dark-900 mb-4">The Story</h4>
            <p className="text-dark-600 leading-relaxed">{caseStudy.Story}</p>
          </div>

          <div className="bg-gradient-to-r from-accent-purple/10 to-primary-100/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h4 className="text-xl font-bold text-dark-900 mb-4">Why Choose Our Solution?</h4>
            <p className="text-dark-600 leading-relaxed">{caseStudy["Why it was better to outsource this solution"]}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

CaseModal.propTypes = {
  caseStudy: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Subtitle: PropTypes.string.isRequired,
    "Business Impact": PropTypes.string.isRequired,
    Sector: PropTypes.string.isRequired,
    "Implementation time": PropTypes.string.isRequired,
    "What data was collected": PropTypes.string.isRequired,
    "Input Schema": PropTypes.string.isRequired,
    "Output Schema": PropTypes.string.isRequired,
    Story: PropTypes.string.isRequired,
    "Problems this solves": PropTypes.string.isRequired,
    "Why it was better to outsource this solution": PropTypes.string.isRequired,
    "Matching algorithm used to integrate the data": PropTypes.string.isRequired,
    "Why this matters": PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

const CaseStudies = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allCases, setAllCases] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // For animation trigger

  useEffect(() => {
    const loadCases = async () => {
      try {
        // Load all cases from 1 to 38
        const totalCases = 38;
        const loadedCases = await Promise.all(
          Array.from({ length: totalCases }, (_, i) => 
            fetch(`/articles/cases/${i + 1}.json`).then(res => res.json())
          )
        );

        // Store all cases
        setAllCases(loadedCases);
        
        // Get initial 6 random cases
        const shuffledCases = [...loadedCases].sort(() => Math.random() - 0.5);
        setCases(shuffledCases.slice(0, 6));
      } catch (error) {
        console.error('Error loading case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCases();
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Increment refresh key to trigger animation
    setRefreshKey(prev => prev + 1);
    
    // Short timeout to allow loading state to show
    setTimeout(() => {
      const shuffledCases = [...allCases].sort(() => Math.random() - 0.5);
      setCases(shuffledCases.slice(0, 6));
      setIsLoading(false);
    }, 600);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Logo size="medium" className="opacity-90" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900">
              Real World{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-lg md:text-xl text-dark-600 max-w-2xl mx-auto">
              Discover how our data solutions drive business growth and innovation
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <motion.div 
              key={refreshKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {cases.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.Title} // Using Title as key instead of index
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCase(caseStudy)}
                >
                  <div className="bg-white rounded-2xl shadow-elevation-2 p-8 h-full transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium">
                          {caseStudy.Sector}
                        </div>
                      </div>
                      <h3 className="text-xl font-display font-bold text-dark-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {caseStudy.Title}
                      </h3>
                      <p className="text-dark-600 mb-6 flex-grow">
                        {caseStudy.Subtitle}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                        Read Case Study
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 flex justify-center">
              <motion.button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="group relative px-8 py-4 rounded-xl text-lg font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
                <span className="relative text-white flex items-center gap-2">
                  Load More Cases
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: refreshKey * 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </motion.svg>
                </span>
              </motion.button>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <CaseModal 
            caseStudy={selectedCase} 
            onClose={() => setSelectedCase(null)} 
          />
        )}
      </AnimatePresence>

      <div className="sr-only">
        <h2>All Business Case Studies and Success Stories</h2>
        {allCases.map((caseStudy) => (
          <article key={caseStudy.Title} className="mb-8">
            <h3>{caseStudy.Title}</h3>
            <p><strong>Industry:</strong> {caseStudy.Sector}</p>
            <p><strong>Overview:</strong> {caseStudy.Subtitle}</p>
            <div>
              <h4>Business Impact</h4>
              <p>{caseStudy["Business Impact"]}</p>
            </div>
            <div>
              <h4>Implementation Details</h4>
              <p>{caseStudy["Implementation time"]}</p>
              <p>{caseStudy["What data was collected"]}</p>
            </div>
            <div>
              <h4>Problem Solving</h4>
              <p>{caseStudy["Problems this solves"]}</p>
            </div>
            <div>
              <h4>Case Study Details</h4>
              <p>{caseStudy.Story}</p>
            </div>
            <div>
              <h4>Why Choose Our Solution</h4>
              <p>{caseStudy["Why it was better to outsource this solution"]}</p>
            </div>
          </article>
        ))}
        <footer>
          <p>
            Explore our comprehensive collection of data integration, scraping, and automation case studies. 
            Each case demonstrates our expertise in transforming raw data into actionable insights across various industries.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default CaseStudies; 