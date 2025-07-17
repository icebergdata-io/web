import React from 'react';
import Logo from './Logo';

const services = [
  {
    title: "Automated Data Collection",
    description: "Advanced scraping tools continuously monitor and extract data from diverse online sources, ensuring up-to-date and comprehensive datasets.",
    icon: "🤖"
  },
  {
    title: "Data Cleaning & Normalization",
    description: "Our system processes raw data to remove duplicates, standardize formats, and fill missing values, delivering clean, ready-to-use information.",
    icon: "✨"
  },
  {
    title: "Seamless Integration & Delivery",
    description: "Refined data is merged into a unified database and provided in flexible formats (CSV, JSON, Excel, or via API), enabling integration with your existing systems.",
    icon: "🔄"
  }
]

const Services = () => {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-dark-900">
      <div className="absolute inset-0 bg-mesh-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-purple/10 to-accent-cyan/10"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Logo size="medium" className="opacity-90" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">How Our Service is Provided</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-sm p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="text-4xl mb-6 bg-gradient-to-br from-white/10 to-transparent w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 