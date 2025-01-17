import React, { useState } from 'react';
import Logo from './Logo';

const faqs = [
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
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We maintain strict security protocols, including SSL encryption, GDPR compliance, and regular security audits. All data is processed in compliance with relevant data protection regulations."
  },
  {
    question: "What formats can I receive the data in?",
    answer: "We offer flexible data delivery options including API access, direct database integration, and exports in common formats like CSV, JSON, and Excel. We can also accommodate custom format requirements."
  },
  {
    question: "How do you handle changes in source websites?",
    answer: "Our intelligent scraping system automatically adapts to most website changes. We also proactively monitor source websites and quickly update our collectors when necessary to ensure continuous data flow."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide comprehensive support including 24/7 monitoring, regular maintenance, and dedicated technical support. Enterprise clients also get access to a dedicated account manager."
  },
  {
    question: "Can you scale to handle large volumes of data?",
    answer: "Yes, our infrastructure is built for enterprise-scale operations. We can process millions of data points daily while maintaining high performance and accuracy."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Logo size="medium" className="opacity-90" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-dark-700 max-w-3xl mx-auto">
            Get answers to common questions about our data integration solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center"
              >
                <span className="text-lg font-display font-bold text-dark-900">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="mt-2 px-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl">
                  <p className="text-dark-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 