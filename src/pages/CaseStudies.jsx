import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';
// Removed getAllCaseStudies import - now using index-only approach

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudiesIndex = async () => {
      try {
        console.log('🔍 Loading case studies index only...');
        
        // Load only the index.json file
        const response = await fetch('/articles/cases/index.json');
        if (!response.ok) {
          throw new Error(`Failed to load index: ${response.status}`);
        }
        
        const indexData = await response.json();
        console.log(`📊 Loaded index with ${indexData.total} case studies`);
        
        // Map index fields to expected format and add slugs
        const studiesWithSlugs = indexData.caseStudies.map(study => ({
          id: study.id,
          Title: study.title,
          Subtitle: study.subtitle,
          Sector: study.sectorName,
          publicationDate: study.publicationDate,
          slug: study.slug,
          sectorSlug: study.sector
        }));
        
        // Log each case study for debugging
        studiesWithSlugs.forEach(study => {
          console.log(`📄 Case study ${study.id}:`);
          console.log(`   Title: ${study.Title}`);
          console.log(`   Sector: ${study.Sector}`);
          console.log(`   Generated URL: /case-study/${study.sectorSlug}/${study.slug}`);
        });
        
        // Case studies are already sorted by date in the index (newest first)
        setCaseStudies(studiesWithSlugs);
      } catch (error) {
        console.error('❌ Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudiesIndex();
  }, []);

  // Group case studies by year and month
  const groupedStudies = caseStudies.reduce((acc, study) => {
    const date = new Date(study.publicationDate);
    const yearMonth = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(study);
    return acc;
  }, {});

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <SEO 
        title="Case Studies - Iceberg Data Success Stories"
        description="Explore our collection of case studies showcasing how Iceberg Data helps businesses leverage data for growth and success."
        keywords="case studies, success stories, data analytics, business intelligence, data solutions"
      />
      
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-dark-700 max-w-3xl mx-auto">
              Real-world examples of how we help businesses transform their data into actionable insights
            </p>
          </div>

          {Object.entries(groupedStudies).map(([yearMonth, studies]) => (
            <div key={yearMonth} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-dark-900">{yearMonth}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-study/${study.sectorSlug}/${study.slug}#header`}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-primary-600">{study.Sector}</span>
                        <span className="text-sm text-dark-500">{formatDate(study.publicationDate)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {study.Title}
                      </h3>
                      <p className="text-dark-700 mb-4 flex-grow">
                        {study.Subtitle}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium">
                        Read Case Study
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
        </div>
      </div>
    </>
  );
};

export default CaseStudies; 