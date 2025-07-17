import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 text-gradient">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">1. Information We Collect</h2>
            <p className="text-dark-700 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-dark-700 mb-4">
              <li>Contact information (name, email, phone number)</li>
              <li>Company information</li>
              <li>Project requirements and specifications</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">2. How We Use Your Information</h2>
            <p className="text-dark-700 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-dark-700 mb-4">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you service-related communications</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">3. Data Security</h2>
            <p className="text-dark-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">4. Data Sharing</h2>
            <p className="text-dark-700 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-dark-700 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">5. Your Rights</h2>
            <p className="text-dark-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-dark-700 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">6. Contact Us</h2>
            <p className="text-dark-700 mb-4">
              For any privacy-related questions or concerns, please contact us at info@iceberg-data.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 