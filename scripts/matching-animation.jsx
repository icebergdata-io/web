import React, { useState, useEffect, useRef } from 'react';
import { Server, Globe, Database, Check } from 'lucide-react';
import './matching-animation.css';

// Add mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Define multiple products, each with their own data sources (stores)
const products = [
  {
    productName: 'iPhone 14 Pro 256GB Black',
    masterSKU: 'iPh-14-Pr-256-Bl',
    dataSources: [
      {
        id: 1,
        storeName: 'Shopify',
        description: 'Apple iPhone 14 Pro with 256GB storage in Black',
        price: '$999',
        additionalData: 'Free shipping',
        icon: 'server',
        color: '#69db7c',
        bgColor: '#ebfbee'
      },
      {
        id: 2,
        storeName: 'eBay',
        description: 'iPhone 14 Pro - 256GB - Black',
        price: '$949',
        additionalData: '10% off',
        icon: 'globe',
        color: '#4dabf7',
        bgColor: '#e7f5ff'
      },
      {
        id: 3,
        storeName: 'Amazon',
        description: 'iPhone 14 Pro (256GB, Black)',
        price: '$970',
        additionalData: '2-year warranty',
        icon: 'globe',
        color: '#ffa94d',
        bgColor: '#fff4e6'
      }
    ]
  },
  {
    productName: 'Samsung Galaxy S22 128GB White',
    masterSKU: 'Sam-Gal-S22-128-Wh',
    dataSources: [
      {
        id: 4,
        storeName: 'Best Buy',
        description: 'Samsung Galaxy S22 with 128GB storage in White',
        price: '$799',
        additionalData: 'Bundle offer',
        icon: 'server',
        color: '#34D399',
        bgColor: '#ECFDF5'
      },
      {
        id: 5,
        storeName: 'Target',
        description: 'Samsung Galaxy S22 - 128GB - White',
        price: '$749',
        additionalData: 'Member discount',
        icon: 'globe',
        color: '#FBBF24',
        bgColor: '#FFFBEB'
      },
      {
        id: 6,
        storeName: 'Walmart',
        description: 'Samsung Galaxy S22 (128GB, White)',
        price: '$780',
        additionalData: 'Price match guarantee',
        icon: 'globe',
        color: '#F87171',
        bgColor: '#FEF2F2'
      }
    ]
  },
  // Add more products as needed to demonstrate different matching scenarios
];

const iconMap = {
  globe: Globe,
  server: Server,
  database: Database
};

