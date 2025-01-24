import { useState } from 'react';
import Logo from './Logo';
import InfoPopup from './InfoPopup';
import CalendlyPopup from './CalendlyPopup';
import DataIntegrationAnimation from '../../scripts/matching-animation';

const features = [
  {
    title: "Multi-Platform Scraping",
    description: "Extract data from both web and mobile applications, ensuring comprehensive data coverage across all digital platforms.",
    icon: "📱",
    details: {
      title: "Multi-Platform Scraping",
      description: "Our advanced scraping technology works across all digital platforms, from websites to mobile apps.",
      items: [
        {
          title: "Web Scraping",
          description: "Advanced scraping of modern web applications, single-page apps, and dynamic content.",
          icon: "🌐"
        },
        {
          title: "Mobile App Data",
          description: "Extract data from iOS and Android applications using our specialized mobile scraping tools.",
          icon: "📱"
        },
        {
          title: "API Integration",
          description: "Seamless integration with APIs and automated handling of authentication and rate limiting.",
          icon: "🔌"
        }
      ]
    }
  },
  {
    title: "End-to-End Pipeline",
    description: "We handle the complete data journey: from collection and cleaning to matching and integration into your systems.",
    icon: "🔄",
    details: {
      title: "End-to-End Pipeline",
      description: "A comprehensive data pipeline that handles every step from collection to delivery.",
      items: [
        {
          title: "Automated Collection",
          description: "Intelligent scheduling and coordination of data collection across sources.",
          icon: "⚡"
        },
        {
          title: "Data Processing",
          description: "Advanced cleaning, normalization, and transformation of collected data.",
          icon: "🔧"
        },
        {
          title: "Seamless Delivery",
          description: "Flexible delivery options including APIs, databases, and custom integrations.",
          icon: "🚀"
        }
      ]
    }
  },
  {
    title: "Multi-Source Integration",
    description: "Seamlessly combine data from diverse web sources into a single, coherent database with automated updates.",
    icon: "🔗",
    details: {
      title: "Multi-Source Integration",
      description: "Unify data from multiple sources into a single, coherent database with intelligent matching and alignment.",
      items: [
        {
          title: "Source Mapping",
          description: "Intelligent mapping of data structures across different sources.",
          icon: "🗺️"
        },
        {
          title: "Real-time Updates",
          description: "Continuous monitoring and integration of new data as it becomes available.",
          icon: "⚡"
        },
        {
          title: "Data Validation",
          description: "Comprehensive validation and quality checks across all integrated sources.",
          icon: "✅"
        }
      ]
    }
  },
  {
    title: "Enterprise Scale",
    description: "Built for large-scale operations, processing millions of data points while maintaining accuracy and consistency.",
    icon: "📈",
    details: {
      title: "Enterprise Scale",
      description: "Our infrastructure is built to handle enterprise-level data processing with high reliability and performance.",
      items: [
        {
          title: "High Performance",
          description: "Process millions of data points daily with optimal resource utilization.",
          icon: "⚡"
        },
        {
          title: "Reliability",
          description: "99.9% uptime with built-in failover and recovery mechanisms.",
          icon: "🛡️"
        },
        {
          title: "Scalability",
          description: "Automatically scale resources based on processing demands.",
          icon: "📈"
        }
      ]
    }
  }
];

