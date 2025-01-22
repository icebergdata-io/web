import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
  const location = useLocation();
  const baseUrl = 'https://icebergdata.io'; // Replace with your actual domain
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO; 