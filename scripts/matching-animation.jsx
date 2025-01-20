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
  const [showConstruction, setShowConstruction] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const timers = useRef([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Don't run animation on mobile
    if (isMobile) {
      return;
    }

    const triggerAnimationCycle = () => {
      // Start animation for current product
      setAnimatePackets(true);
      setShowCheck(false);
      setShowConstruction(false);
      setShowTable(false);

      // After 3 seconds, show the checkmark
      timers.current.push(setTimeout(() => {
        setAnimatePackets(false);
        setShowCheck(true);
      }, 3000));

      // After 4 seconds, start database construction
      timers.current.push(setTimeout(() => {
        setShowConstruction(true);
      }, 4000));

      // After 6 seconds, show the table
      timers.current.push(setTimeout(() => {
        setShowConstruction(false);
        setShowTable(true);
      }, 6000));

      // After 12 seconds, move to the next product
      timers.current.push(setTimeout(() => {
        setShowTable(false);
        setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 12000));
    };

    // Start the first animation cycle
    triggerAnimationCycle();

    // Repeat the animation cycle every 12 seconds
    const intervalId = setInterval(triggerAnimationCycle, 12000);
    timers.current.push(intervalId);

    // Cleanup on unmount
    return () => {
      timers.current.forEach(timer => clearTimeout(timer));
      clearInterval(intervalId);
    };
  }, [isMobile]);

  // Get the current product
  const currentProduct = products[currentProductIndex];

  // If mobile, show a static version without animations
  if (isMobile) {
    return (
      <div className="data-integration-container">
        <div className="data-sources-row">
          {currentProduct.dataSources.map(source => {
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
              </div>
            );
          })}
        </div>
        <div className="central-hub">
          <div className="hub-icon-wrapper">
            <Database className="hub-icon" aria-label="Central Matching Hub" />
          </div>
          <div className="hub-description">Matching Hub</div>
        </div>
      </div>
    );
  }

  return (
    <div className="data-integration-container">
      {/* Data Sources Row */}
      <div className="data-sources-row">
        {currentProduct.dataSources.map(source => {
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
                        animation: `moveToHub${source.id} 3s ease-in-out forwards`,
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

        {/* Database Construction Animation */}
        {showConstruction && (
          <div className="database-construction-container">
            <div className="construction-stage">
              <div className="database-icon-wrapper">
                <Database className="database-icon" />
              </div>
              <div className="stage-description">Building Database...</div>
            </div>
          </div>
        )}

        {/* Table Output */}
        {showTable && (
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
                {products.slice(0, currentProductIndex + 1).flatMap(product => 
                  product.dataSources.map((item, index) => (
                    <tr key={`${product.masterSKU}-${item.id}`}>
                      <td>{index + 1}</td>
                      <td className="master-sku highlighted">{product.masterSKU}</td>
                      <td>{item.storeName}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.additionalData}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataIntegrationAnimation;
