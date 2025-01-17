import React from 'react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 text-gradient">Cookie Policy</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">What Are Cookies</h2>
            <p className="text-dark-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide useful information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">How We Use Cookies</h2>
            <p className="text-dark-700 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-dark-700 mb-4">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: To understand how visitors use our website</li>
              <li>Preference cookies: To remember your settings and preferences</li>
              <li>Marketing cookies: To deliver more relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-dark-800">Essential Cookies</h3>
                <p className="text-dark-700">Used for basic website functionality and security features.</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark-800">Performance Cookies</h3>
                <p className="text-dark-700">Help us understand how visitors interact with our website.</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark-800">Functionality Cookies</h3>
                <p className="text-dark-700">Remember your preferences and settings.</p>
              </div>
              <div>
                <h3 className="font-semibold text-dark-800">Targeting Cookies</h3>
                <p className="text-dark-700">Used to deliver personalized content and advertisements.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Managing Cookies</h2>
            <p className="text-dark-700 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Changes to This Policy</h2>
            <p className="text-dark-700 mb-4">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Contact Us</h2>
            <p className="text-dark-700 mb-4">
              If you have any questions about our Cookie Policy, please contact us at info@iceberg-data.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies; 