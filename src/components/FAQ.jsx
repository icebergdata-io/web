import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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

  // Create FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section 
        id="faq" 
        className="py-32 relative overflow-hidden bg-white"
        aria-labelledby="faq-title"
      >
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <Logo size="medium" />
            </div>
            <h2 
              id="faq-title"
              className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8"
            >
              Frequently Asked Questions
            </h2>
          </header>

          <div className="max-w-3xl mx-auto" role="region" aria-label="FAQ Accordion">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-gray-200 py-6"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-xl font-medium text-dark-900">{faq.question}</h3>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`mt-4 ${openIndex === index ? 'block' : 'hidden'}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p className="text-dark-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ; 