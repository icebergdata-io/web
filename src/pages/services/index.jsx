import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/SEO';
import PageLayout from '../../components/PageLayout';

const services = [
  {
    id: 'web-scraping',
    title: 'Web Scraping Solutions',
    description: 'Enterprise-grade web scraping infrastructure powered by AI and premium networks, delivering reliable data at scale.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    link: '/services/web-scraping'
  },
  {
    id: 'data-integration',
    title: 'Data Cleaning & Normalization',
    description: 'Advanced AI algorithms for data cleaning, standardization, and enrichment. Improve data accuracy by 99.9% and reduce preparation time by 80%.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    link: '/services/data-integration'
  },
  {
    id: 'custom-solutions',
    title: 'Custom Solutions',
    description: 'Tailored data solutions designed for your unique business needs, from architecture to implementation and ongoing support.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: '/services/custom-solutions'
  },
];

const ServicesPage = () => {
  const location = useLocation();

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <PageLayout
      title="Our Services - Iceberg Data | Web Scraping & Data Integration Solutions"
      description="Explore our comprehensive data services including web scraping, data integration, and custom solutions for your business needs."
      breadcrumbItems={[
        { label: 'Home', to: '/' },
        { label: 'Services' }
      ]}
    >
      <SEO
        title="Our Services - Iceberg Data | Web Scraping & Data Integration Solutions"
        description="Explore our comprehensive data services including web scraping, data integration, and custom solutions for your business needs."
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 mix-blend-multiply"></div>
        <div className="absolute -left-64 top-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-96 h-96 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8">
              Comprehensive data solutions to power your business decisions
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to={services[0].link}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-slate-200/50 hover:border-slate-300/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-1 ring-blue-500/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Web Scraping Solutions</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">Enterprise-grade web scraping infrastructure powered by AI and premium networks, delivering reliable data at scale.</p>
              <span className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                Learn more
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          <Link 
            to={services[1].link}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-slate-200/50 hover:border-slate-300/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg ring-1 ring-purple-500/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Data Cleaning & Normalization</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">Advanced AI algorithms for data cleaning, standardization, and enrichment. Improve data accuracy by 99.9% and reduce preparation time by 80%.</p>
              <span className="inline-flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
                Learn more
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          <Link 
            to={services[2].link}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-slate-200/50 hover:border-slate-300/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg ring-1 ring-pink-500/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-3">Custom Solutions</h2>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">Tailored data solutions designed for your unique business needs, from architecture to implementation and ongoing support.</p>
              <span className="inline-flex items-center text-pink-600 font-medium text-sm group-hover:text-pink-700">
                Learn more
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage; 