import React from 'react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 text-gradient">Refund Policy</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">No Refund Policy</h2>
            <p className="text-dark-700 mb-4">
              Due to the nature of our data services and the immediate delivery of value through our web scraping and data integration solutions, Iceberg Data maintains a strict no-refund policy. Once a service has been rendered or data has been delivered, no refunds will be issued.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Rationale</h2>
            <p className="text-dark-700 mb-4">
              Our services involve immediate resource allocation, custom development, and data processing that cannot be reversed or repurposed once initiated. Each project is tailored to specific client requirements and begins incurring costs immediately upon commencement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Service Guarantee</h2>
            <p className="text-dark-700 mb-4">
              While we do not offer refunds, we are committed to delivering high-quality services that meet the agreed-upon specifications. We work closely with our clients throughout the project to ensure satisfaction and address any concerns promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Dispute Resolution</h2>
            <p className="text-dark-700 mb-4">
              In the event of a dispute regarding service delivery or quality, we will work with you to resolve the issue through our customer support channels. This may include service adjustments or additional support to meet the agreed-upon deliverables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-display-sm mb-4 text-dark-800">Contact Us</h2>
            <p className="text-dark-700 mb-4">
              If you have any questions about our refund policy, please contact us at info@iceberg-data.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund; 