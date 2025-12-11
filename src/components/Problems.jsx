import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Logo from './Logo';
import { Database, Zap, Sparkles, Server, Clock, Target } from 'lucide-react';

const problems = [
  {
    title: "Fragmented Data Sources",
    description: "Consolidates disparate data sources into one unified database, simplifying analysis.",
    icon: <Database className="w-6 h-6" />,
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
    icon: <Zap className="w-6 h-6" />,
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
    icon: <Sparkles className="w-6 h-6" />,
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
    icon: <Server className="w-6 h-6" />,
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
    icon: <Clock className="w-6 h-6" />,
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
    icon: <Target className="w-6 h-6" />,
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

const ProblemCard = ({ problem, onClick, isSelected }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="bg-white rounded-2xl shadow-elevation-2 p-4 sm:p-6 md:p-8 h-full transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1">
        <div className="flex flex-col h-full">
          <div className="mb-3 sm:mb-4 md:mb-6">
            <div className="inline-block p-2 sm:p-3 bg-primary-100 text-primary-600 rounded-xl">
              {problem.icon}
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-bold text-dark-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-primary-600 transition-colors">
            {problem.title}
          </h3>
          <p className="text-sm sm:text-base text-dark-600 mb-3 sm:mb-4 md:mb-6 flex-grow">
            {problem.description}
          </p>
          <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
            Learn More
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
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
  );
};

ProblemCard.propTypes = {
  problem: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.shape({
      title: PropTypes.string.isRequired,
      points: PropTypes.arrayOf(PropTypes.string).isRequired,
      impact: PropTypes.string.isRequired
    }).isRequired,
    gradient: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

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
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProblem(problem)}
              className="group cursor-pointer"
            >
              <ProblemCard problem={problem} onClick={() => setSelectedProblem(problem)} isSelected={selectedProblem === problem} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problems; 