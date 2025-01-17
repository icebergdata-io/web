const Contact = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white via-primary-50 to-white"></div>
      <div className="absolute -right-64 top-0 w-[600px] h-[600px] bg-gradient-to-br from-accent-purple/20 to-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">Start Your Data Journey</h2>
            <p className="text-xl text-dark-700 mb-8">
              Ready to transform your data collection and integration? Let&apos;s discuss your needs.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
              <textarea
                placeholder="Tell us about your data needs"
                className="w-full md:col-span-2 px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                rows="4"
              ></textarea>
            </div>
            <button className="group relative w-full mt-6 rounded-xl text-lg font-semibold overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 transition-all group-hover:scale-110 duration-300"></div>
              <span className="relative block py-4 text-white">Schedule Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 