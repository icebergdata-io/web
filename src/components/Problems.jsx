import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const problems = [
  {
    title: "Fragmented Data Sources",
    description: "Consolidates disparate data sources into one unified database, simplifying analysis.",
    icon: "🔄",
    gradient: "from-blue-500/20 to-purple-500/20",
    details: {
      title: "How We Handle Fragmented Data",
      points: [
        "Intelligent source mapping and integration",
        "Automated data consolidation",
        "Real-time synchronization across sources",
        "Smart conflict resolution"
      ],
      impact: "Reduce data fragmentation by 95% and save 20+ hours per week in manual data consolidation."
    }
  },
  {
    title: "Manual Data Collection",
    description: "Automates data acquisition, cutting labor costs and reducing human error.",
    icon: "⚡",
    gradient: "from-purple-500/20 to-pink-500/20",
    details: {
      title: "Our Automation Solution",
      points: [
        "24/7 automated data collection",
        "Intelligent error handling",
        "Adaptive scraping algorithms",
        "Zero human intervention needed"
      ],
      impact: "Eliminate 99% of manual data collection tasks and reduce errors by 95%."
    }
  },
  {
    title: "Data Inconsistencies",
    description: "Ensures high data quality through rigorous cleaning and normalization.",
    icon: "✨",
    gradient: "from-pink-500/20 to-red-500/20",
    details: {
      title: "Data Quality Assurance",
      points: [
        "AI-powered data validation",
        "Automated format standardization",
        "Duplicate detection and removal",
        "Continuous quality monitoring"
      ],
      impact: "Achieve 99.9% data accuracy and reduce inconsistencies by 98%."
    }
  },
  {
    title: "Complex Infrastructure",
    description: "Provides a scalable, turnkey solution without costly in-house infrastructure.",
    icon: "🏗️",
    gradient: "from-red-500/20 to-orange-500/20",
    details: {
      title: "Simplified Infrastructure",
      points: [
        "Cloud-native architecture",
        "Automatic scaling capabilities",
        "Zero maintenance required",
        "Enterprise-grade security"
      ],
      impact: "Reduce infrastructure costs by 70% and eliminate maintenance overhead."
    }
  },
  {
    title: "Slow Decision-Making",
    description: "Real-time data integration supports faster insights and quicker responses.",
    icon: "⚡",
    gradient: "from-orange-500/20 to-yellow-500/20",
    details: {
      title: "Accelerated Decision Making",
      points: [
        "Real-time data processing",
        "Instant insights generation",
        "Automated reporting",
        "Predictive analytics"
      ],
      impact: "Reduce decision-making time by 80% with real-time data access."
    }
  },
  {
    title: "Data Integration Complexity",
    description: "Simplifies the process of combining multiple data sources with intelligent matching.",
    icon: "🎯",
    gradient: "from-yellow-500/20 to-green-500/20",
    details: {
      title: "Smart Integration Solutions",
      points: [
        "AI-powered entity matching",
        "Automated schema mapping",
        "Cross-source data validation",
        "Seamless API integration"
      ],
      impact: "Reduce integration complexity by 85% and deployment time by 60%."
    }
  }
];

const ProblemCard = ({ problem, onClick, isSelected }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`relative cursor-pointer ${isSelected ? 'md:col-span-2 row-span-2' : ''}`}
    whileHover={{ scale: isSelected ? 1 : 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      layout
      className="h-full bg-white/70 backdrop-blur-sm p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl border border-gray-100 relative overflow-hidden"
    >
      <motion.div layout className="relative z-10">
        <motion.div 
          layout
          className="text-4xl mb-6 bg-gradient-to-br from-primary-100 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center"
        >
          {problem.icon}
        </motion.div>
        <motion.h3 layout className="text-xl font-display font-bold text-dark-900 mb-4">
          {problem.title}
        </motion.h3>
        <motion.p layout className="text-dark-600 leading-relaxed">
          {problem.description}
        </motion.p>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <h4 className="text-lg font-semibold text-dark-900 mb-4">{problem.details.title}</h4>
              <ul className="space-y-3">
                {problem.details.points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-dark-600"
                  >
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {point}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-primary-50 rounded-xl"
              >
                <p className="text-primary-600 font-medium">
                  <span className="font-bold">Impact: </span>
                  {problem.details.impact}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10`}></div>
    </motion.div>
  </motion.div>
);

const Problems = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white"></div>
      <div className="absolute w-full h-full">
        <div className="absolute -left-64 top-32 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -right-64 bottom-32 w-[600px] h-[600px] bg-gradient-to-tr from-accent-cyan/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <Logo size="medium" className="opacity-90" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">
            Problems We{' '}
            <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              Solve
            </span>
          </h2>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto leading-relaxed">
            Transform your data challenges into competitive advantages with our intelligent solutions
          </p>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              problem={problem}
              onClick={() => setSelectedProblem(selectedProblem === index ? null : index)}
              isSelected={selectedProblem === index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problems; 