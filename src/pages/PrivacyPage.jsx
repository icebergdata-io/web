import React from 'react';
import SEO from '../components/SEO';
import Privacy from '../policies/Privacy';

const PrivacyPage = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy - Iceberg Data"
        description="Learn how Iceberg Data collects, uses, and protects your personal information. Our privacy policy explains your rights and our data practices."
        keywords="privacy policy, data protection, personal information, GDPR, data privacy"
      />
      <Privacy />
    </>
  );
};

export default PrivacyPage; 