import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';
import PageLayout from '../../components/PageLayout';

const features = [
  {
    title: 'Premium Network Infrastructure',
    description: 'Access to enterprise-grade proxy networks ensuring reliable and uninterrupted data collection at scale.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    title: 'Scalable Multi-threading',
    description: 'High-performance platform capable of processing millions of inputs simultaneously.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Advanced Data Extraction',
    description: 'Comprehensive data collection from APIs, HTML, endpoints, and mobile apps using sophisticated techniques.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const capabilities = [
  {
    title: 'AI-Powered Solutions',
    items: [
      'Rapid scraper development using AI',
      'JavaScript deobfuscation for complex websites',
      'AI-driven data validation with screenshot comparison',
      'Automated pattern recognition and adaptation'
    ]
  },
  {
    title: 'Integration & Delivery',
    items: [
      'Custom API endpoints for on-demand scraping',
      'SQL and Google Cloud data delivery',
      'Real-time scraper process integration',
      'Automated notifications for scrape status'
    ]
  },
  {
    title: 'Expert Approach',
    items: [
      'Custom unblocking solutions for each target',
      'Hidden data point discovery',
      'Cost-optimized data acquisition strategies',
      'Continuous monitoring and maintenance'
    ]
  }
];

const processSteps = [
  {
    title: 'Initial Consultation',
    description: 'We discuss your data needs, target sources, and specific requirements to design the optimal scraping strategy.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    title: 'Technical Analysis',
    description: 'Our team analyzes the target websites, APIs, and data sources to identify the most efficient extraction methods.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Solution Development',
    description: 'We develop and test custom scrapers, implementing AI-powered solutions and advanced unblocking techniques.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'Integration Setup',
    description: 'We set up APIs, databases, and notification systems to seamlessly deliver data to your preferred destination.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    title: 'Testing & Validation',
    description: 'Comprehensive testing with AI-driven validation ensures accurate and reliable data extraction.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Deployment & Monitoring',
    description: 'We deploy your solution and provide 24/7 monitoring with automated alerts and maintenance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

const useCases = [
  {
    title: 'E-commerce',
    description: 'Monitor competitor prices, track product availability, and gather market intelligence to stay competitive in the fast-paced e-commerce landscape.',
    caseStudies: [
      {
        title: 'Digital Shelf Optimization',
        description: 'How we helped boost marketplace visibility by tracking keyword rankings and competitor products, leading to a 25% increase in sales.',
        link: '/case-study/ecommerce/digital-shelf-optimization-via-public-marketplace-scraping-tracking-keyword-rankings-and-competitor-products-to-boost-visibility'
      },
      {
        title: 'Personalized Recommendation Engine',
        description: 'Extracting user sentiments to refine e-commerce product recommendations through public review scraping.',
        link: '/case-study/ecommerce/personalized-recommendation-engine-via-public-review-scraping-extracting-user-sentiments-to-refine-e-commerce-product-recommendations'
      }
    ]
  },
  {
    title: 'Market Analytics',
    description: 'Analyze market trends, competitor strategies, and consumer behavior to make data-driven business decisions.',
    caseStudies: [
      {
        title: 'Price Sensitivity Analysis',
        description: 'Refining price points by monitoring discount trends through public competitor offer scraping.',
        link: '/case-study/market-analytics/price-sensitivity-analysis-using-public-competitor-offer-scraping-refining-price-points-by-monitoring-discount-trends'
      },
      {
        title: 'Marketing Communications Analysis',
        description: 'Observing competitor ads in real-time to optimize messaging through public ad campaign scraping.',
        link: '/case-study/market-analytics/marketing-communications-analysis-by-scraping-public-ad-campaigns-observing-competitor-ads-in-real-time-to-optimize-your-messaging'
      }
    ]
  },
  {
    title: 'Lead Generation',
    description: 'Identify and capture high-quality leads through automated data collection and analysis.',
    caseStudies: [
      {
        title: 'Cross-Sector Lead Generation',
        description: 'Mining company profiles from public business directories to identify potential joint ventures.',
        link: '/case-study/lead-generation/cross-sector-lead-generation-from-public-business-directories-mining-company-profiles-to-identify-potential-joint-ventures'
      },
      {
        title: 'High-Level B2B Lead Extraction',
        description: 'Scraping conference schedules to connect with industry thought leaders from public speaker agendas.',
        link: '/case-study/lead-generation/high-level-b2b-lead-extraction-from-public-speaker-agendas-scraping-conference-schedules-to-connect-with-industry-thought-leaders'
      }
    ]
  }
];

const WebScrapingPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

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

  return (
    <PageLayout
      title="Web Scraping Solutions - Iceberg Data | Enterprise Data Extraction"
      description="Enterprise-grade web scraping infrastructure for reliable and scalable data extraction. Access premium networks, AI-powered solutions, and expert support."
      breadcrumbItems={[
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: 'Web Scraping Solutions', to: '/services/web-scraping' }
      ]}
    >
      <div id="web-scraping" className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
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
            Web Scraping Solutions
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8">
            Enterprise-grade web scraping infrastructure powered by AI and premium networks, delivering reliable data at scale
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
      <div id="features" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            Core Features
          </h2>
          <p className="text-lg text-slate-600">
            Enterprise-level infrastructure and capabilities for your most demanding data extraction needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-8 shadow-lg ring-1 ring-slate-200/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-1 ring-blue-500/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        
        <div id="capabilities" className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-lg text-slate-600">
              Cutting-edge technologies and methodologies that set our solution apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-8 shadow-lg ring-1 ring-slate-200/50"
              >
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Timeline Section */}
      <div id="process" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-slate-600">
            A systematic approach to delivering reliable web scraping solutions
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-blue-600"></div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-end md:justify-start' : 'justify-start md:justify-end'}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ring-4 ring-white"></div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl shadow-lg ring-1 ring-slate-200/50">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-1 ring-blue-500/10">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
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
            See how different industries leverage our web scraping solutions
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
              
              {/* Case Studies */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">Case Studies</h4>
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
              Ready to Start Extracting Data?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's discuss your web scraping needs and find the perfect solution
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
  );
};

export default WebScrapingPage; 