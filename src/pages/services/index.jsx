import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const services = [
  {
    id: 'web-scraping',
    title: 'Web Scraping Solutions',
    description: 'Enterprise-grade web scraping infrastructure with advanced proxy management, CAPTCHA handling, and data validation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 'data-integration',
    title: 'Data Integration',
    description: 'Seamless data integration solutions that connect, transform, and deliver data to your preferred destination.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: 'custom-solutions',
    title: 'Custom Solutions',
    description: 'Tailored data solutions designed to meet your specific business requirements and challenges.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Our Services - Iceberg Data | Web Scraping & Data Integration Solutions"
        description="Explore our comprehensive suite of web scraping, data integration, and custom data solutions designed to help businesses extract valuable insights from the web."
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800 text-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-light-400 mb-8">
              Comprehensive data solutions to power your business decisions
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-dark-100/5 hover:ring-dark-100/10 transition-all duration-300"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-bold text-dark-900">
                  {service.title}
                </h3>
                <p className="text-dark-600">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-primary-600 font-medium">
                  Learn more
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage; 