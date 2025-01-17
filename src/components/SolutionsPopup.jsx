import React from 'react';
import Modal from './Modal';

const solutions = [
  {
    title: "E-commerce Intelligence",
    description: "Real-time price monitoring, competitor analysis, and product data extraction across major marketplaces.",
    icon: "🛍️"
  },
  {
    title: "Financial Data Aggregation",
    description: "Automated collection of market data, financial statements, and economic indicators for investment insights.",
    icon: "📊"
  },
  {
    title: "Lead Generation",
    description: "Targeted business contact information and company data extraction for sales and marketing teams.",
    icon: "🎯"
  },
  {
    title: "Market Research",
    description: "Comprehensive data collection for industry analysis, consumer trends, and competitive intelligence.",
    icon: "📈"
  }
];

const SolutionsPopup = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Our Data Solutions"
    >
      <div className="p-6">
        <p className="text-lg text-dark-700 mb-8 leading-relaxed">
          We provide specialized data extraction and integration solutions tailored to your industry needs, ensuring accurate and timely insights for your business decisions.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="bg-light-50 p-6 rounded-2xl border border-light-200 hover:border-primary-200 transition-colors"
            >
              <div className="text-3xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-display font-bold text-dark-900 mb-2">
                {solution.title}
              </h3>
              <p className="text-dark-700">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-light-200">
          <div className="flex items-center justify-between">
            <p className="text-dark-700">
              Ready to get started?
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SolutionsPopup; 