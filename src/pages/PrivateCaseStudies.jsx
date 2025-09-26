import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const PrivateCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivateCaseStudies = async () => {
      try {
        console.log('🔍 Loading private case studies...');
        
        // Load the private sharing configuration
        const response = await fetch('/private-sharing-config.json');
        if (!response.ok) {
          throw new Error(`Failed to load private case studies: ${response.status}`);
        }
        
        const config = await response.json();
        console.log(`📊 Loaded ${Object.keys(config.accessTokens).length} private case studies`);
        
        // Transform the configuration into case study objects
        const studies = Object.entries(config.accessTokens).map(([caseId, tokenData]) => ({
          id: caseId,
          title: tokenData.title,
          platform: tokenData.platform,
          accessToken: tokenData.token,
          createdAt: tokenData.createdAt,
          accessCount: tokenData.accessCount || 0
        }));
        
        // Sort by creation date (newest first)
        studies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('📄 Private case studies loaded:', studies);
        setCaseStudies(studies);
      } catch (error) {
        console.error('❌ Error fetching private case studies:', error);
        setError('Failed to load private case studies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateCaseStudies();
  }, []);

  // Get unique platforms for filtering
  const platforms = Array.from(new Set(caseStudies.map(cs => cs.platform))).sort();

  // Filter by selected platform
  const filteredStudies = selectedPlatform === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.platform === selectedPlatform);

  // Group case studies by platform
  const groupedStudies = filteredStudies.reduce((acc, study) => {
    if (!acc[study.platform]) {
      acc[study.platform] = [];
    }
    acc[study.platform].push(study);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-dark-600">Loading private case studies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
              Error Loading Case Studies
            </h1>
            <p className="text-lg text-dark-700 mb-6">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Private Case Studies - Iceberg Data Social Media Solutions"
        description="Exclusive private case studies showcasing advanced social media data analysis solutions for Instagram, LinkedIn, and TikTok."
        keywords="private case studies, social media analytics, Instagram scraping, LinkedIn analysis, TikTok trends, data solutions"
        noindex={true} // Keep private case studies out of search engines
      />
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Private Access Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-1">
                  🔒 Private Case Studies
                </h2>
                <p className="text-blue-800">
                  These case studies are shared confidentially and require access tokens to view. Contact us for access to these advanced social media analytics solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            {/* Platform filter dropdown */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 w-11/12 sm:w-auto sm:top-28 sm:left-[calc(50%-640px+1rem)] sm:translate-x-0 z-50">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-blue-600 text-white border border-blue-700 rounded-xl shadow-lg px-4 py-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-700 transition-colors"
              >
                <option value="All">All Platforms</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Private Case Studies
            </h1>
            <p className="text-xl text-dark-700 max-w-3xl mx-auto">
              Advanced social media analytics solutions for Instagram, LinkedIn, and TikTok
            </p>
          </div>

          {Object.entries(groupedStudies).map(([platform, studies]) => (
            <div key={platform} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-purple rounded-xl flex items-center justify-center mr-4">
                  {platform === 'Instagram' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {platform === 'LinkedIn' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {platform === 'TikTok' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-dark-900">{platform} Solutions</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/private-case-study/${study.id}/${study.accessToken}`}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-primary-600 font-medium">{study.platform}</span>
                        <span className="text-sm text-dark-500">{formatDate(study.createdAt)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {study.title}
                      </h3>
                      <div className="flex-grow mb-4">
                        <div className="flex items-center text-sm text-blue-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Private Access Required
                        </div>
                      </div>
                      <div className="flex items-center text-primary-600 font-medium">
                        View Private Case Study
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredStudies.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-900 mb-2">No Case Studies Found</h3>
              <p className="text-dark-600">No private case studies available for the selected platform.</p>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-accent-purple rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in These Solutions?</h2>
            <p className="text-lg mb-6 opacity-90">
              These private case studies showcase our advanced social media analytics capabilities.
              Contact us to learn more about implementing these solutions for your business.
            </p>
            <a
              href="mailto:david@icebergdata.co?subject=Private Case Studies Inquiry"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us About Private Solutions
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateCaseStudies;
