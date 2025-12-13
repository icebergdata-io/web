import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description,
  image = 'https://www.icebergdata.co/og-logo.png', // Default OG image
  type = 'website',
  keywords = 'web scraping, data extraction, business intelligence, data analytics',
  noindex = false,
  canonical
}) => {
  const location = useLocation();
  const baseUrl = 'https://www.icebergdata.co';
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
  const siteName = 'Iceberg Data';
  // Use Vite's import.meta.env instead of process.env for browser compatibility
  const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Google Search Console Verification */}
      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}
      
      {/* Robots Meta Tag */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

// PropTypes for better development experience
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
  keywords: PropTypes.string,
  noindex: PropTypes.bool,
  canonical: PropTypes.string
};

export default SEO; 