const DataIntegrationAnimation = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [animatePackets, setAnimatePackets] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [activityLabel, setActivityLabel] = useState('');
  const [filledRows, setFilledRows] = useState([]);
  const [mobileFilledRows, setMobileFilledRows] = useState([]);
  const timers = useRef([]);
  const isMobile = useIsMobile();

  // Combine all data sources into a single array for display
  const allDataSources = [...products[0].dataSources, ...products[1].dataSources];

  // Desktop animation effect
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const triggerAnimationCycle = () => {
      // Reset states at the start of the cycle
      setAnimatePackets(false);
      setShowCheck(false);
      setActivityLabel('');
      setFilledRows([]);
      setCurrentProductIndex(0);

      // First Round - First SKU
      const processFirstSKU = () => {
        // Start collecting data
        timers.current.push(setTimeout(() => {
          setActivityLabel('Collecting data...');
          setAnimatePackets(true);
        }, 0));

        // After 1.5 seconds, show the checkmark
        timers.current.push(setTimeout(() => {
          setAnimatePackets(false);
          setShowCheck(true);
        }, 1500));

        // After 2 seconds, start processing
        timers.current.push(setTimeout(() => {
          setShowCheck(false);
          setActivityLabel('Processing data...');
        }, 2000));

        // After 2.5 seconds, start filling first SKU rows
        timers.current.push(setTimeout(() => {
          // Fill first 3 rows (indexes 0-2)
          products[0].dataSources.forEach((_, index) => {
            timers.current.push(setTimeout(() => {
              setFilledRows(prev => [...prev, index]);
            }, 250 * index)); // Faster row filling
          });
        }, 2500));
      };

      // Second Round - Second SKU
      const processSecondSKU = () => {
        // Start second round at 4 seconds
        timers.current.push(setTimeout(() => {
          setCurrentProductIndex(1);
          setActivityLabel('Collecting data...');
          setAnimatePackets(true);
          setShowCheck(false);
        }, 4000));

        // Show checkmark for second SKU
        timers.current.push(setTimeout(() => {
          setAnimatePackets(false);
          setShowCheck(true);
        }, 5500));

        // Start processing second SKU
        timers.current.push(setTimeout(() => {
          setShowCheck(false);
          setActivityLabel('Processing data...');
        }, 6000));

        // Fill remaining rows (indexes 3-5)
        timers.current.push(setTimeout(() => {
          products[1].dataSources.forEach((_, index) => {
            const rowIndex = index + 3; // Start from index 3
            timers.current.push(setTimeout(() => {
              setFilledRows(prev => [...prev, rowIndex]);
            }, 250 * index)); // Faster row filling
          });
        }, 6500));

        // Complete cycle after 8 seconds
        timers.current.push(setTimeout(() => {
          setFilledRows([]);
          setCurrentProductIndex(0);
          setActivityLabel('');
        }, 8000));
      };

      // Start both rounds
      processFirstSKU();
      processSecondSKU();
    };

    // Start the first animation cycle
    triggerAnimationCycle();

    // Repeat the animation cycle every 8 seconds
    const intervalId = setInterval(triggerAnimationCycle, 8000);
    timers.current.push(intervalId);

    // Cleanup on unmount
    return () => {
      timers.current.forEach(timer => clearTimeout(timer));
      clearInterval(intervalId);
    };
  }, [isMobile]);

  // Mobile animation effect
  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const mobileAnimationCycle = () => {
      // Clear rows
      setMobileFilledRows([]);
      
      // Animate rows one by one
      allDataSources.forEach((_, index) => {
        setTimeout(() => {
          setMobileFilledRows(prev => [...prev, index]);
        }, index * 250);
      });
    };

    // Start first cycle
    mobileAnimationCycle();

    // Repeat every 8 seconds
    const intervalId = setInterval(mobileAnimationCycle, 8000);

    return () => clearInterval(intervalId);
  }, [isMobile]);

  // Mobile-specific render
  if (isMobile) {
    return (
      <div className="data-integration-container">
        <div className="data-table-container overflow-x-auto">
          <div className="mb-4 text-center">
            <div className="hub-icon-wrapper inline-flex">
              <Database className="hub-icon" aria-label="Central Matching Hub" />
            </div>
            <h3 className="text-lg font-semibold mt-2">Central Matching Hub</h3>
          </div>
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Master SKU</th>
                <th>Product Description</th>
                <th>Store Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allDataSources.map((item, index) => {
                const currentSKU = index < 3 ? products[0] : products[1];
                return (
                  <tr 
                    key={`${currentSKU.masterSKU}-${item.id}`}
                    className={`transition-all duration-300 ${
                      mobileFilledRows.includes(index) 
                        ? 'opacity-100' 
                        : 'opacity-40 bg-slate-50'
                    }`}
                  >
                    <td>{mobileFilledRows.includes(index) ? index + 1 : ''}</td>
                    <td className={`master-sku ${mobileFilledRows.includes(index) ? 'highlighted' : ''}`}>
                      {mobileFilledRows.includes(index) ? currentSKU.masterSKU : ''}
                    </td>
                    <td>{mobileFilledRows.includes(index) ? item.description : ''}</td>
                    <td>{mobileFilledRows.includes(index) ? item.storeName : ''}</td>
                    <td>{mobileFilledRows.includes(index) ? item.price : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Desktop render with full animation
  return (
    <div className="data-integration-container">
      {/* Data Sources Row */}
      <div className="data-sources-row">
        {products[currentProductIndex].dataSources.map(source => {
          const IconComponent = iconMap[source.icon] || Globe;
          return (
            <div key={source.id} className="data-source">
              <div 
                className="source-icon-container"
                style={{
                  backgroundColor: source.bgColor,
                  borderLeft: `4px solid ${source.color}`
                }}
                aria-label={`${source.storeName} data source`}
                role="button"
                tabIndex={0}
              >
                <IconComponent className="source-icon" style={{ color: source.color }} aria-hidden="true" />
                <div className="product-label">
                  {source.description}
                </div>
              </div>
              <div className="source-name">{source.storeName}</div>

              {/* Animated Data Packet */}
              {animatePackets && (
                <div className="packet-animation-container">
                  <div className="packet-animation">
                    <div 
                      className="data-packet" 
                      style={{
                        animation: `moveToHub${source.id} 1.5s ease-in-out forwards`,
                        backgroundColor: source.color,
                        boxShadow: `0 0 12px ${source.color}80`
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Central Matching Hub */}
      <div className="central-hub">
        <div className="hub-icon-wrapper">
          <Database className="hub-icon" aria-label="Central Matching Hub" />
          {showCheck && (
            <div className="success-overlay" aria-label="Matching Successful">
              <Check className="success-icon" />
            </div>
          )}
        </div>
        <div className="hub-description">Matching Hub</div>

        {/* Activity Label */}
        {activityLabel && (
          <div className="processing-text">{activityLabel}</div>
        )}

        {/* Always visible table with all 6 rows */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Master SKU</th>
                <th>Store Name</th>
                <th>Product Description</th>
                <th>Price</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            <tbody>
              {allDataSources.map((item, index) => {
                const currentSKU = index < 3 ? products[0] : products[1];
                return (
                  <tr 
                    key={`${currentSKU.masterSKU}-${item.id}`}
                    className={`transition-all duration-300 ${
                      filledRows.includes(index) 
                        ? 'opacity-100' 
                        : 'opacity-40 bg-slate-50'
                    }`}
                  >
                    <td>{filledRows.includes(index) ? index + 1 : ''}</td>
                    <td className={`master-sku ${filledRows.includes(index) ? 'highlighted' : ''}`}>
                      {filledRows.includes(index) ? currentSKU.masterSKU : ''}
                    </td>
                    <td>{filledRows.includes(index) ? item.storeName : ''}</td>
                    <td>{filledRows.includes(index) ? item.description : ''}</td>
                    <td>{filledRows.includes(index) ? item.price : ''}</td>
                    <td>{filledRows.includes(index) ? item.additionalData : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataIntegrationAnimation;
