import { useState } from 'react';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { travelSolutions, ecommerceSolutions, realEstateSolutions } from './SolutionData';

const TabPanel = ({ children, isActive }) => (
  <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired
};

const Solutions = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [activeExample, setActiveExample] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderExampleDetails = (example) => (
    <div className="mt-4 p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
        <h4 className="text-base md:text-lg font-bold text-slate-900">{example.name}</h4>
        <div className="text-sm text-slate-600">
          Sources: {example.sources.join(', ')}
        </div>
      </div>
      <div className="bg-slate-50/80 rounded-xl p-4">
        <h5 className="text-sm font-medium text-slate-900 mb-3">Schema Structure:</h5>
        <div className="grid grid-cols-1 gap-2 font-mono text-sm">
          {Object.entries(example.schema).map(([key, type]) => (
            <div key={key} className="flex items-start gap-4 pl-4">
              <span className="text-primary-600 font-medium min-w-[120px] md:min-w-[160px]">{key}:</span>
              <span className="text-slate-600">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMobileSolution = (solution, index) => (
    <div key={index} className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => toggleCard(index)}
        className="w-full py-4 px-4 md:px-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl md:text-3xl bg-gradient-to-br from-primary-100 to-transparent w-12 h-12 rounded-xl flex items-center justify-center">{solution.icon}</span>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">{solution.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-1">{solution.description}</p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-slate-400 ${expandedCards[index] ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedCards[index] && (
        <div className="pb-4 px-4 md:px-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {solution.examples.map((example, exampleIndex) => (
              <button
                key={exampleIndex}
                onClick={() => setActiveExample(activeExample === exampleIndex ? null : exampleIndex)}
                className={`p-3 text-left rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  activeExample === exampleIndex
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'hover:bg-slate-50 text-slate-600 hover:shadow-sm'
                }`}
              >
                <div className="text-sm font-medium truncate">{example.name}</div>
                <div className="text-xs opacity-75 truncate">{example.sources[0]}</div>
              </button>
            ))}
          </div>
          {activeExample !== null && renderExampleDetails(solution.examples[activeExample])}
        </div>
      )}
    </div>
  );

  const renderDesktopSolution = (solution, index) => (
    <div
      key={index}
      className="group bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:-translate-y-1"
    >
      <div className="text-3xl md:text-4xl mb-6 bg-gradient-to-br from-primary-100 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {solution.icon}
      </div>
      <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
        {solution.title}
      </h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        {solution.description}
      </p>
      
      <div className="space-y-4">
        <h4 className="text-base md:text-lg font-semibold text-slate-900">Available Databases:</h4>
        <div className="grid grid-cols-2 gap-3">
          {solution.examples.map((example, exampleIndex) => (
            <button
              key={exampleIndex}
              onClick={() => setActiveExample(activeExample === exampleIndex ? null : exampleIndex)}
              className={`p-4 text-left rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                activeExample === exampleIndex
                  ? 'bg-primary-50 text-primary-600 shadow-sm'
                  : 'hover:bg-slate-50 text-slate-600 hover:shadow-sm'
              }`}
            >
              <div className="text-sm md:text-base font-medium">{example.name}</div>
              <div className="text-xs md:text-sm opacity-75">{example.sources[0]}</div>
            </button>
          ))}
        </div>
        {activeExample !== null && renderExampleDetails(solution.examples[activeExample])}
      </div>
    </div>
  );

  const renderSolutions = (solutions) => (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden bg-white/90 backdrop-blur-sm rounded-xl shadow-lg divide-y divide-slate-200">
        {solutions.map((solution, index) => renderMobileSolution(solution, index))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
        {solutions.map((solution, index) => renderDesktopSolution(solution, index))}
      </div>
    </>
  );

  return (
    <section id="solutions" className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-accent-purple/5 to-accent-cyan/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex justify-center mb-6 md:mb-8">
            <Logo size="medium" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-8">
            <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              Industry Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Specialized web scraping solutions tailored for your industry needs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 md:mb-16 px-4">
          <div className="inline-flex rounded-xl bg-white/50 backdrop-blur-sm shadow-lg p-1.5 border border-slate-200/60">
            <button
              onClick={() => setActiveTab('travel')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'travel'
                  ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Travel Industry
            </button>
            <button
              onClick={() => setActiveTab('ecommerce')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'ecommerce'
                  ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              E-commerce
            </button>
            <button
              onClick={() => setActiveTab('realestate')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'realestate'
                  ? 'bg-gradient-to-r from-accent-cyan to-primary-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Real Estate
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        <div className="relative min-h-[400px]">
          <TabPanel isActive={activeTab === 'travel'}>
            {renderSolutions(travelSolutions)}
          </TabPanel>

          <TabPanel isActive={activeTab === 'ecommerce'}>
            {renderSolutions(ecommerceSolutions)}
          </TabPanel>

          <TabPanel isActive={activeTab === 'realestate'}>
            {renderSolutions(realEstateSolutions)}
          </TabPanel>
        </div>
      </div>
    </section>
  );
};

export default Solutions; 