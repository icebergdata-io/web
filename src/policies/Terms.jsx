import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 text-gradient">Terms and Conditions</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">📄 Full Terms and Conditions</h2>
          <p className="text-blue-800 mb-4">
            This page contains a summary of our terms and conditions. For the complete, legally binding version, please refer to our full document.
          </p>
          <a 
            href="https://docs.google.com/document/d/1JJ2_Imic9PQ5Ch544DgooxusuZLqDx6JXUo4iZZ1KfM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Full Terms and Conditions
          </a>
        </div>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">1. Agreement to Terms</h2>
            <p className="text-dark-700 mb-4">
              By accessing and using Iceberg Data's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">2. Services Description</h2>
            <p className="text-dark-700 mb-4">
              Iceberg Data provides web scraping and data integration services. We collect, process, and deliver data according to client specifications while adhering to all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">3. Service Usage</h2>
            <p className="text-dark-700 mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of our services complies with applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">4. Intellectual Property</h2>
            <p className="text-dark-700 mb-4">
              The service and its original content, features, and functionality are owned by Iceberg Data and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">5. Payment Terms</h2>
            <p className="text-dark-700 mb-4">
              Payment terms are specified in individual service agreements. All fees are non-refundable unless otherwise specified in writing by Iceberg Data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">6. Limitation of Liability</h2>
            <p className="text-dark-700 mb-4">
              Iceberg Data shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">7. Changes to Terms</h2>
            <p className="text-dark-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">8. Contact Information</h2>
            <p className="text-dark-700 mb-4">
              For any questions about these Terms, please contact us at info@iceberg-data.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms; 