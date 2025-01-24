import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Logo from './Logo';

const generalFaqs = [
  {
    question: "What types of data sources can you integrate?",
    answer: "We can integrate data from virtually any web source, including e-commerce platforms, social media, business directories, and custom web applications. Our system handles both structured and unstructured data sources."
  },
  {
    question: "How do you ensure data accuracy?",
    answer: "We employ multiple layers of validation, including AI-powered quality checks, cross-source verification, and automated data cleaning processes. Our system maintains data integrity throughout the collection and integration process."
  },
  {
    question: "What makes your matching technology different?",
    answer: "Our proprietary AI matching system uses advanced algorithms to identify and link related entities across different data sources, even when the information isn't exactly the same. This enables more accurate and comprehensive data integration."
  },
  {
    question: "How quickly can you set up a new data integration pipeline?",
    answer: "Typically, we can set up a basic integration pipeline within 1-2 weeks. More complex integrations might take 3-4 weeks, depending on the number of sources and specific requirements."
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, we specialize in creating custom data integration solutions tailored to your specific needs. Our team works closely with you to understand your requirements and design the optimal solution."
  }
];

const travelFaqs = [
  {
    question: "How frequently is hotel pricing data updated?",
    answer: "Our hotel pricing data is updated in real-time, with continuous monitoring of rates across multiple booking platforms and direct hotel websites. We capture rate changes as they happen, ensuring you always have the most current pricing information."
  },
  {
    question: "Can you track specific flight routes?",
    answer: "Yes, we can monitor specific flight routes, including prices, availability, and schedule changes. Our system can track multiple airlines and booking platforms for your chosen routes, providing comprehensive coverage."
  },
  {
    question: "Do you support multi-language review collection?",
    answer: "Yes, we support multi-language review collection and can provide translations. Our system can gather reviews from various languages and normalize them for consistent analysis."
  },
  {
    question: "How do you handle seasonal pricing variations?",
    answer: "Our system automatically adapts to seasonal pricing changes and can provide historical pricing data to help identify patterns and optimize your pricing strategy."
  },
  {
    question: "Can you track package deals and promotions?",
    answer: "Yes, we track package deals, promotions, and special offers across multiple travel platforms, including bundled flights, hotels, and activities."
  }
];

const ecommerceFaqs = [
  {
    question: "How do you handle product variations?",
    answer: "Our system can track multiple variations of products, including different sizes, colors, and configurations, while maintaining accurate price and inventory data for each variant."
  },
  {
    question: "Can you monitor flash sales and limited-time offers?",
    answer: "Yes, our real-time monitoring system can detect and track flash sales, limited-time offers, and temporary price drops across multiple e-commerce platforms."
  },
  {
    question: "Do you support marketplace-specific tracking?",
    answer: "Yes, we can track products across specific marketplaces like Amazon, eBay, Walmart, and others, with support for marketplace-specific features and data points."
  },
  {
    question: "How do you handle product matching across platforms?",
    answer: "We use advanced AI algorithms to match products across different platforms, even when listings have varying titles, descriptions, or images."
  },
  {
    question: "Can you track shipping and fulfillment data?",
    answer: "Yes, we can monitor shipping costs, delivery times, and fulfillment options across different sellers and marketplaces."
  }
];

const realEstateFaqs = [
  {
    question: "How often is property listing data updated?",
    answer: "Our system updates property listings in real-time, capturing new listings, price changes, and status updates as they occur across multiple real estate platforms and MLS systems."
  },
  {
    question: "Can you track historical property values?",
    answer: "Yes, we maintain historical data on property values, including past listing prices, sale prices, and value trends over time for specific properties and neighborhoods."
  },
  {
    question: "Do you collect neighborhood demographics data?",
    answer: "Yes, we gather comprehensive neighborhood data including demographics, schools, amenities, crime rates, and other factors that influence property values."
  },
  {
    question: "How do you handle off-market properties?",
    answer: "We can track off-market properties through various sources, including pre-foreclosures, auctions, and pocket listings when available."
  },
  {
    question: "Can you monitor rental market data?",
    answer: "Yes, we track rental listings, rates, occupancy trends, and property management data across multiple platforms and regions."
  }
];

const TabPanel = ({ children, isActive }) => (
  <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('ecommerce');

  // Create FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [...generalFaqs, ...travelFaqs, ...ecommerceFaqs, ...realEstateFaqs].map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const renderFaqSection = (faqs, title) => (
    <div className="mb-16 last:mb-0">
      <h3 className="text-2xl font-display font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          {title}
        </span>
      </h3>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-gray-200 py-6 last:border-none"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left group"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h4 className="text-xl font-medium text-dark-900 group-hover:text-primary-600 transition-colors">
                {faq.question}
              </h4>
              <span className="ml-6 flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`mt-4 transition-all duration-300 ${
                openIndex === index 
                  ? 'opacity-100 max-h-96' 
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <p className="text-dark-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section 
        id="faq" 
        className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white"
        aria-labelledby="faq-title"
      >
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-accent-purple/5 to-accent-cyan/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <header className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <Logo size="medium" />
            </div>
            <h2 
              id="faq-title"
              className="text-4xl md:text-5xl font-display font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
          </header>

          {/* General Questions Section */}
          <div className="mb-24">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-elevation-2 border border-white/20">
                <h3 className="text-2xl font-display font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent">
                    General Questions
                  </span>
                </h3>
                {generalFaqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="border-b border-gray-200 py-6 last:border-none"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex justify-between items-center text-left group"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h4 className="text-xl font-medium text-dark-900 group-hover:text-primary-600 transition-colors">
                        {faq.question}
                      </h4>
                      <span className="ml-6 flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        {openIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`mt-4 transition-all duration-300 ${
                        openIndex === index 
                          ? 'opacity-100 max-h-96' 
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                    >
                      <p className="text-dark-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry-Specific Questions */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold">
              <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Industry-Specific Questions
              </span>
            </h3>
          </div>

          {/* FAQ Section Tabs */}
          <div className="flex justify-center mb-16 overflow-x-auto px-4 -mx-4 scrollbar-hide">
            <div className="inline-flex flex-nowrap sm:flex-wrap gap-2 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg p-1.5 border border-white/20">
              <button
                onClick={() => setActiveSection('travel')}
                className={`whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'travel'
                    ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg'
                    : 'text-dark-600 hover:text-dark-900'
                }`}
              >
                Travel
              </button>
              <button
                onClick={() => setActiveSection('ecommerce')}
                className={`whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'ecommerce'
                    ? 'bg-gradient-to-r from-accent-cyan to-primary-600 text-white shadow-lg'
                    : 'text-dark-600 hover:text-dark-900'
                }`}
              >
                E-commerce
              </button>
              <button
                onClick={() => setActiveSection('realestate')}
                className={`whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'realestate'
                    ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-lg'
                    : 'text-dark-600 hover:text-dark-900'
                }`}
              >
                Real Estate
              </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="relative min-h-[400px]">
            <TabPanel isActive={activeSection === 'travel'}>
              {renderFaqSection(travelFaqs, "Travel Industry FAQs")}
            </TabPanel>
            <TabPanel isActive={activeSection === 'ecommerce'}>
              {renderFaqSection(ecommerceFaqs, "E-commerce FAQs")}
            </TabPanel>
            <TabPanel isActive={activeSection === 'realestate'}>
              {renderFaqSection(realEstateFaqs, "Real Estate FAQs")}
            </TabPanel>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ; 