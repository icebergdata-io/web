import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import Logo from './Logo';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const CaseModal = ({ caseStudy, onClose, allCases, setSelectedCase }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [relatedCases, setRelatedCases] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Find related cases from the same sector
    const related = allCases
      .filter(c => c.Sector === caseStudy.Sector && c.Title !== caseStudy.Title)
      .slice(0, 3);
    setRelatedCases(related);
  }, [caseStudy]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = `Case Study: ${caseStudy.Title}`;
    const text = caseStudy.Subtitle;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(url);
      // You might want to add a toast notification here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="relative min-h-screen md:min-h-[calc(100vh-4rem)] md:my-8 mx-auto max-w-4xl bg-light-50 rounded-none md:rounded-2xl shadow-xl modal-content overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-t-2xl border-b border-dark-100/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                <span>{caseStudy.Sector}</span>
                {caseStudy.publicationDate && (
                  <>
                    <span>•</span>
                    <span>{formatDate(caseStudy.publicationDate)}</span>
                  </>
                )}
              </div>
              <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-dark-900">
                {caseStudy.Title}
              </h2>
              <p className="text-dark-600 text-sm sm:text-base leading-relaxed">{caseStudy.Subtitle}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-xl text-sm sm:text-base font-medium hover:bg-primary-700 transition-colors"
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
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="text-dark-400 hover:text-dark-600 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all"
                  aria-label="Share case study"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-dark-400 hover:text-dark-600 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden technical-details"
            >
              <div className="bg-dark-800 rounded-xl p-4 sm:p-8 text-white">
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Technical Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <div>
                    <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary-300">Example Input JSON</h5>
                    <div className="bg-dark-900 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      {caseStudy["Example_Input_JSON"] ? (
                        <div className="schema-viewer">
                          <JsonView 
                            data={caseStudy["Example_Input_JSON"]} 
                            shouldExpandNode={(level) => level < 2}
                          />
                        </div>
                      ) : caseStudy["Exact_Input_Schema"] ? (
                        <div className="schema-viewer">
                          <JsonView 
                            data={(() => {
                              const schema = { ...caseStudy["Exact_Input_Schema"] };
                              delete schema.required;
                              return schema;
                            })()}
                            shouldExpandNode={(level) => level < 2}
                          />
                        </div>
                      ) : (
                        <pre>{caseStudy["Input Schema"]}</pre>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary-300">Example Output JSON</h5>
                    <div className="bg-dark-900 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                      {caseStudy["Example_Output_JSON"] ? (
                        <div className="schema-viewer">
                          <JsonView 
                            data={caseStudy["Example_Output_JSON"]} 
                            shouldExpandNode={(level) => level < 2}
                          />
                        </div>
                      ) : caseStudy["Exact_Output_Schema"] ? (
                        <div className="schema-viewer">
                          <JsonView 
                            data={(() => {
                              const schema = { ...caseStudy["Exact_Output_Schema"] };
                              delete schema.required;
                              return schema;
                            })()}
                            shouldExpandNode={(level) => level < 2}
                          />
                        </div>
                      ) : (
                        <pre>{caseStudy["Output Schema"]}</pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-primary-600 to-accent-purple text-white rounded-xl p-6 sm:p-8 business-impact-section">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h4 className="text-lg sm:text-xl font-bold">Business Impact</h4>
                </div>
                <p className="leading-relaxed text-sm sm:text-base text-primary-50">{caseStudy["Business Impact"]}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md">
              <h4 className="text-lg sm:text-xl font-bold text-dark-900 mb-4 sm:mb-6">Implementation Details</h4>
              <ul className="space-y-4 sm:space-y-6">
                <li>
                  <span className="block text-xs sm:text-sm font-medium text-primary-600 mb-1">Sector</span>
                  <span className="text-dark-900 text-base sm:text-lg">{caseStudy.Sector}</span>
                </li>
                <li>
                  <span className="block text-xs sm:text-sm font-medium text-primary-600 mb-1">Implementation Time</span>
                  <span className="text-dark-900 text-base sm:text-lg">{caseStudy["Implementation time"]}</span>
                </li>
                <li>
                  <span className="block text-xs sm:text-sm font-medium text-primary-600 mb-1">Data Collection</span>
                  <span className="text-dark-900 text-base sm:text-lg">{caseStudy["What data was collected"]}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md">
              <h4 className="text-lg sm:text-xl font-bold text-dark-900 mb-3 sm:mb-4">Problems Solved</h4>
              <div className="space-y-2 sm:space-y-3">
                {caseStudy["Problems this solves"].split(". ").map((problem, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-primary-600 mt-1.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-dark-600 leading-relaxed text-sm sm:text-base">{problem}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-900 rounded-xl p-4 sm:p-8 text-white">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Matching Algorithm</h4>
              <p className="text-light-700 leading-relaxed text-sm sm:text-base">
                {caseStudy["Matching algorithm used to integrate the data"]}
              </p>
            </div>

            <div className="bg-dark-900 rounded-xl p-4 sm:p-8 text-white">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Why This Matters</h4>
              <p className="text-light-700 leading-relaxed text-sm sm:text-base">
                {caseStudy["Why this matters"]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md">
            <h4 className="text-lg sm:text-xl font-bold text-dark-900 mb-3 sm:mb-4">The Story</h4>
            <div 
              className="text-dark-600 leading-relaxed story-content text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: caseStudy.Story }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowDetails(!showDetails);
                if (!showDetails) {
                  setTimeout(() => {
                    document.querySelector('.technical-details')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 100);
                }
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 mt-4 sm:mt-6 bg-primary-600 text-white rounded-xl text-sm sm:text-base font-medium hover:bg-primary-700 transition-colors"
            >
              {showDetails ? 'Hide Technical Details' : 'View Technical Details'}
              <motion.svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>

          <div className="bg-gradient-to-r from-accent-purple/10 to-primary-100/10 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-white/20">
            <h4 className="text-lg sm:text-xl font-bold text-dark-900 mb-3 sm:mb-4">Why Iceberg Data?</h4>
            <p className="text-dark-600 leading-relaxed text-sm sm:text-base">{caseStudy["Why it was better to outsource this solution"]}</p>
          </div>
        </div>

        {relatedCases.length > 0 && (
          <div className="mt-12 border-t border-dark-100/10 pt-8">
            <h3 className="text-xl font-bold text-dark-900 mb-6">--   Related Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((relatedCase) => (
                <motion.div
                  key={relatedCase.Title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-md cursor-pointer"
                  onClick={() => {
                    setSelectedCase(relatedCase);
                    setTimeout(() => {
                      const businessImpactSection = document.querySelector('.business-impact-section');
                      if (businessImpactSection) {
                        businessImpactSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }, 100);
                  }}
                >
                  <div className="text-sm font-medium text-primary-600 mb-2">{relatedCase.Sector}</div>
                  <h4 className="font-bold text-dark-900 mb-2">{relatedCase.Title}</h4>
                  <p className="text-dark-600 text-sm line-clamp-2">{relatedCase.Subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
    "Input Schema": PropTypes.string,
    "Output Schema": PropTypes.string,
    "Exact_Input_Schema": PropTypes.object,
    "Exact_Output_Schema": PropTypes.object,
    "Example_Input_JSON": PropTypes.object,
    "Example_Output_JSON": PropTypes.object,
    Story: PropTypes.string.isRequired,
    "Problems this solves": PropTypes.string.isRequired,
    "Why it was better to outsource this solution": PropTypes.string.isRequired,
    "Matching algorithm used to integrate the data": PropTypes.string.isRequired,
    "Why this matters": PropTypes.string.isRequired,
    publicationDate: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  allCases: PropTypes.array.isRequired,
  setSelectedCase: PropTypes.func.isRequired
};

// Add skeleton loading component
const CaseStudySkeleton = () => (
  <div className="bg-white rounded-2xl shadow-elevation-2 p-8 h-full animate-pulse">
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="w-24 h-8 bg-primary-100 rounded-lg"></div>
      </div>
      <div className="w-3/4 h-6 bg-dark-100 rounded mb-2"></div>
      <div className="w-1/2 h-6 bg-dark-100 rounded mb-6"></div>
      <div className="flex-grow">
        <div className="w-full h-4 bg-dark-100 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-dark-100 rounded"></div>
      </div>
      <div className="w-32 h-4 bg-primary-100 rounded mt-6"></div>
    </div>
  </div>
);

const CaseStudies = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [allCases, setAllCases] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load case studies only once on component mount
  useEffect(() => {
    const loadCases = async () => {
      try {
        setLoadingCases(true);
        
        // Dynamically determine the number of case studies by trying to fetch them
        let totalCases = 0;
        const maxAttempts = 100; // Reasonable upper limit
        
        for (let i = 1; i <= maxAttempts; i++) {
          try {
            const response = await fetch(`/articles/cases/${i}.json`);
            if (response.ok) {
              totalCases = i;
            } else {
              break; // Stop when we find a missing file
            }
          } catch (error) {
            break; // Stop on any error
          }
        }
        
        console.log(`📊 Found ${totalCases} case studies`);
        
        const loadedCases = await Promise.all(
          Array.from({ length: totalCases }, async (_, i) => {
            const cacheKey = `case-study-${i + 1}`;
            const cached = sessionStorage.getItem(cacheKey);
            
            if (cached) {
              return JSON.parse(cached);
            }
            
            const response = await fetch(`/articles/cases/${i + 1}.json`);
            const data = await response.json();
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
          })
        );

        const sortedCases = loadedCases.sort((a, b) => {
          if (!a.publicationDate || !b.publicationDate) return 0;
          return new Date(b.publicationDate) - new Date(a.publicationDate);
        });

        setAllCases(sortedCases);
      } catch (error) {
        console.error('Error loading case studies:', error);
      } finally {
        setLoadingCases(false);
      }
    };

    loadCases();
  }, []); // Only run once on mount

  // Update displayed cases when screen size changes or when allCases is loaded
  useEffect(() => {
    if (allCases.length > 0) {
      const initialCount = isMobile ? 3 : 6;
      // Randomly select initial cases
      const shuffledCases = [...allCases].sort(() => Math.random() - 0.5);
      setCases(shuffledCases.slice(0, initialCount));
    }
  }, [isMobile, allCases]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Logo size="medium" className="opacity-90" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 px-4 sm:px-0"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-900 leading-tight">
              Real World{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 max-w-2xl mx-auto">
              Discover how our data solutions drive business growth and innovation
            </p>
          </motion.div>
        </div>

        {loadingCases ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4 py-12 sm:py-16">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-dark-900 mb-4">Case Studies</h2>
                <p className="text-dark-600 text-sm sm:text-base max-w-2xl mx-auto">
                  Explore our collection of real-world data solutions that have helped businesses gain competitive advantages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {loadingCases ? (
                  Array(isMobile ? 3 : 6).fill().map((_, index) => (
                    <CaseStudySkeleton key={index} />
                  ))
                ) : (
                  cases.map((caseStudy, index) => (
                    <motion.div
                      key={caseStudy.Title}
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
                            {caseStudy.publicationDate && (
                              <div className="text-sm text-dark-500 mt-2">
                                {formatDate(caseStudy.publicationDate)}
                              </div>
                            )}
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
                  ))
                )}
              </div>

              <div className="flex justify-center mt-12">
                <motion.a
                  href="/case-studies"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-xl text-lg font-bold overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-primary-600 to-accent-purple transition-all group-hover:scale-110 duration-300"></div>
                  <span className="relative text-white flex items-center gap-2">
                    Explore All Cases
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.a>
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <CaseModal 
            caseStudy={selectedCase} 
            onClose={() => setSelectedCase(null)}
            allCases={allCases}
            setSelectedCase={setSelectedCase}
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