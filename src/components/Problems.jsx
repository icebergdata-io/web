const problems = [
  {
    title: "Fragmented Data Sources",
    description: "Consolidates disparate data sources into one unified database, simplifying analysis."
  },
  {
    title: "Manual Data Collection",
    description: "Automates data acquisition, cutting labor costs and reducing human error."
  },
  {
    title: "Data Inconsistencies",
    description: "Ensures high data quality through rigorous cleaning and normalization."
  },
  {
    title: "Complex Infrastructure",
    description: "Provides a scalable, turnkey solution without costly in-house infrastructure."
  },
  {
    title: "Slow Decision-Making",
    description: "Real-time data integration supports faster insights and quicker responses."
  }
]

const Problems = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-8">Problems We Solve</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl hover:bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
              <h3 className="text-xl font-display font-bold text-dark-900 mb-4">{problem.title}</h3>
              <p className="text-dark-700 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problems 