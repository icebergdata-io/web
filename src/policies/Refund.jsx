import React from 'react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">Refund Policy</h1>
        
        <div className="space-y-12">
          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">1. General Terms and Scope</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                This refund policy ("Policy") governs all services provided by Iceberg Data ("Company", "we", "us", "our") 
                and outlines the terms and conditions under which refunds may be considered. By engaging our services, 
                you acknowledge and agree to be bound by this Policy.
              </p>
              <p className="text-dark-700">
                Our services include, but are not limited to, web scraping, data integration, API access, infrastructure setup, 
                custom development, and ongoing data services. This Policy applies to all forms of compensation received for 
                these services.
              </p>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">2. Contract-Based Refunds</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                2.1. Individual service contracts serve as the primary governing documents for refund terms. Any refund 
                conditions will be explicitly stated within your service agreement with Iceberg Data.
              </p>
              <p className="text-dark-700">
                2.2. In the absence of specific refund provisions in the service contract, the terms outlined in Section 3 
                (Default Policy) shall apply.
              </p>
              <p className="text-dark-700">
                2.3. Contract terms regarding refunds supersede any general terms outlined in this Policy.
              </p>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">3. Default Policy</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                In the absence of specific contractual provisions regarding refunds:
              </p>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <h3 className="text-lg font-semibold text-primary-700 mb-4">3.1. Monetary Refunds</h3>
                <ul className="list-disc pl-6 space-y-2 text-dark-700">
                  <li>No cash or monetary refunds will be provided as our baseline policy</li>
                  <li>All payments are considered final upon receipt</li>
                  <li>Payment processing fees are non-refundable under any circumstances</li>
                </ul>
              </div>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <h3 className="text-lg font-semibold text-primary-700 mb-4">3.2. Service-Based Refunds</h3>
                <ul className="list-disc pl-6 space-y-2 text-dark-700">
                  <li>May be considered only when all of the following conditions are met:
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Full payment has been received and cleared</li>
                      <li>No services have been initiated or rendered</li>
                      <li>Request is made within 48 hours of payment</li>
                      <li>No resources have been allocated to the project</li>
                    </ul>
                  </li>
                  <li>Will be provided exclusively in the form of equivalent services</li>
                  <li>Must be utilized within 90 days of approval</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">4. Non-Refundable Services</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                The following services and associated costs are strictly non-refundable:
              </p>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <ul className="list-disc pl-6 space-y-2 text-dark-700">
                  <li>Any completed work or delivered data</li>
                  <li>API access or usage fees</li>
                  <li>Infrastructure and setup costs</li>
                  <li>Custom development or integration work</li>
                  <li>Project planning and consultation time</li>
                  <li>Resource allocation and scheduling</li>
                  <li>Data processing and transformation services</li>
                  <li>Training and support services</li>
                  <li>Third-party service fees or licenses</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">5. Special Circumstances</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                5.1. In exceptional cases where service delivery is significantly impacted by factors within our direct 
                control, we may, at our sole discretion, offer compensation in one or more of the following forms:
              </p>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <ul className="list-disc pl-6 space-y-2 text-dark-700">
                  <li>Extended service period</li>
                  <li>Additional service features</li>
                  <li>Alternative data solutions</li>
                  <li>Service credits for future use</li>
                </ul>
              </div>
              <p className="text-dark-700">
                5.2. The determination of what constitutes an exceptional case and the form of compensation offered 
                remains at the sole discretion of Iceberg Data.
              </p>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">6. Refund Request Process</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                To initiate a refund consideration:
              </p>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <ol className="list-decimal pl-6 space-y-2 text-dark-700">
                  <li>Contact your designated account manager or our support team</li>
                  <li>Provide your contract reference number and relevant documentation</li>
                  <li>Detail the specific services in question</li>
                  <li>Submit any supporting evidence for your request</li>
                  <li>Allow up to 5 business days for initial review</li>
                </ol>
              </div>
              <p className="text-dark-700">
                All refund requests will be evaluated based on the terms outlined in this Policy and any applicable 
                contract terms.
              </p>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">7. Legal Considerations</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                7.1. This Policy forms part of our overall service agreement and should be read in conjunction with our 
                Terms of Service and other applicable policies.
              </p>
              <p className="text-dark-700">
                7.2. We reserve the right to modify this Policy at any time without prior notice. The current version 
                will always be available on our website.
              </p>
              <p className="text-dark-700">
                7.3. Any disputes regarding refunds shall be resolved in accordance with the dispute resolution 
                provisions in your service contract or our Terms of Service.
              </p>
            </div>
          </section>

          <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg">
            <h2 className="text-display-sm mb-6 text-dark-800 font-display">8. Contact Information</h2>
            <div className="prose prose-lg">
              <p className="text-dark-700">
                For any questions regarding our refund policy or to discuss your specific situation, please contact:
              </p>
              <div className="bg-primary-50/50 rounded-xl p-6 my-4">
                <p className="text-dark-700">
                  Email: info@iceberg-data.com<br />
                  Address: 447 Broadway, 2nd Floor – 1978, NY, New York, US, 10013
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund; 