import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';
import PageLayout from '../../components/PageLayout';
import { generateServiceSchema, generateServiceBreadcrumbSchema } from '../../utils/serviceSchema';

const features = [
  {
    id: 'ai-cleaning',
    title: 'AI-Powered Data Cleaning',
    description: 'Advanced machine learning algorithms automatically detect and correct data inconsistencies.',
    details: [
      'Pattern recognition for anomaly detection',
      'Automated error correction with 99.9% accuracy',
      'Smart duplicate detection and merging',
      'Continuous learning from data patterns'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'field-mapping',
    title: 'Smart Field Mapping',
    description: 'Intelligent field recognition and automated mapping across different data formats.',
    details: [
      'Auto-detection of field types and formats',
      'Cross-schema field matching',
      'Custom mapping rules creation',
      'Format standardization templates'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    )
  },
  {
    id: 'custom-rules',
    title: 'Custom Cleaning Rules',
    description: 'Define and implement specific data cleaning workflows tailored to your needs.',
    details: [
      'Visual rule builder interface',
      'Complex condition chaining',
      'Rule testing and validation',
      'Reusable rule templates'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  }
];

const benefits = [
  {
    title: 'Enhanced Data Quality',
    description: 'Improve data accuracy to 99.9% through AI-powered cleaning and validation.',
    details: [
      'Automated error detection and correction',
      'Consistent data formats across all sources',
      'Elimination of duplicate records',
      'Validation against industry standards'
    ]
  },
  {
    title: 'Increased Efficiency',
    description: 'Reduce data preparation time by 80% with automated cleaning workflows.',
    details: [
      'Automated data processing pipelines',
      'Real-time data cleaning and validation',
      'Reduced manual intervention',
      'Scalable processing capabilities'
    ]
  },
  {
    title: 'Better Decision Making',
    description: 'Enable confident decision-making with clean, standardized data.',
    details: [
      'Consistent data across all systems',
      'Reliable analytics and reporting',
      'Enhanced data governance',
      'Improved data accessibility'
    ]
  }
];

const useCases = [
  {
    title: 'Customer Data Consolidation',
    description: 'Unify and clean customer data from multiple sources to create a single source of truth.',
    features: [
      'Automated deduplication',
      'Address standardization',
      'Contact information validation',
      'Cross-reference verification'
    ],
    caseStudies: [
      {
        title: 'Customer Data Unification',
        description: 'How we helped a retail chain clean and consolidate 5M+ customer records, improving marketing effectiveness by 40%.',
        link: '/case-study/retail/enhancing-loyalty-programs-with-public-competitor-benchmarking-analyzing-reward-structures-displayed-on-rival-retail-sites'
      }
    ]
  },
  {
    title: 'Product Catalog Management',
    description: 'Standardize and enrich product data to ensure consistency across all sales channels.',
    features: [
      'Attribute normalization',
      'Category standardization',
      'Description enrichment',
      'Image validation'
    ],
    caseStudies: [
      {
        title: 'E-commerce Catalog Optimization',
        description: 'Implementing automated product data cleaning for a marketplace with 1M+ SKUs, reducing listing errors by 95%.',
        link: '/case-study/ecommerce/digital-shelf-optimization-via-public-marketplace-scraping-tracking-keyword-rankings-and-competitor-products-to-boost-visibility'
      }
    ]
  },
  {
    title: 'Financial Data Standardization',
    description: 'Clean and normalize financial data to ensure accuracy and compliance.',
    features: [
      'Transaction reconciliation',
      'Currency normalization',
      'Account categorization',
      'Compliance validation'
    ],
    caseStudies: [
      {
        title: 'Financial Data Cleaning',
        description: 'Automating financial data cleaning for a fintech company, reducing processing time by 85% while maintaining 99.9% accuracy.',
        link: '/case-study/market-analytics/price-sensitivity-analysis-using-public-competitor-offer-scraping-refining-price-points-by-monitoring-discount-trends'
      }
    ]
  }
];

const FeatureCard = ({ feature, isExpanded, onToggle }) => (
  <div 
    className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
      isExpanded ? 'bg-gradient-to-br from-slate-50 to-white shadow-lg scale-105' : 'bg-white/50 hover:bg-white/80'
    }`}
  >
    <div 
      className="p-6 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg ring-1 ring-purple-500/10 transition-transform duration-300 ${
          isExpanded ? 'scale-110' : 'group-hover:scale-105'
        }`}>
          {feature.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      <div className={`mt-4 space-y-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
      }`}>
        {feature.details.map((detail, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
            {detail}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DataIntegrationPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Effect to handle smooth scrolling when the page loads with a hash
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        // Add a slight delay to ensure proper scrolling after page load
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const toggleFeature = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  // Generate structured data for SEO
  const serviceSchema = generateServiceSchema({
    name: "Data Cleaning & Normalization",
    description: "Advanced AI algorithms for data cleaning, standardization, and enrichment. Improve data accuracy by 99.9% and reduce preparation time by 80% with automated workflows.",
    serviceType: "Data Integration & Cleaning",
    url: "https://www.icebergdata.co/services/data-integration",
    aggregateRating: {
      ratingValue: "4.9",
      reviewCount: "100+"
    }
  });

  const breadcrumbSchema = generateServiceBreadcrumbSchema("Data Cleaning & Normalization", "/services/data-integration");

  return (
    <>
      {/* Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <PageLayout
        title="Data Cleaning & Normalization - Iceberg Data | AI-Powered Data Quality"
        description="Advanced AI algorithms for data cleaning, standardization, and enrichment. Improve data accuracy by 99.9% and reduce preparation time by 80%."
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Data Cleaning & Normalization', to: '/services/data-integration' }
        ]}
      >
      <div id="data-integration" className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Link 
            to="/services"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium text-sm mb-8 group"
          >
            <svg className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Services
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Data Cleaning & Normalization
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8">
            Using advanced AI algorithms, we clean, standardize, and enrich your data. Our system handles duplicates, missing values, and inconsistencies, ensuring your data is always analysis-ready.
          </p>
          <button
            onClick={() => setShowCalendly(true)}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-800"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-4">
            Key Features
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Our advanced data cleaning platform combines AI-powered automation with customizable rules to deliver pristine data.
          </p>
          <div className="space-y-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isExpanded={expandedFeature === feature.id}
                onToggle={() => toggleFeature(feature.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        
        <div id="benefits" className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-lg text-slate-600">
              Transform your data quality and streamline your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-8 shadow-lg ring-1 ring-slate-200/50"
              >
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div id="use-cases" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            Industry Use Cases
          </h2>
          <p className="text-lg text-slate-600">
            See how different industries leverage our data cleaning solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-8 shadow-lg ring-1 ring-slate-200/50"
            >
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {useCase.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Case Studies */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Case Study</h4>
                {useCase.caseStudies.map((study, studyIndex) => (
                  <Link
                    key={studyIndex}
                    to={study.link}
                    className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  >
                    <h5 className="text-sm font-medium text-slate-900 mb-1">
                      {study.title}
                    </h5>
                    <p className="text-xs text-slate-600">
                      {study.description}
                    </p>
                    <div className="mt-2 flex items-center text-blue-600 text-xs font-medium">
                      Read Case Study
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-300/30 mix-blend-multiply"></div>
        
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-white">
              Ready to Clean Your Data?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let&apos;s discuss how we can help improve your data quality
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-slate-900 font-medium transition-all duration-300 hover:shadow-lg hover:bg-slate-50"
            >
              Schedule a Demo
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CalendlyPopup
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
      </PageLayout>
    </>
  );
};

export default DataIntegrationPage; 