const popupContent = {
  entityMatching: {
    title: "Intelligent Entity Matching ",
    description: "Our advanced AI algorithms identify and match related entities across different data sources with unprecedented accuracy.",
    items: [
      {
        title: "Pattern Recognition",
        description: "AI-powered recognition of entity patterns across different data formats and structures.",
        icon: "🔍"
      },
      {
        title: "Fuzzy Matching",
        description: "Smart matching that accounts for variations in naming and formatting.",
        icon: "��"
      },
      {
        title: "Confidence Scoring",
        description: "Advanced scoring system to ensure match quality and reliability.",
        icon: "📊"
      }
    ]
  },
  dataAlignment: {
    title: "Cross-Source Data Alignment",
    description: "Automatically align and normalize data from multiple sources into a consistent, unified format.",
    items: [
      {
        title: "Schema Mapping",
        description: "Intelligent mapping of different data schemas into a standardized format.",
        icon: "🗺️"
      },
      {
        title: "Field Normalization",
        description: "Automated standardization of data fields across sources.",
        icon: "✨"
      },
      {
        title: "Format Harmonization",
        description: "Smart conversion of different data formats into a consistent structure.",
        icon: "🔄"
      }
    ]
  },
  deduplication: {
    title: "Automated Data Deduplication",
    description: "Smart detection and merging of duplicate entries while preserving unique information.",
    items: [
      {
        title: "Duplicate Detection",
        description: "Advanced algorithms to identify duplicate entries across sources.",
        icon: "👥"
      },
      {
        title: "Smart Merging",
        description: "Intelligent combination of duplicate records preserving all unique data.",
        icon: "🔗"
      },
      {
        title: "History Tracking",
        description: "Maintain complete history of merged records for transparency.",
        icon: "📜"
      }
    ]
  },
  aiIntegration: {
    title: "Advanced AI Integration",
    description: "Our AI-driven integration process ensures seamless data unification and quality enhancement.",
    items: [
      {
        title: "Real-time Processing",
        description: "Continuous data processing and integration as new information becomes available.",
        icon: "⚡"
      },
      {
        title: "Quality Assurance",
        description: "AI-powered validation and error detection for maintaining high data quality.",
        icon: "✅"
      },
      {
        title: "Smart Mapping",
        description: "Intelligent field mapping and data transformation across different schemas.",
        icon: "🔍"
      }
    ]
  },
  pipeline: {
    title: "Full Integration Pipeline",
    description: "A comprehensive end-to-end solution for all your data integration needs.",
    items: [
      {
        title: "Data Collection",
        description: "Automated scraping from web and mobile sources with intelligent scheduling.",
        icon: "📥"
      },
      {
        title: "Processing & Cleaning",
        description: "Advanced data cleaning, normalization, and enrichment processes.",
        icon: "🧹"
      },
      {
        title: "Delivery & Integration",
        description: "Flexible data delivery through APIs, databases, or custom integrations.",
        icon: "🚀"
      }
    ]
  }
};

