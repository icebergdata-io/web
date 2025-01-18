import { useRef, useEffect, useState } from 'react';

const LogoCloud = () => {
  const containerRef = useRef(null);
  const [validLogos, setValidLogos] = useState([]);

  // Define which logos are PNG format
  const pngLogos = [1, 3, 4, 5, 6, 7, 10, 11, 12, 15, 19, 20, 22, 23, 25, 26, 27, 29];
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Check which logos actually exist
    const checkLogos = async () => {
      const logoPromises = Array.from({ length: 29 }, async (_, i) => {
        const src = `/customer-logos-new/customer-logo-${String(i + 1).padStart(2, '0')}.${pngLogos.includes(i + 1) ? 'png' : 'jpeg'}`;
        try {
          const response = await fetch(src);
          if (response.ok) {
            return { src };
          }
          return null;
        } catch {
          return null;
        }
      });

      const results = await Promise.all(logoPromises);
      const existingLogos = results.filter(Boolean);
      setValidLogos(shuffleArray(existingLogos));
    };

    checkLogos();
  }, []);

  // Split shuffled logos into two roughly equal groups for mobile
  const firstRow = validLogos.slice(0, Math.ceil(validLogos.length / 2));
  const secondRow = validLogos.slice(Math.ceil(validLogos.length / 2));

  return (
    <div className="relative py-4 md:py-2 bg-gradient-to-b from-white/30 via-white/80 to-white h-[30vh] md:h-[40vh] flex flex-col justify-between">
      <div 
        ref={containerRef}
        className="relative w-full mx-auto px-4 h-full flex flex-col"
      >
        <p className="text-center text-dark-800 text-base font-semibold mb-4 md:mb-4">
          Trusted by innovative companies worldwide
        </p>

        {/* Mobile View: Two separate carousels */}
        <div className="md:hidden flex-1 flex flex-col justify-center">
          {/* First row - scrolling left */}
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll space-x-8 whitespace-nowrap overflow-visible w-full justify-center">
              {firstRow.map((logo, index) => (
                <div 
                  key={`first-${index}`}
                  className="w-16 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
                >
                  <img
                    src={logo.src}
                    alt={`Customer Logo ${index + 1}`}
                    className="w-[100%] h-[100%] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {firstRow.map((logo, index) => (
                <div 
                  key={`first-duplicate-${index}`}
                  className="w-16 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
                >
                  <img
                    src={logo.src}
                    alt={`Customer Logo ${index + 1}`}
                    className="w-[100%] h-[100%] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - scrolling right */}
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll-reverse space-x-8 whitespace-nowrap overflow-visible w-full justify-center">
              {secondRow.map((logo, index) => (
                <div 
                  key={`second-${index}`}
                  className="w-16 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
                >
                  <img
                    src={logo.src}
                    alt={`Customer Logo ${index + firstRow.length + 1}`}
                    className="w-[100%] h-[100%] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {secondRow.map((logo, index) => (
                <div 
                  key={`second-duplicate-${index}`}
                  className="w-16 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
                >
                  <img
                    src={logo.src}
                    alt={`Customer Logo ${index + firstRow.length + 1}`}
                    className="w-[100%] h-[100%] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View: Single long carousel */}
        <div className="hidden md:block relative overflow-hidden py-4 flex-1">
          <div className="flex animate-scroll space-x-12 whitespace-nowrap overflow-visible w-full justify-center">
            {validLogos.map((logo, index) => (
              <div 
                key={`desktop-${index}`}
                className="w-24 h-24 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 1}`}
                  className="w-[100%] h-[100%] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {validLogos.map((logo, index) => (
              <div 
                key={`desktop-duplicate-${index}`}
                className="w-24 h-24 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/95 backdrop-blur shadow-lg rounded-full overflow-hidden"
              >
                <img
                  src={logo.src}
                  alt={`Customer Logo ${index + 1}`}
                  className="w-[100%] h-[100%] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Added text below logos */}
        <p className="text-center text-dark-700 text-lg md:text-xl font-light mt-2 md:mt-4 italic pb-2">
          30+ companies trust us
        </p>
      </div>
    </div>
  );
};

export default LogoCloud; 