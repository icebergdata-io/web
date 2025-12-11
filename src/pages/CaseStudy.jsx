import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';
import { findCaseStudyBySlug, getRelatedCaseStudies } from '../utils/caseStudyUtils';
import RecommendedCaseStudies from '../components/RecommendedCaseStudies';
import { sanitizeHTML } from '../utils/sanitize';
import { generateBreadcrumbSchema, getCaseStudyBreadcrumbs } from '../utils/breadcrumbs';
import Breadcrumbs from '../components/Breadcrumbs';

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
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        console.log(`🔍 Looking for case study with sector: ${sector}, slug: ${slug}`);
        
        const caseData = await findCaseStudyBySlug(sector, slug);
          
        if (caseData) {
          console.log('✅ Found matching case study:', { id: caseData.id, title: caseData.Title, sector: caseData.Sector });
          setCaseData(caseData);
          
          // Fetch related case studies from the same sector
          console.log(`🔍 Fetching related case studies for sector: ${sector} excluding ID: ${caseData.id}`);
          const related = await getRelatedCaseStudies(sector, caseData.id, 3);
          console.log('📊 Related studies fetched:', related.map(s => ({ id: s.id, title: s.Title })));
          setRelatedStudies(related);
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

  useEffect(() => {
    // Handle scroll to header when navigating from case studies list
    if (caseData && window.location.hash === '#header') {
      const headerElement = document.getElementById('case-study-header');
      if (headerElement) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          const navbarHeight = window.innerWidth >= 768 ? 96 : 80; // Account for navbar height
          const elementTop = headerElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
          
          // Clear the hash after scrolling to prevent issues with browser back button
          setTimeout(() => {
            if (window.location.hash === '#header') {
              window.history.replaceState(null, null, window.location.pathname);
            }
          }, 1000);
        }, 100);
      }
    }
  }, [caseData]);

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

  // Generate breadcrumbs
  const breadcrumbs = getCaseStudyBreadcrumbs(caseData);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  
  // Enhanced Article schema with better SEO
  const articleUrl = `https://www.icebergdata.co/case-study/${caseData.sectorSlug || caseData.Sector?.toLowerCase().replace(/\s+/g, '-')}/${caseData.slug}`;
  const articleImage = `https://www.icebergdata.co/logos/logo-large.png`;
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseData.Title,
    "description": caseData.Subtitle,
    "articleBody": caseData.Story,
    "author": {
      "@type": "Organization",
      "@id": "https://www.icebergdata.co/#organization",
      "name": "Iceberg Data",
      "url": "https://www.icebergdata.co",
      "logo": {
        "@type": "ImageObject",
        "url": articleImage
      }
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.icebergdata.co/#organization",
      "name": "Iceberg Data",
      "logo": {
        "@type": "ImageObject",
        "url": articleImage,
        "width": 1200,
        "height": 1200
      }
    },
    "datePublished": caseData.publicationDate,
    "dateModified": caseData.publicationDate || caseData.publicationDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "image": {
      "@type": "ImageObject",
      "url": articleImage,
      "width": 1200,
      "height": 1200
    },
    "industry": caseData.Sector,
    "keywords": [
      caseData.Sector,
      "data analytics",
      "case study",
      "business intelligence",
      "web scraping",
      "data extraction",
      caseData.Title.toLowerCase()
    ],
    "about": {
      "@type": "Thing",
      "name": caseData.Sector
    },
    "inLanguage": "en-US"
  };

  return (
    <>
      <SEO 
        title={`${caseData.Title} - Iceberg Data Case Study`}
        description={caseData["Business Impact"]}
        keywords={`${caseData.Sector}, data analytics, case study, business intelligence, ${caseData.Title.toLowerCase()}, web scraping, data extraction`}
        type="article"
        image={`https://www.icebergdata.co/logos/logo-large.png`}
      />
      
      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Enhanced Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs items={breadcrumbs} />
          
          <div id="case-study-header" className="mb-12">
            <div className="text-sm text-primary-600 mb-2">
              <Link to="/case-studies" className="hover:underline">Case Studies</Link>
              {' / '}
              <Link to={`/case-studies?sector=${encodeURIComponent(caseData.Sector)}`} className="hover:underline">
                {caseData.Sector}
              </Link>
            </div>
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
            <h2 className="text-2xl font-bold mb-4">Implementation & Results</h2>
            <div 
              className="text-dark-700 story-content"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(caseData.Story) }}
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
          
          {/* Related Services Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                to="/services/web-scraping" 
                className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <h3 className="font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Web Scraping Services
                </h3>
                <p className="text-sm text-dark-600">
                  Custom web scraping solutions for your data needs
                </p>
              </Link>
              <Link 
                to="/services/data-integration" 
                className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <h3 className="font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Data Integration
                </h3>
                <p className="text-sm text-dark-600">
                  Connect and unify data from multiple sources
                </p>
              </Link>
              <Link 
                to="/services/custom-solutions" 
                className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <h3 className="font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Custom Solutions
                </h3>
                <p className="text-sm text-dark-600">
                  Tailored data solutions for your business
                </p>
              </Link>
            </div>
          </div>

          {/* Recommended Case Studies */}
          <RecommendedCaseStudies 
            relatedStudies={relatedStudies}
            currentSector={caseData.Sector}
          />
          
          {/* Back to Case Studies Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/case-studies" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View All Case Studies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudy; 