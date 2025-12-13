import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Check } from 'lucide-react';

const products = [
  {
    master: {
      title: "Apple iPhone 14 Pro",
      subtitle: "256GB - Black",
      confidence: "99.9%"
    },
    sources: [
      {
        id: 'shopify',
        name: 'Shopify',
        color: '#34D399',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.95 9.05c-.3-.4-1.65-2.05-3.3-2.05-1.55 0-2.8.95-3.5 1.25-.8.35-1.4.3-1.85.15-.4-.15-.4-.15-1.65-1.5-1.15-1.25-2.9-1.95-4.5-1.95-1.35 0-2.85.5-3.75.95-.5.25-.9.5-1.1.6L2 7.15l.65 1.55c.1.25.35.85.6 1.45.65 1.55 1.5 3.55 1.5 6.35 0 2.25 1.35 4.95 3.2 6.55.75.65 1.8 1.55 3.55 1.55 1.25 0 1.95-.45 2.5-1.25.4-.55.95-1.45 2.05-1.45 1.05 0 1.6.8 2 1.35.55.75 1.3 1.35 2.65 1.35 1.65 0 2.75-.95 3.55-1.75 1.6-1.6 2.8-4.3 2.8-6.4 0-2.45-.6-4-.95-4.9l-.15-.45zm-11.2 1.8c.6-.25 1.35-.55 2.3-.55 1.35 0 2.45.75 3.1 1.15.55.35 1.15.7 1.85.7.9 0 1.55-.4 1.95-.65 1.15 2.25 1.15 4.6 1.15 5.5 0 1.45-.8 3.35-1.9 4.45-.3.3-.85.75-1.7.75-.9 0-1.15-.55-1.7-1.3-.65-.95-1.7-2.05-3.55-2.05-1.95 0-3.05 1.2-3.65 2.1-.55.8-.8 1.25-1.65 1.25-.75 0-1.3-.4-1.7-.75-1.15-1-1.95-2.85-1.95-4.45 0-2.5 1.45-5.95 4.5-5.95 1.15 0 2.35.5 3 1 .4.3.7.55 1 .8z m-1.2-8.3c.75 0 1.9.45 2.5 1.2.55.75.8 1.7.8 2.65 0 1.1-.9 2.15-2.15 2.15-.85 0-1.9-.45-2.5-1.25-.55-.75-.8-1.7-.8-2.6 0-1.1.9-2.15 2.15-2.15z" />
          </svg>
        ),
        data: {
          title: "Apple iPhone 14 Pro",
          subtitle: "256GB - Black - Unlocked",
          price: "$999.00"
        }
      },
      {
        id: 'ebay',
        name: 'eBay',
        color: '#3B82F6',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.22 8.78c-.78 0-1.4.24-1.85.72-.45.48-.68 1.12-.68 1.92s.21 1.44.64 1.94c.43.49 1.05.74 1.87.74.58 0 1.06-.13 1.45-.39V10a3.6 3.6 0 00-1.43-1.22zM15.4 8.78c-.85 0-1.51.27-1.98.81-.47.54-.7 1.26-.7 2.17v.08c0 .87.23 1.57.69 2.11.46.54 1.11.8 1.93.8.78 0 1.42-.25 1.92-.76.5-.51.75-1.22.75-2.13v-.08c0-.91-.25-1.62-.75-2.13-.5-.51-1.14-.77-1.86-.77zm5.55 0c-.8 0-1.45.26-1.93.77-.48.51-.72 1.21-.72 2.1v2.54h-1.6v-2.1c0-.58-.12-1-.37-1.28-.24-.27-.6-.41-1.07-.41-.53 0-1.02.21-1.47.64v3.15h-1.6v-7.6h1.6v2.26c.49-.55 1.07-.82 1.74-.82.8 0 1.44.25 1.92.76.48.51.72 1.22.72 2.13v2.67h1.6v-2.8c0-.85-.22-1.5-.66-1.96-.44-.45-1.06-.68-1.86-.68v.03zM7.4 8.78h1.6v5.3l.02.6c.2.27.53.4.98.4.92 0 1.38-.64 1.38-1.92v-4.38h1.6v4.22c0 .94-.21 1.63-.64 2.08-.42.45-1.03.68-1.83.68-.78 0-1.4-.23-1.85-.68-.45-.45-.68-1.14-.68-2.08V8.78z" />
          </svg>
        ),
        data: {
          title: "iPhone 14 Pro - 256GB",
          subtitle: "Black - Free Shipping",
          price: "$949.00"
        }
      },
      {
        id: 'amazon',
        name: 'Amazon',
        color: '#F59E0B',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.42 12.33c.42.36.87.65 1.35.84.44.17.86.27 1.23.28.37 0 .68-.07.9-.19.16-.1.25-.21.25-.33 0-.12-.08-.24-.26-.37-.58-.45-1.28-.73-2.04-.82-.57-.06-1.06-.02-1.43.14-.36.16-.36.29 0 .45zm-4.7-2.14c0-.98.37-1.82 1.09-2.52.73-.7 1.6-1.05 2.62-1.05.61 0 1.17.13 1.66.38.5.25.75.52.75.8 0 .24-.16.36-.45.36-.14 0-.3-.06-.47-.18-.36-.25-.8-.38-1.28-.38-.68 0-1.24.23-1.68.7-.44.46-.66 1.05-.66 1.76 0 .89.26 1.6.77 2.11.51.52 1.1.77 1.77.77.66 0 1.29-.16 1.88-.47v-2.3c-.31.06-.65.1-1 .1-.56 0-1.04-.13-1.43-.39-.39-.26-.58-.6-.58-1 0-.34.13-.67.4-1 .28-.33.72-.5 1.32-.5.53 0 1.04.14 1.5.42.47.28.7.62.7 1.02v4.86c0 .41-.05.74-.15 1-.1.25-.3.45-.62.58-.31.13-.7.2-1.15.2-1.01 0-1.87-.33-2.58-1-.7-.67-1.06-1.59-1.06-2.77zm8.8 3.66c-.63 1.34-1.66 2.4-3.04 3.12-1.43.75-2.98.98-4.57.65-1.58-.33-2.94-1.1-4.01-2.23-.22-.24-.13-.44.18-.41 1 .1 1.94.04 2.82-.16 1.28-.3 2.5-.78 3.63-1.42 1.13-.64 2.11-1.38 2.92-2.18.33-.31.58-.34.75-.11.23.32.77 1.23 1.31 2.74h.01zm-1.84-2.11c-.51.46-1.12.79-1.8.98l.26 1.55c.95-.25 1.8-.71 2.5-1.34.15-.14.22-.26.22-.36 0-.15-.08-.28-.27-.39-.2-.11-.5-.26-.91-.44z" />
          </svg>
        ),
        data: {
          title: "iPhone 14 Pro (256GB, Black)",
          subtitle: "In Stock - Prime Delivery",
          price: "$970.00"
        }
      }
    ]
  },
  {
    master: {
      title: "Samsung Galaxy S24 Ultra",
      subtitle: "512GB - Titanium Grey",
      confidence: "99.8%"
    },
    sources: [
      {
        id: 'shopify',
        name: 'Shopify',
        color: '#34D399',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.95 9.05c-.3-.4-1.65-2.05-3.3-2.05-1.55 0-2.8.95-3.5 1.25-.8.35-1.4.3-1.85.15-.4-.15-.4-.15-1.65-1.5-1.15-1.25-2.9-1.95-4.5-1.95-1.35 0-2.85.5-3.75.95-.5.25-.9.5-1.1.6L2 7.15l.65 1.55c.1.25.35.85.6 1.45.65 1.55 1.5 3.55 1.5 6.35 0 2.25 1.35 4.95 3.2 6.55.75.65 1.8 1.55 3.55 1.55 1.25 0 1.95-.45 2.5-1.25.4-.55.95-1.45 2.05-1.45 1.05 0 1.6.8 2 1.35.55.75 1.3 1.35 2.65 1.35 1.65 0 2.75-.95 3.55-1.75 1.6-1.6 2.8-4.3 2.8-6.4 0-2.45-.6-4-.95-4.9l-.15-.45zm-11.2 1.8c.6-.25 1.35-.55 2.3-.55 1.35 0 2.45.75 3.1 1.15.55.35 1.15.7 1.85.7.9 0 1.55-.4 1.95-.65 1.15 2.25 1.15 4.6 1.15 5.5 0 1.45-.8 3.35-1.9 4.45-.3.3-.85.75-1.7.75-.9 0-1.15-.55-1.7-1.3-.65-.95-1.7-2.05-3.55-2.05-1.95 0-3.05 1.2-3.65 2.1-.55.8-.8 1.25-1.65 1.25-.75 0-1.3-.4-1.7-.75-1.15-1-1.95-2.85-1.95-4.45 0-2.5 1.45-5.95 4.5-5.95 1.15 0 2.35.5 3 1 .4.3.7.55 1 .8z m-1.2-8.3c.75 0 1.9.45 2.5 1.2.55.75.8 1.7.8 2.65 0 1.1-.9 2.15-2.15 2.15-.85 0-1.9-.45-2.5-1.25-.55-.75-.8-1.7-.8-2.6 0-1.1.9-2.15 2.15-2.15z" />
          </svg>
        ),
        data: {
          title: "Galaxy S24 Ultra",
          subtitle: "512GB - Titanium Grey",
          price: "$1,299.99"
        }
      },
      {
        id: 'ebay',
        name: 'eBay',
        color: '#3B82F6',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.22 8.78c-.78 0-1.4.24-1.85.72-.45.48-.68 1.12-.68 1.92s.21 1.44.64 1.94c.43.49 1.05.74 1.87.74.58 0 1.06-.13 1.45-.39V10a3.6 3.6 0 00-1.43-1.22zM15.4 8.78c-.85 0-1.51.27-1.98.81-.47.54-.7 1.26-.7 2.17v.08c0 .87.23 1.57.69 2.11.46.54 1.11.8 1.93.8.78 0 1.42-.25 1.92-.76.5-.51.75-1.22.75-2.13v-.08c0-.91-.25-1.62-.75-2.13-.5-.51-1.14-.77-1.86-.77zm5.55 0c-.8 0-1.45.26-1.93.77-.48.51-.72 1.21-.72 2.1v2.54h-1.6v-2.1c0-.58-.12-1-.37-1.28-.24-.27-.6-.41-1.07-.41-.53 0-1.02.21-1.47.64v3.15h-1.6v-7.6h1.6v2.26c.49-.55 1.07-.82 1.74-.82.8 0 1.44.25 1.92.76.48.51.72 1.22.72 2.13v2.67h1.6v-2.8c0-.85-.22-1.5-.66-1.96-.44-.45-1.06-.68-1.86-.68v.03zM7.4 8.78h1.6v5.3l.02.6c.2.27.53.4.98.4.92 0 1.38-.64 1.38-1.92v-4.38h1.6v4.22c0 .94-.21 1.63-.64 2.08-.42.45-1.03.68-1.83.68-.78 0-1.4-.23-1.85-.68-.45-.45-.68-1.14-.68-2.08V8.78z" />
          </svg>
        ),
        data: {
          title: "Samsung S24 Ultra 512GB",
          subtitle: "Grey - Free Shipping",
          price: "$1,249.00"
        }
      },
      {
        id: 'amazon',
        name: 'Amazon',
        color: '#F59E0B',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        icon: (
          <svg className="w-8 h-8 mb-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.42 12.33c.42.36.87.65 1.35.84.44.17.86.27 1.23.28.37 0 .68-.07.9-.19.16-.1.25-.21.25-.33 0-.12-.08-.24-.26-.37-.58-.45-1.28-.73-2.04-.82-.57-.06-1.06-.02-1.43.14-.36.16-.36.29 0 .45zm-4.7-2.14c0-.98.37-1.82 1.09-2.52.73-.7 1.6-1.05 2.62-1.05.61 0 1.17.13 1.66.38.5.25.75.52.75.8 0 .24-.16.36-.45.36-.14 0-.3-.06-.47-.18-.36-.25-.8-.38-1.28-.38-.68 0-1.24.23-1.68.7-.44.46-.66 1.05-.66 1.76 0 .89.26 1.6.77 2.11.51.52 1.1.77 1.77.77.66 0 1.29-.16 1.88-.47v-2.3c-.31.06-.65.1-1 .1-.56 0-1.04-.13-1.43-.39-.39-.26-.58-.6-.58-1 0-.34.13-.67.4-1 .28-.33.72-.5 1.32-.5.53 0 1.04.14 1.5.42.47.28.7.62.7 1.02v4.86c0 .41-.05.74-.15 1-.1.25-.3.45-.62.58-.31.13-.7.2-1.15.2-1.01 0-1.87-.33-2.58-1-.7-.67-1.06-1.59-1.06-2.77zm8.8 3.66c-.63 1.34-1.66 2.4-3.04 3.12-1.43.75-2.98.98-4.57.65-1.58-.33-2.94-1.1-4.01-2.23-.22-.24-.13-.44.18-.41 1 .1 1.94.04 2.82-.16 1.28-.3 2.5-.78 3.63-1.42 1.13-.64 2.11-1.38 2.92-2.18.33-.31.58-.34.75-.11.23.32.77 1.23 1.31 2.74h.01zm-1.84-2.11c-.51.46-1.12.79-1.8.98l.26 1.55c.95-.25 1.8-.71 2.5-1.34.15-.14.22-.26.22-.36 0-.15-.08-.28-.27-.39-.2-.11-.5-.26-.91-.44z" />
          </svg>
        ),
        data: {
          title: "S24 Ultra (512GB, Grey)",
          subtitle: "In Stock - Prime Delivery",
          price: "$1,275.00"
        }
      }
    ]
  }
];

