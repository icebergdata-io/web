import React from 'react';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 48,
    medium: 96,
    large: 72,
    xlarge: 192
  };

  const actualSize = sizes[size] || sizes.medium;

  return (
    <div className={`relative group ${className}`}>
      {/* Main logo */}
      <div className="relative transform-gpu">
        <img
          src={`/logos/logo-${size}.png`}
          alt="Iceberg Data Logo"
          width={actualSize}
          height={actualSize}
          className="object-contain relative z-10"
        />

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-300/0 via-primary-300/10 to-accent-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-xl -z-10"></div>
        
        {/* Additional ambient light effect */}
        <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
      </div>
    </div>
  );
};

export default Logo; 