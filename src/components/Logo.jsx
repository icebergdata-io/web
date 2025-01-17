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
    <img
      src={`/logos/logo-${size}.png`}
      alt="Iceberg Data Logo"
      width={actualSize}
      height={actualSize}
      className={`object-contain ${className}`}
    />
  );
};

export default Logo; 