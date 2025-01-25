import { useState } from 'react';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';

const benefits = [
  {
    title: 'Tailored Architecture',
    description: 'Custom-built solutions designed specifically for your unique business requirements and challenges.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Future-proof solutions that grow with your business needs and data requirements.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Expert Support',
    description: 'Dedicated team of experts providing ongoing support and maintenance for your solution.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const process = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We work closely with you to understand your specific needs, challenges, and objectives.',
  },
  {
    step: 2,
    title: 'Solution Design',
    description: 'Our experts design a custom solution tailored to your requirements and technology stack.',
  },
  {
    step: 3,
    title: 'Development',
    description: 'We build your solution using industry best practices and cutting-edge technologies.',
  },
  {
    step: 4,
    title: 'Testing & Deployment',
    description: 'Rigorous testing and smooth deployment ensure your solution works flawlessly.',
  },
  {
    step: 5,
    title: 'Support & Optimization',
    description: 'Ongoing support and continuous optimization to keep your solution performing at its best.',
  },
];

const CustomSolutionsPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <SEO
        title="Custom Solutions - Iceberg Data | Tailored Data Solutions"
        description="Get custom-built data solutions designed specifically for your business needs. From architecture design to ongoing support, we've got you covered."
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800 text-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
        <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -right-64 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Custom Solutions
            </h1>
            <p className="text-lg sm:text-xl text-light-400 mb-8">
              Tailored data solutions designed specifically for your business needs
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

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Key Benefits
          </h2>
          <p className="text-lg text-dark-600">
            Why choose our custom solutions for your data needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-dark-100/5"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-bold text-dark-900">
                  {benefit.title}
                </h3>
                <p className="text-dark-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-dark-50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-dark-600">
              How we work together to build your custom solution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white font-bold">
                  {step.step}
                </div>
                <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-primary-200 last:hidden"></div>
                <div className="ml-8">
                  <h3 className="text-xl font-display font-bold text-dark-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-dark-600">
                    {step.description}
                  </p>
                </div>
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
              Ready to Build Your Custom Solution?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how we can create the perfect solution for your business
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-primary-600 font-medium hover:bg-white/90 transition-colors duration-300"
            >
              Schedule a Consultation
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

export default CustomSolutionsPage; 