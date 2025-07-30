import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';
import { findCaseStudyBySlug } from '../utils/caseStudyUtils';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const CaseStudy = () => {
  const { sector, slug } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        console.log(`🔍 Looking for case study with sector: ${sector}, slug: ${slug}`);
        
        const caseData = await findCaseStudyBySlug(sector, slug);
        
        if (caseData) {
          console.log(`✅ Found matching case study: ${caseData.id}`);
          setCaseData(caseData);
        } else {
          console.log('❌ No matching case study found');
        }
      } catch (error) {
        console.error('❌ Error fetching case study:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug, sector]);

  useEffect(() => {
    // Redirect to 404 if case study not found after loading
    if (!loading && !caseData) {
      console.log('🔄 Redirecting to 404 - Case study not found');
      navigate('/404', { replace: true });
    }
  }, [loading, caseData, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-dark-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return null; // Will be redirected by the useEffect above
  }

  // Schema.org markup for the case study
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseData.Title,
    "description": caseData.Subtitle,
    "articleBody": caseData.Story,
    "author": {
      "@type": "Organization",
      "name": "Iceberg Data"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Iceberg Data",
      "logo": {
        "@type": "ImageObject",
        "url": "https://icebergdata.co/logo.png"
      }
    },
    "industry": caseData.Sector,
    "keywords": [caseData.Sector, "data analytics", "case study", "business intelligence"],
  };

  return (
    <>
      <SEO 
        title={`${caseData.Title} - Iceberg Data Case Study`}
        description={caseData["Business Impact"]}
        keywords={`${caseData.Sector}, data analytics, case study, business intelligence, ${caseData.Title.toLowerCase()}`}
        type="article"
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          ...schemaData,
          datePublished: caseData.publicationDate,
        })}
      </script>
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <div className="text-sm text-primary-600 mb-2">{caseData.Sector}</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
              {caseData.Title}
            </h1>
            <p className="text-xl text-dark-700 mb-4">
              {caseData.Subtitle}
            </p>
            <div className="text-sm text-dark-500">
              Published on {formatDate(caseData.publicationDate)}
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
            <p className="text-dark-700 mb-6">{caseData["Business Impact"]}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold mb-2">Sector</h3>
                <p className="text-dark-700">{caseData.Sector}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Implementation Time</h3>
                <p className="text-dark-700">{caseData["Implementation time"]}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Data Collection</h3>
              <p className="text-dark-700">{caseData["What data was collected"]}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Why This Matters</h3>
              <p className="text-dark-700">{caseData["Why this matters"]}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-2">Problems Solved</h3>
              <div className="text-dark-700">
                {caseData["Problems this solves"].split(/(?=\d+\))/).map((item, index) => {
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
            <h2 className="text-2xl font-bold mb-4">The Full Story</h2>
            <div 
              className="text-dark-700 story-content"
              dangerouslySetInnerHTML={{ __html: caseData.Story }}
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
            <h2 className="text-2xl font-bold mb-6 pr-32">Technical Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Matching Algorithm</h3>
                <p className="text-dark-700">{caseData["Matching algorithm used to integrate the data"]}</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Example Input JSON</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  {caseData["Example_Input_JSON"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseData["Example_Input_JSON"]}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : caseData["Exact_Input_Schema"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={(() => {
                          const schema = { ...caseData["Exact_Input_Schema"] };
                          delete schema.required;
                          return schema;
                        })()}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">{caseData["Input Schema"]}</pre>
                  )}
                </div>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(caseData["Example_Input_JSON"] || caseData["Exact_Input_Schema"] || caseData["Input Schema"], null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${caseData.Title.replace(/[^a-zA-Z0-9]/g, '_')}_example_input.json`;
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
                  {caseData["Example_Output_JSON"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseData["Example_Output_JSON"]}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : caseData["Exact_Output_Schema"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={(() => {
                          const schema = { ...caseData["Exact_Output_Schema"] };
                          delete schema.required;
                          return schema;
                        })()}
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">{caseData["Output Schema"]}</pre>
                  )}
                </div>
                <button 
                  onClick={() => {
                    const dataStr = JSON.stringify(caseData["Example_Output_JSON"] || caseData["Exact_Output_Schema"] || caseData["Output Schema"], null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${caseData.Title.replace(/[^a-zA-Z0-9]/g, '_')}_example_output.json`;
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
        </div>
      </div>
    </>
  );
};

export default CaseStudy; 