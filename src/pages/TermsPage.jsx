import React from 'react';
import SEO from '../components/SEO';
import Terms from '../policies/Terms';

const TermsPage = () => {
  return (
    <>
      <SEO 
        title="Terms and Conditions - Iceberg Data"
        description="Read our terms and conditions for web scraping and data integration services. Understand your rights and obligations when using Iceberg Data services."
        keywords="terms and conditions, legal, web scraping terms, data integration terms, service agreement"
      />
      <Terms />
    </>
  );
};

export default TermsPage; 