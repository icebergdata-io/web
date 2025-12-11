import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Breadcrumb navigation component with structured data
 * @param {Array} items - Array of {name, url} objects
 */
const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-dark-600 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = item.url.startsWith('http') 
            ? item.url.replace('https://www.icebergdata.co', '').replace('https://icebergdata.co', '')
            : item.url;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 mx-2 text-dark-400 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {isLast ? (
                <span className="text-dark-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={href} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Breadcrumbs;

