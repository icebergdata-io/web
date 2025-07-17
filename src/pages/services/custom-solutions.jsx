import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import CalendlyPopup from '../../components/CalendlyPopup';
import PageLayout from '../../components/PageLayout';

const benefits = [
  {
    title: 'Tailored Architecture',
    description: 'Custom-built solutions designed specifically for your unique business requirements and challenges.',
    details: [
      'Microservices or monolithic architecture based on your needs',
      'Optimized database design and data modeling',
      'Scalable cloud infrastructure setup',
      'Custom API development and integration',
      'Security-first approach with industry best practices'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Future-proof solutions that grow with your business needs and data requirements.',
    details: [
      'Auto-scaling capabilities for varying workloads',
      'Load balancing and high availability setup',
      'Distributed systems architecture',
      'Performance optimization and monitoring',
      'Cost-effective resource utilization'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Expert Support',
    description: 'Dedicated team of experts providing ongoing support and maintenance for your solution.',
    details: [
      '24/7 monitoring and incident response',
      'Regular maintenance and updates',
      'Performance optimization and tuning',
      'Technical consultation and guidance',
      'Documentation and knowledge transfer'
    ],
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
    details: [
      'In-depth requirements gathering sessions',
      'Technical architecture assessment',
      'Current system analysis and evaluation',
      'Business goals and KPI definition',
      'Project scope and timeline planning'
    ]
  },
  {
    step: 2,
    title: 'Solution Design',
    description: 'Our experts design a custom solution tailored to your requirements and technology stack.',
    details: [
      'Architecture blueprint development',
      'Technology stack selection',
      'Integration strategy planning',
      'Security and compliance considerations',
      'Scalability and performance planning'
    ]
  },
  {
    step: 3,
    title: 'Development',
    description: 'We build your solution using industry best practices and cutting-edge technologies.',
    details: [
      'Agile development methodology',
      'Regular progress updates and demos',
      'Code quality and best practices',
      'Continuous integration and deployment',
      'Comprehensive testing at each stage'
    ]
  },
  {
    step: 4,
    title: 'Testing & Deployment',
    description: 'Rigorous testing and smooth deployment ensure your solution works flawlessly.',
    details: [
      'Automated and manual testing',
      'Performance and load testing',
      'Security vulnerability assessment',
      'Staged deployment process',
      'Production environment setup'
    ]
  },
  {
    step: 5,
    title: 'Support & Optimization',
    description: 'Ongoing support and continuous optimization to keep your solution performing at its best.',
    details: [
      'Proactive monitoring and maintenance',
      'Performance optimization',
      'Regular security updates',
      'Scaling adjustments as needed',
      'Continuous improvement recommendations'
    ]
  },
];

const technologies = [
  {
    category: 'Programming Languages',
    items: ['Python', 'JavaScript/TypeScript', 'Java', 'Go', 'Rust']
  },
  {
    category: 'Cloud Platforms',
    items: ['AWS', 'Google Cloud', 'Azure', 'Digital Ocean', 'Heroku']
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra']
  },
  {
    category: 'Tools & Frameworks',
    items: ['Docker', 'Kubernetes', 'Terraform', 'React', 'Node.js']
  }
];

const faqs = [
  {
    question: "How long does it take to develop a custom solution?",
    answer: "The timeline varies depending on the complexity of your requirements. Typically, smaller projects take 4-8 weeks, while larger enterprise solutions may take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific needs."
  },
  {
    question: "What kind of support do you provide after deployment?",
    answer: "We provide comprehensive post-deployment support including 24/7 monitoring, regular maintenance, performance optimization, and technical consultation. Our team is always available to help with updates, improvements, and any issues that may arise."
  },
  {
    question: "How do you ensure the security of our data?",
    answer: "Security is our top priority. We implement industry-standard security measures including encryption, secure API endpoints, access controls, and regular security audits. All solutions are built following security best practices and compliance requirements."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes, we specialize in seamless integration with existing systems. Whether you're using legacy software, modern cloud services, or a mix of both, we'll design a solution that works harmoniously with your current infrastructure."
  },
  {
    question: "What makes your custom solutions different?",
    answer: "Our solutions stand out through our AI-first approach, scalable architecture, and deep industry expertise. We focus on future-proof designs that can grow with your business, while providing exceptional support and continuous optimization."
  }
];

const CustomSolutionsPage = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [expandedBenefit, setExpandedBenefit] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  // Function to handle smooth scrolling for internal links
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without causing a page reload
      window.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <PageLayout
      title="Custom Solutions - Iceberg Data | Tailored Data Solutions"
      description="Get custom-built data solutions designed specifically for your business needs. From architecture design to ongoing support, we've got you covered."
      breadcrumbItems={[
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: 'Custom Solutions', to: '/services/custom-solutions' }
      ]}
    >
      <div id="custom-solutions" className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
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
            Custom Solutions
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8">
            Tailored data solutions designed specifically for your business needs
          </p>
          <button
            onClick={() => setShowCalendly(true)}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:from-pink-600 hover:to-pink-700"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Key Benefits
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the advantages of our custom-built solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-8 shadow-lg ring-1 ring-slate-200/50 transition-all duration-300 ${
                expandedBenefit === index ? 'lg:col-span-3' : ''
              }`}
              onClick={() => setExpandedBenefit(expandedBenefit === index ? null : index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg ring-1 ring-pink-500/10">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-display font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>
                {expandedBenefit === index && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800">Key Features:</h4>
                    <ul className="space-y-2">
                      {benefit.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="mt-4 text-sm font-medium text-pink-600 hover:text-pink-700 inline-flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedBenefit(expandedBenefit === index ? null : index);
                  }}
                >
                  {expandedBenefit === index ? (
                    <>
                      Show Less
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Learn More
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        
        <div id="process" className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Our Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              How we build your custom solution from start to finish
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div
                key={index}
                className={`relative pl-8 pb-8 last:pb-0 ${
                  expandedStep === index ? 'bg-slate-50/50 rounded-2xl p-6 mb-6' : ''
                }`}
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              >
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white font-medium shadow-lg ring-1 ring-pink-500/10">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  {expandedStep === index && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-semibold text-slate-800">What's Involved:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-pink-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-slate-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    className="mt-4 text-sm font-medium text-pink-600 hover:text-pink-700 inline-flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedStep(expandedStep === index ? null : index);
                    }}
                  >
                    {expandedStep === index ? (
                      <>
                        Show Less
                        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Learn More
                        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
                {index < process.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-px bg-gradient-to-b from-pink-500/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div id="technologies" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Technologies We Use
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust and scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-8 shadow-lg ring-1 ring-slate-200/50"
            >
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
                {tech.category}
              </h3>
              <ul className="space-y-2">
                {tech.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-600 text-sm flex items-center">
                    <svg className="w-4 h-4 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* FAQ Section */}
      <div id="faq" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Common questions about our custom solutions
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-slate-50 to-white rounded-xl p-6 shadow-lg ring-1 ring-slate-200/50"
            >
              <button
                className="w-full flex items-start justify-between text-left"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <h3 className="text-lg font-display font-semibold text-slate-900 pr-8">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`mt-4 text-slate-600 text-sm leading-relaxed transition-all duration-300 ${
                  expandedFaq === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-pink-400/30 to-pink-300/30 mix-blend-multiply"></div>
        
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Ready to Build Your Custom Solution?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create the perfect solution for your business
            </p>
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-slate-900 font-medium transition-all duration-300 hover:shadow-lg hover:bg-slate-50"
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
    </PageLayout>
  );
};

export default CustomSolutionsPage; 