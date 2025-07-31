import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedCaseStudies = ({ relatedStudies, currentSector }) => {
  if (!relatedStudies || relatedStudies.length === 0) {
    return null;
  }

  // Don't show if we have less than 2 related studies to avoid a sparse section
  if (relatedStudies.length < 2) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark-900 mb-2">
          More {currentSector} Case Studies
        </h2>
        <p className="text-dark-700">
          Explore other success stories in the {currentSector} sector
        </p>
      </div>

      <div className={`grid gap-6 ${relatedStudies.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {relatedStudies.map((study) => (
          <Link
            key={study.id}
            to={`/case-study/${study.sectorSlug}/${study.slug}#header`}
            className="group bg-light-50 rounded-xl p-6 hover:bg-light-100 transition-all duration-300 border border-light-200 hover:border-primary-200"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-primary-600 font-medium">
                  {study.Sector}
                </span>
                <span className="text-sm text-dark-500">
                  {formatDate(study.publicationDate)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                {study.Title}
              </h3>
              
              <p className="text-dark-700 mb-4 flex-grow text-sm line-clamp-3">
                {study.Subtitle}
              </p>
              
              <div className="flex items-center text-primary-600 font-medium text-sm">
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
      
      <div className="mt-8 pt-6 border-t border-light-200">
        <Link
          to="/case-studies"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          View All Case Studies
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
        </Link>
      </div>
    </div>
  );
};

export default RecommendedCaseStudies; 