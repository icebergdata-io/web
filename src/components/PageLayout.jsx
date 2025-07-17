import PropTypes from 'prop-types';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';

const PageLayout = ({ 
  title, 
  description, 
  breadcrumbItems,
  children 
}) => {
  return (
    <>
      <SEO
        title={title}
        description={description}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 via-transparent to-transparent" />
        
        {/* Add padding-top to account for the fixed navbar */}
        <div className="pt-20 md:pt-24">
          {/* Breadcrumb with adjusted positioning and z-index */}
          <div className="container mx-auto px-4 mb-8 relative z-20">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ),
  children: PropTypes.node.isRequired,
};

export default PageLayout; 