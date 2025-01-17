import React from 'react';
import { motion } from 'framer-motion';

const problems = [
  {
    title: "Fragmented Data Sources",
    description: "Consolidates disparate data sources into one unified database, simplifying analysis.",
    icon: "🔄",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Manual Data Collection",
    description: "Automates data acquisition, cutting labor costs and reducing human error.",
    icon: "⚡",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Data Inconsistencies",
    description: "Ensures high data quality through rigorous cleaning and normalization.",
    icon: "✨",
    gradient: "from-pink-500/20 to-red-500/20"
  },
  {
    title: "Complex Infrastructure",
    description: "Provides a scalable, turnkey solution without costly in-house infrastructure.",
    icon: "🏗️",
    gradient: "from-red-500/20 to-orange-500/20"
  },
  {
    title: "Slow Decision-Making",
    description: "Real-time data integration supports faster insights and quicker responses.",
    icon: "⚡",
    gradient: "from-orange-500/20 to-yellow-500/20"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
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

const Problems = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl border border-gray-100"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-4xl mb-6 bg-gradient-to-br from-primary-100 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center"
                >
                  {problem.icon}
                </motion.div>
                <h3 className="text-xl font-display font-bold text-dark-900 mb-4">{problem.title}</h3>
                <p className="text-dark-700 leading-relaxed">{problem.description}</p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-200 rounded-3xl transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problems; 