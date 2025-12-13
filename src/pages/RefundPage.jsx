import React from 'react';
import SEO from '../components/SEO';
import Refund from '../policies/Refund';

const RefundPage = () => {
  return (
    <>
      <SEO 
        title="Refund Policy - Iceberg Data"
        description="Learn about Iceberg Data's refund policy for web scraping and data integration services. Understand when refunds are available and how to request them."
        keywords="refund policy, money back guarantee, service refunds, cancellation policy"
        canonical="https://www.icebergdata.co/refund-policy"
      />
      <Refund />
    </>
  );
};

export default RefundPage; 