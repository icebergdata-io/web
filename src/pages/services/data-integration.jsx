import { useState } from 'react';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';

const features = [
  {
    title: 'Seamless Connectors',
    description: 'Pre-built connectors for popular platforms and databases, enabling quick and reliable data integration.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: 'Data Transformation',
    description: 'Powerful ETL capabilities to clean, transform, and structure your data for analysis.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Real-time Sync',
    description: 'Keep your data synchronized across platforms with real-time updates and monitoring.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const integrations = [
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    category: 'Cloud Platforms',
    items: ['AWS', 'Google Cloud', 'Azure', 'Snowflake', 'BigQuery'],
  },
  {
    category: 'Analytics Tools',
    items: ['Tableau', 'Power BI', 'Looker', 'Metabase', 'Grafana'],
  },
];

const DataIntegrationPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <SEO
        title="Data Integration Solutions - Iceberg Data | Seamless Data Connection"
        description="Connect and transform your data with our enterprise data integration solutions. Pre-built connectors, powerful ETL capabilities, and real-time synchronization."
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800 text-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Data Integration Solutions
            </h1>
            <p className="text-lg sm:text-xl text-light-400 mb-8">
              Connect, transform, and sync your data across platforms seamlessly
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-300"
            >
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-dark-600">
            Our data integration platform provides powerful features to streamline your data flow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-dark-100/5"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-bold text-dark-900">
                  {feature.title}
                </h3>
                <p className="text-dark-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-dark-50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
              Supported Integrations
            </h2>
            <p className="text-lg text-dark-600">
              Connect with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-display font-bold text-dark-900 mb-4">
                  {integration.category}
                </h3>
                <ul className="space-y-2">
                  {integration.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-dark-600"
                    >
                      <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Ready to Integrate Your Data?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how we can help streamline your data workflow
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-primary-600 font-medium hover:bg-white/90 transition-colors duration-300"
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
    </>
  );
};

export default DataIntegrationPage; 