const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-conic from-white via-primary-50 to-white opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">About Iceberg Data</h2>
          <p className="text-xl text-dark-700 leading-relaxed">
            We specialize in intelligent web scraping and multi-source data integration. We collect, clean, and consolidate information from online sources into a cohesive dataset, enabling faster, data-driven decisions without the complexity and cost of in-house solutions.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About 