import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCaseStudies = async () => {
      try {
        const studies = [];
        for (let i = 1; i <= 38; i++) {
          try {
            const response = await fetch(`/articles/cases/${i}.json`);
            const data = await response.json();
            const slug = slugify(`${data.Title}-${data.Subtitle}`);
            studies.push({ id: i, slug, ...data });
          } catch (error) {
            console.error(`Error fetching case study ${i}:`, error);
          }
        }
        // Sort case studies by sector for better organization
        studies.sort((a, b) => a.Sector.localeCompare(b.Sector));
        setCaseStudies(studies);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCaseStudies();
  }, []);

  // Group case studies by sector
  const groupedStudies = caseStudies.reduce((acc, study) => {
    if (!acc[study.Sector]) {
      acc[study.Sector] = [];
    }
    acc[study.Sector].push(study);
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

          {Object.entries(groupedStudies).map(([sector, studies]) => (
            <div key={sector} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-dark-900">{sector}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studies.map((study) => (
                  <Link
                    key={study.id}
                    to={`/case-study/${study.slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col h-full">
                      <div className="text-sm text-primary-600 mb-3">{study.Sector}</div>
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