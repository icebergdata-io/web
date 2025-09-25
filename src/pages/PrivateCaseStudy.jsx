import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

const PrivateCaseStudy = () => {
  const { caseId, accessToken } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivateCaseStudy = async () => {
      try {
        // Load sharing configuration from public file
        const configResponse = await fetch('/private-sharing-config.json');
        if (!configResponse.ok) {
          setError('Unable to load sharing configuration');
          return;
        }

        const config = await configResponse.json();
        if (!config.sharingEnabled) {
          setError('Private sharing is disabled');
          return;
        }

        const tokenData = config.accessTokens?.[caseId];
        if (!tokenData || tokenData.token !== accessToken) {
          setError('Invalid access token');
          return;
        }

        // Load the private case study JSON using the mapped filename
        const caseResponse = await fetch(`/private-case-studies/${tokenData.filename}`);
        if (!caseResponse.ok) {
          setError('Case study not found');
          return;
        }

        const data = await caseResponse.json();
        setCaseStudy(data);
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateCaseStudy();
  }, [caseId, accessToken]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-dark-600">Loading private case study...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Logo size="medium" />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 border border-primary-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
                Access Denied
              </h1>
              <p className="text-lg text-dark-700 mb-6">
                {error}
              </p>
              <p className="text-sm text-dark-500">
                This is a private case study. Please contact us if you believe you should have access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${caseStudy.Title} - Private Case Study | Iceberg Data`}
        description={caseStudy.Subtitle}
        keywords={`${caseStudy.Platform}, social media, private case study, data analytics, ${caseStudy.Use_Case}`}
        type="article"
        image={`https://www.icebergdata.co/logos/logo-large.png`}
        noindex={true}
      />
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Private Access Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-blue-800 font-medium">
                🔒 Private Case Study - This content is shared confidentially
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-primary-600 mb-2">
              <span className="bg-primary-100 px-2 py-1 rounded-full">{caseStudy.Platform}</span>
              <span className="text-dark-400">•</span>
              <span>{caseStudy.Use_Case}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
              {caseStudy.Title}
            </h1>
            <p className="text-xl text-dark-700 mb-4">
              {caseStudy.Subtitle}
            </p>
            <div className="text-sm text-dark-500">
              Generated on {formatDate(caseStudy.publicationDate)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative">
            <h2 className="text-2xl font-bold mb-4">Business Impact</h2>
            <p className="text-dark-700 mb-6">{caseStudy["Business Impact"]}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold mb-2">Platform</h3>
                <p className="text-dark-700">{caseStudy.Platform}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Use Case</h3>
                <p className="text-dark-700">{caseStudy.Use_Case}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Implementation Time</h3>
                <p className="text-dark-700">{caseStudy["Implementation time"]}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Sector</h3>
                <p className="text-dark-700">{caseStudy.Sector}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Data Collection</h3>
              <p className="text-dark-700">{caseStudy["What data was collected"]}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Why This Matters</h3>
              <p className="text-dark-700">{caseStudy["Why this matters"]}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Problems Solved</h3>
              <div className="text-dark-700">
                {caseStudy["Problems this solves"].split(/(?=\d+\))/).map((item, index) => {
                  if (item.trim()) {
                    return (
                      <div key={index} className="flex items-start mb-2">
                        <span className="font-semibold text-primary-600 mr-2 min-w-[2rem]">
                          {item.match(/^\d+/)?.[0]}.
                        </span>
                        <span>{item.replace(/^\d+\)\s*/, '')}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Implementation & Results</h2>
            <div className="text-dark-700 story-content space-y-6">
              {caseStudy["Client Background"] && (
                <div>
                  <h3 className="font-bold mb-2">Client Background</h3>
                  <p>{caseStudy["Client Background"]}</p>
                </div>
              )}
              {caseStudy.Challenge && (
                <div>
                  <h3 className="font-bold mb-2">Challenge</h3>
                  <p>{caseStudy.Challenge}</p>
                </div>
              )}
              {caseStudy.Solution && (
                <div>
                  <h3 className="font-bold mb-2">Solution</h3>
                  <p>{caseStudy.Solution}</p>
                </div>
              )}
              {Array.isArray(caseStudy["Key Features"]) && caseStudy["Key Features"].length > 0 && (
                <div>
                  <h3 className="font-bold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside">
                    {caseStudy["Key Features"].map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Matching Algorithm</h3>
                <p className="text-dark-700">{caseStudy["Matching algorithm used to integrate the data"]}</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Example Input JSON</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  <pre className="text-sm">{JSON.stringify(caseStudy["Example_Input_JSON"], null, 2)}</pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Example Output JSON</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  <pre className="text-sm">{JSON.stringify(caseStudy["Example_Output_JSON"], null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-accent-purple rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in This Solution?</h2>
            <p className="text-lg mb-6 opacity-90">
              This case study demonstrates our expertise in {caseStudy.Platform} data analysis. 
              Let's discuss how we can help your business.
            </p>
            <a 
              href="mailto:david@icebergdata.co?subject=Private Case Study Inquiry"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us About This Solution
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateCaseStudy;
