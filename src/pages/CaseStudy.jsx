import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';

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
    const fetchCaseStudies = async () => {
      try {
        console.log(`🔍 Looking for case study with sector: ${sector}, slug: ${slug}`);
        let found = false;
        
        // Fetch all case studies to find the matching slug and sector
        for (let i = 1; i <= 38; i++) {
          const response = await fetch(`/articles/cases/${i}.json`);
          const data = await response.json();
          const currentSlug = slugify(`${data.Title}-${data.Subtitle}`);
          const currentSector = slugify(data.Sector);
          
          console.log(`📄 Checking case study ${i}:`);
          console.log(`   Expected: sector=${sector}, slug=${slug}`);
          console.log(`   Current: sector=${currentSector}, slug=${currentSlug}`);
          
          if (currentSlug === slug && currentSector === sector) {
            console.log(`✅ Found matching case study: ${i}`);
            setCaseData({ id: i, ...data });
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.log('❌ No matching case study found');
        }
      } catch (error) {
        console.error('❌ Error fetching case study:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
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

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Business Impact</h2>
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
              <p className="text-dark-700 whitespace-pre-line">{caseData["Problems this solves"]}</p>
            </div>
          </div>

          <div className="bg-primary-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-2">Input Schema</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  {caseData["Exact_Input_Schema"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseData["Exact_Input_Schema"]} 
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">{caseData["Input Schema"]}</pre>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Output Schema</h3>
                <div className="bg-white p-4 rounded-xl overflow-x-auto">
                  {caseData["Exact_Output_Schema"] ? (
                    <div className="schema-viewer">
                      <JsonView 
                        data={caseData["Exact_Output_Schema"]} 
                        shouldExpandNode={(level) => level < 2}
                      />
                    </div>
                  ) : (
                    <pre className="text-sm">{caseData["Output Schema"]}</pre>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Matching Algorithm</h3>
                <p className="text-dark-700">{caseData["Matching algorithm used to integrate the data"]}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">The Full Story</h2>
            <div 
              className="text-dark-700 story-content"
              dangerouslySetInnerHTML={{ __html: caseData.Story }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy; 