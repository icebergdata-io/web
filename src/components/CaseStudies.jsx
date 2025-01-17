const caseStudies = [
  {
    title: "Car Rental Pricing Automation",
    challenge: "Automating pricing across booking platforms.",
    solution: "Continuous monitoring of aggregator portals for real-time pricing and availability.",
    outcome: "Dynamic pricing adjustments, increased revenue, optimized fleet utilization."
  },
  {
    title: "E-commerce Price Monitoring",
    challenge: "Streamlining competitive analysis across categories.",
    solution: "Monitoring product attributes and prices on various e-commerce sites.",
    outcome: "Strategic pricing, optimized inventory, increased sales margins."
  },
  {
    title: "Enhanced Lead Generation",
    challenge: "Improving lead generation quality.",
    solution: "Identifying relevant websites and social profiles, enriching leads.",
    outcome: "High-quality leads, improved conversion rates, efficient sales pipeline."
  }
]

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">Case Studies</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-6">{study.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">Challenge</h4>
                  <p className="text-dark-700">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">Solution</h4>
                  <p className="text-dark-700">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">Outcome</h4>
                  <p className="text-dark-700">{study.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 