const About = () => {
  const [popup, setPopup] = useState({ type: null, position: null });
  const [showCalendly, setShowCalendly] = useState(false);

  const handlePopupClick = (type, event) => {
    event.preventDefault();
    // Map feature titles to their corresponding popup types
    const featureTypeMap = {
      'multi-platformscraping': 'entityMatching',
      'end-to-endpipeline': 'pipeline',
      'multi-sourceintegration': 'dataAlignment',
      'enterprisescale': 'aiIntegration'
    };

    // Handle both feature-index format and direct type format
    if (type.startsWith('feature-')) {
      const index = parseInt(type.split('-')[1]);
      if (index >= 0 && index < features.length) {
        setPopup({
          type: `feature-${index}`,
          position: null
        });
      }
    } else {
      // If it's a direct popup type (like 'entityMatching'), use it directly
      if (popupContent[type]) {
        setPopup({
          type: type,
          position: null
        });
      } else {
        // Convert spaces to dashes and lowercase for consistent mapping
        const normalizedType = type.toLowerCase().replace(/\s+/g, '-');
        const mappedType = featureTypeMap[normalizedType];
        if (mappedType && popupContent[mappedType]) {
          setPopup({
            type: mappedType,
            position: null
          });
        }
      }
    }
  };

  // Update the feature button click handler
  const handleFeatureClick = (feature, event) => {
    event.preventDefault();
    const featureTypeMap = {
      'Multi-Platform Scraping': 'entityMatching',
      'End-to-End Pipeline': 'pipeline',
      'Multi-Source Integration': 'dataAlignment',
      'Enterprise Scale': 'aiIntegration'
    };
    
    const mappedType = featureTypeMap[feature.title];
    if (mappedType) {
      setPopup({
        type: mappedType,
        position: null
      });
    }
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-conic from-white via-primary-50 to-white opacity-40"></div>
      <div className="absolute -left-64 top-32 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -right-64 bottom-32 w-[600px] h-[600px] bg-gradient-to-tr from-accent-cyan/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Logo size="medium" className="opacity-90" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">About Iceberg Data</h2>
          <p className="text-xl text-dark-700 leading-relaxed max-w-3xl mx-auto">
            We specialize in intelligent web scraping and multi-source data integration, using advanced AI to transform fragmented data into unified, actionable insights.
          </p>
        </div>

        <div className="mb-24 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
                <p className="text-dark-700 mb-4">{feature.description}</p>
                <button
                  onClick={(e) => handleFeatureClick(feature, e)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-accent-purple/5 to-primary-50 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border border-primary-100 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-8 mx-auto w-24 h-24 bg-gradient-to-br from-primary-100 to-transparent rounded-2xl flex items-center justify-center">
              🧠
            </div>
            <h3 className="text-3xl font-display font-bold text-dark-900 mb-6">
              Advanced AI Matching Technology
            </h3>
            <p className="text-xl text-dark-700 leading-relaxed max-w-4xl mx-auto mb-8">
              What sets us apart is our proprietary AI-powered matching system. Unlike traditional data integration solutions, 
              our advanced algorithms intelligently identify, match, and merge related data points across multiple sources, 
              creating a single, unified database that&apos;s always accurate and up-to-date.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={(e) => handlePopupClick('entityMatching', e)}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium hover:bg-primary-100 transition-colors"
              >
                Intelligent Entity Matching→
              </button>
              <button 
                onClick={(e) => handlePopupClick('dataAlignment', e)}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium hover:bg-primary-100 transition-colors"
              >
                Cross-Source Data Alignment→
              </button>
              <button 
                onClick={(e) => handlePopupClick('deduplication', e)}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium hover:bg-primary-100 transition-colors"
              >
                Automated Data Deduplication→
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              <DataIntegrationAnimation />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-dark-900">Our Mission</h3>
            <p className="text-lg text-dark-700 leading-relaxed">
              To empower enterprises with seamless access to unified web data through AI-powered matching and integration, enabling smarter, faster decision-making in an increasingly complex digital landscape.
            </p>
            <div className="pt-4">
              <button 
                onClick={(e) => handlePopupClick('aiIntegration', e)}
                className="inline-block px-4 py-2 bg-dark-900 text-white rounded-xl font-medium hover:bg-dark-800 transition-colors"
              >
                Advanced AI Integration→
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-dark-900">Our Approach</h3>
            <p className="text-lg text-dark-700 leading-relaxed">
              We go beyond simple data collection. Our AI-driven pipeline intelligently matches and aligns data from multiple sources, handling the entire process from collection to integration. This means you get a single, coherent database that&apos;s always up-to-date and perfectly aligned.
            </p>
            <div className="pt-4">
              <button 
                onClick={(e) => handlePopupClick('pipeline', e)}
                className="inline-block px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Full Integration Pipeline→
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-display font-bold text-white mb-6">
              Ready to Transform Your Data Workflow?
            </h3>
            <p className="text-white/90 text-lg mb-8">
              Join industry leaders who trust us with their data integration needs
            </p>
            <button 
              onClick={() => setShowCalendly(true)}
              className="group relative px-10 py-4 rounded-xl text-lg font-bold overflow-hidden bg-white hover:scale-105 transition-all duration-300"
            >
              <span className="bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent">
                Talk to an Expert Now
              </span>
            </button>
            <p className="text-white/80 text-sm mt-4 animate-pulse">
              Limited Slots Available for {new Date().toLocaleString('default', { month: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {popup.type && (
        <InfoPopup
          isOpen={true}
          title={popup.type.startsWith('feature-') 
            ? features[parseInt(popup.type.split('-')[1])].details.title
            : popupContent[popup.type].title}
          description={popup.type.startsWith('feature-')
            ? features[parseInt(popup.type.split('-')[1])].details.description
            : popupContent[popup.type].description}
          items={popup.type.startsWith('feature-')
            ? features[parseInt(popup.type.split('-')[1])].details.items
            : popupContent[popup.type].items}
          theme={popup.type === 'aiIntegration' ? 'dark' : popup.type === 'pipeline' ? 'gradient' : 'light'}
          onClose={() => setPopup({ type: null, position: null })}
        />
      )}
      
      {showCalendly && (
        <CalendlyPopup isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
      )}
    </section>
  );
};

export default About; 