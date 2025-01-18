import React, { useState, useEffect } from 'react';
import { Database, Table, Layers } from 'lucide-react';
import './database-construction.css';

const DatabaseConstructionAnimation = () => {
  const [stage, setStage] = useState(0);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const stages = [
      () => setShowTable(true),
      () => setStage(1),
      () => setStage(2),
      () => {
        setStage(0);
        setShowTable(false);
      }
    ];

    const timings = [0, 2000, 4000, 6000];
    const timeouts = timings.map((time, index) => 
      setTimeout(stages[index], time)
    );

    const intervalId = setInterval(() => {
      timeouts.forEach((timeout, index) => 
        setTimeout(stages[index], timings[index])
      );
    }, 7000);

    return () => {
      clearInterval(intervalId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="database-construction-container">
      <div className="construction-stage">
        <div className="database-icon-wrapper">
          <Database className="database-icon" />
          {showTable && (
            <div className="table-overlay">
              <div className="table-grid">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`table-cell ${stage > 0 ? 'filled' : ''} ${stage > 1 ? 'normalized' : ''}`}
                  >
                    <div className="cell-content">
                      {stage > 0 && <Layers size={16} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="stage-description">
          {stage === 0 && 'Building Schema'}
          {stage === 1 && 'Adding Records'}
          {stage === 2 && 'Normalizing '}
        </div>
      </div>
    </div>
  );
};

export default DatabaseConstructionAnimation; 