const Particle = ({ sourceId, color, onComplete }) => {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full z-20"
      style={{ backgroundColor: color }}
      initial={{
        top: 24, // Center of source card (approx)
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        // We'll use CSS layout relative to the container
        // Source cards are distributed top-left, top-center, top-right
        // Hub is bottom-center
        // This is a simplified animation path
        y: [0, 100],
        opacity: [0, 1, 1, 0],
        scale: [1, 1.2, 0.5]
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.9, 1]
      }}
      onAnimationComplete={onComplete}
    />
  );
};

const DataIntegrationAnimation = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [activeSource, setActiveSource] = useState(null);
  const [particles, setParticles] = useState([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchComplete, setMatchComplete] = useState(false);
  const [completedMatches, setCompletedMatches] = useState([]);

  // Use state derivative for UI rendering which is stable
  const currentProduct = products[currentProductIndex];

  // Animation cycle
  useEffect(() => {
    let isMounted = true;

    const sequence = async () => {
      let index = 0;

      while (isMounted) {
        // Sync Visual State for current product cycle
        setCurrentProductIndex(index);
        const currentProd = products[index];

        // 1. Reset for new cycle
        setMatchComplete(false);
        setIsMatching(false);
        setActiveSource(null);

        // 2. Animate each source sending data
        for (let i = 0; i < currentProd.sources.length; i++) {
          if (!isMounted) return;
          setActiveSource(i);
          // Trigger particles
          const particleCount = 3;
          for (let p = 0; p < particleCount; p++) {
            await new Promise(r => setTimeout(r, 200));
            if (!isMounted) return;
            setParticles(prev => [...prev, { id: Math.random(), sourceIndex: i }]);
          }
          await new Promise(r => setTimeout(r, 400));
        }

        // 3. Central Processing
        if (!isMounted) return;
        setActiveSource(null);
        setIsMatching(true);
        await new Promise(r => setTimeout(r, 1500));

        // 4. Match Found & Accumulate
        if (!isMounted) return;
        setIsMatching(false);
        setMatchComplete(true);

        // Add to list, ensuring a unique key based on both product index and time
        const matchId = `${index}-${Date.now()}`;
        setCompletedMatches(prev => [
          { ...currentProd, id: matchId },
          ...prev
        ]);

        // Wait to show success
        await new Promise(r => setTimeout(r, 2000));

        // 5. Logic for Next Cycle
        if (!isMounted) return;

        if (index === products.length - 1) {
          // After showing the second product, clear the accumulated list
          await new Promise(r => setTimeout(r, 2000));
          if (isMounted) {
            setCompletedMatches([]);
          }
          // Loop back to first product
          index = 0;
        } else {
          // Move to next product
          index++;
        }
        // Reset matchComplete for next cycle
        setMatchComplete(false);

        // Small pause before starting sources again
        await new Promise(r => setTimeout(r, 500));
      }
    };

    sequence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 rounded-3xl bg-slate-50/50 backdrop-blur-sm border border-slate-200">

      {/* Top Row: Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 relative">
        {currentProduct.sources.map((source, index) => (
          <motion.div
            layout
            key={`${source.id}-${currentProductIndex}`}
            className={`relative p-4 md:p-6 rounded-2xl bg-white border-2 shadow-sm transition-all duration-500 overflow-hidden ${activeSource === index ? `${source.border} shadow-lg scale-105` : 'border-transparent opacity-80'
              }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: activeSource === index ? 1 : 0.7,
              y: activeSource === index ? -5 : 0
            }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Background Tint */}
            <div className={`absolute inset-0 opacity-20 ${source.bg}`} />

            <div className="relative z-10 flex flex-col items-center text-center">
              {source.icon}
              <h4 className="font-bold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">{source.name}</h4>
              <div className="text-xs text-slate-500 space-y-0.5 md:space-y-1">
                <p className="font-medium text-slate-900 truncate max-w-full px-1">{source.data.title}</p>
                <p className="truncate max-w-full px-1">{source.data.subtitle}</p>
                <p className={`font-bold ${source.text}`}>{source.data.price}</p>
              </div>
            </div>

            {/* Particle Origin Point */}
            <div className="absolute bottom-0 left-1/2 w-1 h-1" id={`source-origin-${index}`} />
          </motion.div>
        ))}
      </div>

      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
        {particles.map((p) => {
          const startX = p.sourceIndex === 0 ? '20%' : p.sourceIndex === 1 ? '50%' : '80%';
          return (
            <motion.div
              key={p.id}
              className="absolute w-3 h-3 rounded-full shadow-sm z-20"
              style={{
                backgroundColor: currentProduct.sources[p.sourceIndex].color,
                left: startX,
                top: '120px'
              }}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [1, 1.5, 0.5],
                y: 120, // Distance to hub
                x: p.sourceIndex === 0 ? 100 : p.sourceIndex === 2 ? -100 : 0
              }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              onAnimationComplete={() => setParticles(prev => prev.filter(particle => particle.id !== p.id))}
            />
          );
        })}
      </div>

      {/* Middle: Matching Hub */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <div className="relative mb-8">
          {/* Connection Lines */}
          <svg className="absolute -top-16 left-1/2 -translate-x-1/2 w-full h-24 pointer-events-none opacity-20 hidden md:block" overflow="visible">
            <path d="M-150,0 Q-150,50 0,80" fill="none" stroke={currentProduct.sources[0].color} strokeWidth="2" />
            <path d="M0,0 V80" fill="none" stroke={currentProduct.sources[1].color} strokeWidth="2" />
            <path d="M150,0 Q150,50 0,80" fill="none" stroke={currentProduct.sources[2].color} strokeWidth="2" />
          </svg>

          <motion.div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-xl border-4 transition-colors duration-500 relative z-10 ${isMatching ? 'border-primary-500' : matchComplete ? 'border-green-500' : 'border-slate-100'
              }`}
            animate={{
              scale: isMatching ? [1, 1.1, 1] : 1,
              boxShadow: isMatching
                ? "0 0 25px rgba(59, 130, 246, 0.5)"
                : matchComplete
                  ? "0 0 25px rgba(34, 197, 94, 0.4)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
          >
            <AnimatePresence mode="wait">
              {matchComplete ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check className="w-8 h-8 md:w-10 md:h-10 text-green-500" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="db"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Database className={`w-6 h-6 md:w-8 md:h-8 ${isMatching ? 'text-primary-500' : 'text-slate-400'}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Animated Processing Status */}
        <div className="h-6 mb-6">
          <AnimatePresence mode="wait">
            {isMatching && (
              <motion.span
                key="processing"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-primary-600 text-sm font-medium animate-pulse"
              >
                Aligning Data Structures...
              </motion.span>
            )}
            {matchComplete && (
              <motion.span
                key="complete"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-green-600 text-sm font-bold flex items-center gap-1"
              >
                Match Confirmed
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Accumulated Output Cards */}
        <div className="w-full max-w-lg space-y-4">
          <AnimatePresence mode="popLayout">
            {completedMatches.map((match) => (
              <motion.div
                key={match.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full bg-white rounded-xl shadow-lg border border-slate-100 p-4 overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="truncate">
                        <h5 className="font-bold text-slate-900 truncate">{match.master.title}</h5>
                        <p className="text-sm text-slate-500 truncate">{match.master.subtitle}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                        Trusted Master
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2 text-xs text-slate-400">
                      <span>3 Sources Merged</span>
                      <span>•</span>
                      <span>{match.master.confidence} Confidence</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {completedMatches.length === 0 && !isMatching && !matchComplete && (
            <div className="h-24 flex items-center justify-center text-slate-400 text-sm italic">
              Initializing Stream...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataIntegrationAnimation;
