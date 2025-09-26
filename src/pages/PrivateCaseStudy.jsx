import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

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

  // Normalize problems list to an array of strings
  const getProblemItems = () => {
    const raw = caseStudy?.["Problems this solves"];
    if (Array.isArray(raw)) {
      return raw.filter(Boolean);
    }
    return String(raw || '')
      .split(/(?=\d+\))/)
      .filter(Boolean);
  };

  return (
    <>
      <SEO 
        title={`${caseStudy.Title} - Private Case Study | Iceberg Data`}
        description={caseStudy.Subtitle}
        keywords={`${caseStudy.Platform}, social media, private case study, data analytics, ${caseStudy["Use Case"]}`}
        type="article"
        image={`https://www.icebergdata.co/logos/logo-large.png`}
        noindex={true}
      />
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-4xl mx-auto px-4">

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              to="/private-case-studies"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Private Case Studies
            </Link>
            <Link 
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Public Case Studies
            </Link>
          </div>

          <div id="case-study-header" className="mb-12">
            <div className="text-sm text-primary-600 mb-2">{caseStudy.Sector}</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
              {caseStudy.Title}
            </h1>
            <p className="text-xl text-dark-700 mb-4">
              {caseStudy.Subtitle}
            </p>
            <div className="text-sm text-dark-500">
              Published on {formatDate(caseStudy.publicationDate)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative business-impact-section">
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => {
                  document.querySelector('.technical-details-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Technical Details
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4 pr-32">Business Impact</h2>
            <p className="text-dark-700 mb-6">{caseStudy["Business Impact"]}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold mb-2">Platform</h3>
                <p className="text-dark-700">{caseStudy.Platform}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Use Case</h3>
                <p className="text-dark-700">{caseStudy["Use Case"]}</p>
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
                {getProblemItems().map((item, index) => {
                  const label = typeof item === 'string' ? (item.match(/^\d+/)?.[0] || String(index + 1)) : String(index + 1);
                  const text = typeof item === 'string' ? item.replace(/^\d+\)\s*/, '') : String(item);
                  return (
                    <div key={index} className="flex items-start mb-2">
                      <span className="font-semibold text-primary-600 mr-2 min-w-[2rem]">{label}.</span>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Implementation & Results</h2>
            <div 
              className="text-dark-700 story-content"
              dangerouslySetInnerHTML={{ __html: caseStudy.Story }}
            />
          </div>

          <div className="bg-primary-50 rounded-2xl p-8 relative technical-details-section">
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => {
                  document.querySelector('.business-impact-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Business Impact
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Matching Algorithm</h3>
                <p className="text-dark-700">{caseStudy["Matching algorithm used to integrate the data"]}</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Example Input JSON</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  {caseStudy["Example_Input_JSON"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseStudy["Example_Input_JSON"]}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">No input example provided.</pre>
                  )}
                </div>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(caseStudy["Example_Input_JSON"] || {}, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${caseStudy.Title.replace(/[^a-zA-Z0-9]/g, '_')}_example_input.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  📥 Download Example Input JSON
                </button>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Example Output JSON</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  {caseStudy["Example_Output_JSON"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseStudy["Example_Output_JSON"]}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">No output example provided.</pre>
                  )}
                </div>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(caseStudy["Example_Output_JSON"] || {}, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${caseStudy.Title.replace(/[^a-zA-Z0-9]/g, '_')}_example_output.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  📥 Download Example Output JSON
                </button>
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
