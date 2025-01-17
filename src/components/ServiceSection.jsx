import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const services = [
  {
    title: "Automated Data Collection",
    description: "Advanced scraping tools that adapt to website changes, ensuring reliable data streams.",
    details: "Our intelligent bots continuously monitor and collect data from multiple sources, automatically adjusting to site updates and structural changes. With built-in rate limiting and proxy management, we ensure optimal collection performance.",
    extendedInfo: {
      features: [
        "AI-powered web scraping that adapts to site changes",
        "Intelligent rate limiting and proxy rotation",
        "Real-time monitoring and error handling",
        "Support for multiple data formats and structures",
        "Automated scheduling and batch processing"
      ],
      benefits: [
        "Reduce manual data collection effort by 90%",
        "Ensure consistent data quality",
        "Scale your data collection effortlessly",
        "Stay compliant with website policies"
      ],
      useCases: [
        "E-commerce price monitoring",
        "Market research and analysis",
        "Lead generation and prospecting",
        "Competitive intelligence gathering"
      ]
    },
    icon: "🤖"
  },
  {
    title: "Data Cleaning & Normalization",
    description: "Transform raw data into structured, consistent formats ready for analysis.",
    details: "Using advanced AI algorithms, we clean, standardize, and enrich your data. Our system handles duplicates, missing values, and inconsistencies, ensuring your data is always analysis-ready.",
    extendedInfo: {
      features: [
        "AI-powered data cleaning and standardization",
        "Automated duplicate detection and removal",
        "Smart field mapping and normalization",
        "Data enrichment and validation",
        "Custom cleaning rules and workflows"
      ],
      benefits: [
        "Improve data accuracy by 99.9%",
        "Reduce data preparation time by 80%",
        "Enhance data consistency across sources",
        "Enable better decision-making"
      ],
      useCases: [
        "Customer data consolidation",
        "Product catalog management",
        "Financial data standardization",
        "Healthcare records processing"
      ]
    },
    icon: "✨"
  },
  {
    title: "Seamless Integration & Delivery",
    description: "Flexible data delivery through APIs, databases, or custom integrations.",
    details: "Choose how you want your data delivered - whether it's through our RESTful API, direct database access, or custom integration with your existing systems. Real-time updates ensure you're always working with the latest data.",
    extendedInfo: {
      features: [
        "RESTful API with comprehensive documentation",
        "Real-time data streaming capabilities",
        "Multiple export formats (JSON, CSV, XML)",
        "Custom webhook integrations",
        "Secure data transmission protocols"
      ],
      benefits: [
        "Integrate with any existing system",
        "Access data in real-time",
        "Reduce integration complexity",
        "Maintain data security"
      ],
      useCases: [
        "CRM system integration",
        "Business intelligence tools",
        "Custom analytics platforms",
        "Automated reporting systems"
      ]
    },
    icon: "🔄"
  }
];

const DetailedPopup = ({ service, onClose }) => {
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
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center text-2xl">
              {service.icon}
            </div>
            <h3 className="text-2xl font-display font-bold text-dark-900">{service.title}</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-dark-400 hover:text-dark-600"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-bold text-dark-900 mb-3">Overview</h4>
            <p className="text-dark-600 leading-relaxed">{service.details}</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-dark-900 mb-3">Key Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.extendedInfo.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-dark-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-dark-900 mb-3">Benefits</h4>
              <ul className="space-y-2">
                {service.extendedInfo.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-dark-600 flex items-center gap-2"
                  >
                    <span className="text-primary-600">•</span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-dark-900 mb-3">Use Cases</h4>
              <ul className="space-y-2">
                {service.extendedInfo.useCases.map((useCase, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="text-dark-600 flex items-center gap-2"
                  >
                    <span className="text-primary-600">•</span>
                    {useCase}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white font-medium rounded-xl flex items-center justify-center gap-2 mt-8"
            onClick={onClose}
          >
            Get Started
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const expandedCardVariants = {
    initial: {
      height: "400px",
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    expanded: {
      height: "500px",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        backgroundColor: {
          duration: 0.3
        }
      }
    }
  };

  const contentVariants = {
    initial: {
      opacity: 1,
      y: 0
    },
    expanded: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const expandedContentVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title Section */}
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
              Transforming Raw Data Into{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h2>
            <p className="text-lg md:text-xl text-dark-600 max-w-2xl mx-auto">
              Our end-to-end data pipeline ensures you get clean, structured, and ready-to-use data
            </p>
          </motion.div>
        </div>

        {/* Service Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative"
              style={{ height: "400px" }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl cursor-pointer overflow-hidden"
                variants={expandedCardVariants}
                initial="initial"
                animate={activeCard === index ? "expanded" : "initial"}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                <motion.div
                  className="h-full bg-white rounded-2xl shadow-elevation-2 p-8 flex flex-col"
                  variants={contentVariants}
                  animate={activeCard === index ? "expanded" : "initial"}
                >
                  <div className="text-4xl mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">{service.title}</h3>
                  <p className="text-dark-600 leading-relaxed flex-grow">{service.description}</p>
                  <div className="mt-6 text-primary-600 font-medium flex items-center gap-2">
                    Click to learn more
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: activeCard === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {activeCard === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-purple text-white rounded-2xl p-8 flex flex-col"
                      variants={expandedContentVariants}
                      initial="initial"
                      animate="expanded"
                      exit="initial"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-display font-bold mb-2">{service.title}</h3>
                          <p className="text-white/80">{service.description}</p>
                        </div>
                        <motion.button
                          className="text-white/80 hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCard(null);
                          }}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                      <p className="leading-relaxed flex-grow">{service.details}</p>
                      <motion.button 
                        className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium group flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(service);
                        }}
                      >
                        Learn More
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <DetailedPopup 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceSection; 