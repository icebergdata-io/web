const Navbar = ({ scrolled }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            Iceberg Data
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-dark-800 hover:text-primary-600 transition-colors">About</a>
            <a href="#services" className="text-dark-800 hover:text-primary-600 transition-colors">Services</a>
            <a href="#case-studies" className="text-dark-800 hover:text-primary-600 transition-colors">Case Studies</a>
            <a href="#contact" className="text-dark-800 hover:text-primary-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 