import { useRef } from 'react';

const LogoCloud = () => {
  const containerRef = useRef(null);

  // Define which logos are PNG format
  const pngLogos = [4, 6, 7, 8, 9, 10, 13, 14, 15, 18, 22, 23, 25, 26, 28, 29, 30, 32];
  
  // Only include logos that actually exist (4-32)
  const logos = Array.from({ length: 29 }, (_, i) => ({
    src: `/customer-logos/image-${i + 4}.${pngLogos.includes(i + 4) ? 'png' : 'jpeg'}`
  }));

  // Split logos into two roughly equal groups
  const firstRow = logos.slice(0, 15);
  const secondRow = logos.slice(15);

  return (
    <div className="relative py-8 bg-gradient-to-b from-white/30 via-white/80 to-white">
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4"
      >
        <p className="text-center text-dark-800 text-base font-semibold mb-6">
          Trusted by innovative companies worldwide
        </p>

        {/* First row - scrolling left */}
        <div className="relative overflow-hidden py-3">
          <div className="flex animate-scroll space-x-16 whitespace-nowrap">
            {/* Original set */}
            {firstRow.map((logo, index) => (
              <div 
                key={`first-${index}`}
                className="w-40 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 4}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {firstRow.map((logo, index) => (
              <div 
                key={`first-duplicate-${index}`}
                className="w-40 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 4}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolling right */}
        <div className="relative overflow-hidden py-3">
          <div className="flex animate-scroll-reverse space-x-16 whitespace-nowrap">
            {/* Original set */}
            {secondRow.map((logo, index) => (
              <div 
                key={`second-${index}`}
                className="w-40 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 19}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {secondRow.map((logo, index) => (
              <div 
                key={`second-duplicate-${index}`}
                className="w-40 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 19}`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud; 