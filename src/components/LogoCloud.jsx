import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/* 
  List all valid logo filenames that actually exist in /public/customer-logos-new. 
  (If you need dynamic checks, you can add the fetch calls back, but that can cause extra network overhead.)
*/
const LOGO_FILES = [
  'customer-logo-037a6b45-fada-4fa0-812a-ec90e6dc7864.png',
  'customer-logo-08bb7e58-e404-46e1-90b9-110802e11390.png',
  'customer-logo-2abf25ae-1184-4df7-96cf-2affeda578a8.png',
  'customer-logo-384bf503-0b76-44cc-925b-605ddc5cbd97.png',
  'customer-logo-3c413f08-b3e2-4639-8a1e-f9c25e28725e.png',
  'customer-logo-6cc593ed-a88c-4caf-99e6-cd6911e855c4.png',
  'customer-logo-70848ace-fa2e-4cd4-8387-e5270bfcdcca.png',
  'customer-logo-72b796b7-512c-4876-a3f3-05d39a4a7ba0.png',
  'customer-logo-73c81b2d-7e98-4a92-b1a0-42ab0133996c.png',
  'customer-logo-7d30fbc1-3363-4c93-a906-c58347f2b675.png',
  'customer-logo-8090e77a-2e97-45b2-ab5d-a57e6a9af616.png',
  'customer-logo-811d8bf1-a904-41e1-aab0-325fafb7c5fc.png',
  'customer-logo-8dc3e4c8-06ce-4c24-b078-f546d01c16f6.png',
  'customer-logo-8ebfb857-06f1-4fec-9802-f5c292e4a807.png',
  'customer-logo-973e474c-994f-43ad-9a6f-baf7589fb968.png',
  'customer-logo-a05fa42a-e5c4-4f06-bf4d-7f52a7c3e603.png',
  'customer-logo-b6a3108a-cf98-4ed5-a272-34aae3d3bdbf.png',
  'customer-logo-b80b821c-bf89-4271-a21c-71a6368b4b5b.png',
  'customer-logo-ba82b945-a289-4fa4-8bdc-c1cb45cc60e6.png',
  'customer-logo-ce1aae23-dc4b-45a6-bd8c-332382c48720.png',
  'customer-logo-d27eb58f-11d5-4fa8-a517-ab6e7a3aef4f.png',
  'customer-logo-d676f2fe-3974-4316-bfa0-1b76056eae6a.png',
  'customer-logo-db45ebf0-ddfc-420a-8e34-84f0f6967a56.png',
  'customer-logo-df1dc806-c7be-455f-9e52-0826ad3366c1.png',
  'customer-logo-e5dbdcd9-b9b9-47a0-8a69-458280f1df90.png',
  'customer-logo-f750ec7e-8022-4a75-978d-611cd69d5265.png',
  'customer-logo-f849247a-3525-4582-b61f-b59c461b2062.png',
  'customer-logo-fb953010-5de0-427b-a714-a44b4ce0df1b.png'
];

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LogoItem = ({ src, alt }) => (
  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 bg-white/80 backdrop-blur shadow-lg rounded-full overflow-hidden border border-white/20">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
      loading="lazy"
      draggable="false"
    />
  </div>
);

LogoItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

const LogoCloud = () => {
  const containerRef = useRef(null);
  const [validLogos, setValidLogos] = useState([]);
  const [firstRowLogos, setFirstRowLogos] = useState([]);
  const [secondRowLogos, setSecondRowLogos] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // In a real app, you might skip checking existence and assume these logos exist.
    // Or, if you must, you'd fetch each to verify it. We'll skip that for clarity.

    const shuffled = shuffleArray(
      LOGO_FILES.map((filename, index) => ({
        src: `/customer-logos-new/${filename}`,
        id: index + 1
      }))
    );
    setValidLogos(shuffled);

    // Split in half for mobile rows
    const midPoint = Math.ceil(shuffled.length / 2);
    setFirstRowLogos([
      ...shuffled.slice(0, midPoint),
      ...shuffled.slice(0, midPoint)
    ]);
    setSecondRowLogos([
      ...shuffled.slice(midPoint),
      ...shuffled.slice(midPoint)
    ]);
  }, []);

  const handleTouchStart = () => setIsScrolling(true);
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  };

  return (
    <div className="relative py-2 md:py-1 h-full flex flex-col justify-between">
      <div
        ref={containerRef}
        className="relative w-full mx-auto px-4 h-full flex flex-col justify-center"
      >
        <h2 className="text-center text-dark-800 text-sm md:text-base font-semibold mb-2 md:mb-3">
          Trusted by innovative companies worldwide
        </h2>

        {/* === Mobile View === */}
        <div className="md:hidden flex-1 flex flex-col justify-center gap-2">
          {/* First row, forward scroll */}
          <div
            className="relative overflow-x-auto touch-pan-x scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex space-x-6 whitespace-nowrap w-max ${
                !isScrolling ? 'animate-scroll' : ''
              }`}
            >
              {firstRowLogos.map((logo, index) => (
                <LogoItem
                  key={`row1-${logo.id}-${index}`}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                />
              ))}
            </div>
          </div>

          {/* Second row, reverse scroll */}
          <div
            className="relative overflow-x-auto touch-pan-x scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex space-x-6 whitespace-nowrap w-max ${
                !isScrolling ? 'animate-scroll-reverse' : ''
              }`}
            >
              {secondRowLogos.map((logo, index) => (
                <LogoItem
                  key={`row2-${logo.id}-${index}`}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* === Desktop View === */}
        <div className="hidden md:block relative overflow-hidden flex-1">
          <div className="flex animate-scroll space-x-8 whitespace-nowrap w-full">
            {/* First set of logos */}
            {validLogos.map((logo, index) => (
              <LogoItem
                key={`desktop-${logo.id}-${index}`}
                src={logo.src}
                alt={`Logo ${logo.id}`}
              />
            ))}
            {/* Duplicated set for seamless scrolling */}
            {validLogos.map((logo, index) => (
              <LogoItem
                key={`desktop-dup-${logo.id}-${index}`}
                src={logo.src}
                alt={`Logo ${logo.id}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-dark-700 text-sm md:text-base font-light mt-2 italic">
          30+ companies trust us
        </p>
      </div>
    </div>
  );
};

export default LogoCloud;
