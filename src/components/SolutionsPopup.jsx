import React from 'react';
import Modal from './Modal';

const solutions = [
  {
    title: "Hotel Data Integration",
    description: "Real-time monitoring of hotel prices, availability, and amenities across major booking platforms.",
    icon: "🏨"
  },
  {
    title: "Flight Data Aggregation",
    description: "Comprehensive collection of flight schedules, prices, and route information from multiple airlines and OTAs.",
    icon: "✈️"
  },
  {
    title: "Destination Intelligence",
    description: "Detailed insights on tourist attractions, local events, and traveler reviews from various platforms.",
    icon: "🌎"
  },
  {
    title: "Travel Trends Analysis",
    description: "Real-time tracking of travel patterns, booking behaviors, and seasonal demand fluctuations.",
    icon: "📊"
  }
];

const SolutionsPopup = ({ isOpen, onClose }) => {
  const handleCaseStudiesClick = (event) => {
    event.preventDefault();
    onClose();
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Travel Data Solutions"
    >
      <div className="p-6">
        <p className="text-lg text-dark-700 mb-8 leading-relaxed">
          We specialize in extracting and integrating travel data from multiple sources, providing comprehensive insights for travel companies, OTAs, and hospitality businesses.
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-dark-700">
              Ready to explore our travel data solutions?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCaseStudiesClick}
                className="px-6 py-2 bg-light-50 text-dark-900 rounded-xl font-medium hover:bg-light-100 transition-all duration-300 border border-light-200"
              >
                View Case Studies
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SolutionsPopup; 