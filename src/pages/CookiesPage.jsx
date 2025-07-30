import React from 'react';
import SEO from '../components/SEO';
import Cookies from '../policies/Cookies';

const CookiesPage = () => {
  return (
    <>
      <SEO 
        title="Cookie Policy - Iceberg Data"
        description="Understand how Iceberg Data uses cookies and similar technologies to improve your browsing experience and provide personalized services."
        keywords="cookie policy, cookies, tracking, website analytics, browser storage"
      />
      <Cookies />
    </>
  );
};

export default CookiesPage; 