import React, { useState, useEffect } from 'react';
import { Database, Globe, Server, Check } from 'lucide-react';
import './matching-animation.css';

const RADIUS = 380;

// Simplified data sources
const dataSources = [
  { 
    name: 'Shopify', 
    product: 'iPhone 14 Pro 256GB Black',
    icon: 'server',
    color: '#69db7c',
    bgColor: '#ebfbee'
  },
  { 
    name: 'eBay', 
    product: 'Apple iPhone 14 Pro 256GB Black',
    icon: 'globe',
    color: '#4dabf7',
    bgColor: '#e7f5ff'
  },
  { 
    name: 'Amazon', 
    product: 'iPhone 14 Pro (256GB, Black)',
    icon: 'globe',
    color: '#ffa94d',
    bgColor: '#fff4e6'
  },
  { 
    name: 'Walmart', 
    product: 'Apple iPhone 14 Pro 256GB',
    icon: 'server',
    color: '#748ffc',
    bgColor: '#edf2ff'
  }
];

const DataIntegrationAnimation = () => {
  const [animatePackets, setAnimatePackets] = useState(false);
  const [displayAlignment, setDisplayAlignment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const triggerAnimationCycle = () => {
      setAnimatePackets(true);
      setTimeout(() => setDisplayAlignment(true), 2500);
      setTimeout(() => setShowSuccess(true), 3500);
      setTimeout(() => {
        setAnimatePackets(false);
        setDisplayAlignment(false);
        setShowSuccess(false);
      }, 4500);
    };

    triggerAnimationCycle();
    const intervalId = setInterval(triggerAnimationCycle, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="data-integration-container">
      {/* Central Hub with Database Icon */}
      <div className="central-hub">
        <div className="hub-icon-wrapper">
          <Database className="hub-icon" />
          {showSuccess && (
            <div className="success-overlay">
              <Check className="success-icon" />
            </div>
          )}
          {/* Alignment Visualization Overlay */}
          {displayAlignment && (
            <div className="alignment-overlay">
              <div className="pulse-background" />
              <div className="alignment-labels">
                {dataSources.slice(0, isMobile ? 2 : 3).map((source, index) => (
                  <div 
                    key={index} 
                    className="alignment-label" 
                    style={{ 
                      backgroundColor: source.bgColor,
                      color: source.color,
                      borderLeft: `4px solid ${source.color}`
                    }}
                  >
                    <div className="product-name">{source.product}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="hub-description">Matching Hub</div>
      </div>

      {/* Data Sources around the central hub */}
      {dataSources.map((source, i) => {
        const angle = (i * Math.PI) / 2;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        const IconComponent = source.icon === 'globe' ? Globe : Server;

        return (
          <div
            key={i}
            className="data-source"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="source-name">{source.name}</div>
            <div 
              className="source-icon-container"
              style={{
                backgroundColor: source.bgColor,
                borderLeft: `4px solid ${source.color}`
              }}
            >
              <IconComponent className="source-icon" style={{ color: source.color }} />
              <div className="product-label" style={{ color: '#1a1a1a' }}>
                {source.product}
              </div>
            </div>

            {/* Animated Data Packet Visuals */}
            {animatePackets && (
              <div className="packet-animation-container">
                <div className="packet-animation">
                  <div 
                    className="data-packet" 
                    style={{
                      animation: `moveToCenter${i} 2.5s ease-in-out infinite`,
                      backgroundColor: source.color,
                      boxShadow: `0 0 12px ${source.color}80`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataIntegrationAnimation;