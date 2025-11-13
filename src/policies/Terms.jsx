import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-light-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-display-lg font-bold mb-8 text-gradient">Terms and Conditions</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">📄 Full Terms and Conditions</h2>
          <p className="text-blue-800 mb-4">
            For the complete, legally binding Terms and Conditions, please download the full PDF document below.
          </p>
          <a 
            href="/terms.pdf"
            download="ICEBERG DATA LLC STANDARD TERMS AND CONDITIONS FOR DATA SERVICES.pdf"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Terms and Conditions (PDF)
          </a>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-700 mb-2">
              <strong>File Hash (SHA-256):</strong> For transparency and to verify document integrity, the hash of this PDF file is:
            </p>
            <code className="block bg-blue-100 text-blue-900 p-3 rounded font-mono text-xs break-all">
              cebd99cb1a90f214d7f29e7dfd62aa243850d1bde1c9c5fda99dce0670326a51
            </code>
            <p className="text-xs text-blue-600 mt-2">
              You can verify this hash matches the downloaded file to ensure it hasn't been modified. If the hash changes, it indicates the document has been updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 