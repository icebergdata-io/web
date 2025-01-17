import React, { useState, useEffect } from 'react';
import { Database, Globe, Server } from 'lucide-react';
import './matching-animation.css';

const RADIUS = 140;

// Define an array of objects representing each data source
const dataSources = [
  { name: 'Amazon', skuFormat: 'SKU_123', icon: 'globe' },
  { name: 'Shopify', skuFormat: 'PROD_123', icon: 'server' },
  { name: 'eBay', skuFormat: 'ITEM_123', icon: 'globe' },
  { name: 'Walmart', skuFormat: 'WM_123', icon: 'server' }
];

const DataIntegrationAnimation = () => {
  const [animatePackets, setAnimatePackets] = useState(false);
  const [displayAlignment, setDisplayAlignment] = useState(false);

  useEffect(() => {
    const triggerAnimationCycle = () => {
      setAnimatePackets(true);
      setTimeout(() => setDisplayAlignment(true), 2000);
      setTimeout(() => {
        setAnimatePackets(false);
        setDisplayAlignment(false);
      }, 3500);
    };

    triggerAnimationCycle();
    const intervalId = setInterval(triggerAnimationCycle, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="data-integration-container">
      {/* Central Hub with Database Icon */}
      <div className="central-hub">
        <div className="hub-icon-wrapper">
          <Database className="hub-icon" />
          {/* Alignment Visualization Overlay */}
          {displayAlignment && (
            <div className="alignment-overlay">
              <div className="pulse-background" />
              <div className="alignment-labels">
                {dataSources.slice(0, 3).map((source, index) => (
                  <div 
                    key={index} 
                    className="alignment-label" 
                    style={{ backgroundColor: index === 0 ? '#2563eb' : 
                                           index === 1 ? '#059669' : 
                                           '#ca8a04' }}
                  >
                    {source.skuFormat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="hub-description">Record Alignment Hub</div>
      </div>

      {/* Data Sources around the central hub */}
      {dataSources.map((source, i) => {
        // Calculate the position of each data source around a circle
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
            <div className="source-icon-container">
              <IconComponent className="source-icon" />
              <div className="sku-label">{source.skuFormat}</div>
            </div>
            <div className="source-name">{source.name}</div>

            {/* Animated Data Packet Visuals */}
            {animatePackets && (
              <div className="packet-animation-container">
                <div className="packet-animation">
                  <div 
                    className="data-packet" 
                    style={{
                      animation: `moveToCenter${i} 2s infinite`,
                    }}
                  />
                  <div 
                    className="packet-label" 
                    style={{
                      animation: `moveToCenter${i} 2s infinite`,
                    }}
                  >
                    {source.skuFormat}
                  </div>
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