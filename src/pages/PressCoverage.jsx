import { useState } from 'react';
import { pressArticles } from '../components/Press';
import PublicationsModal from '../components/PublicationsModal';
import SEO from '../components/SEO';

const pressPublications = [
  // Argentina
  {
    country: "Argentina",
    publications: [
      { url: "https://ciudademprendedores.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://elmundoempresa.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://elmundoempresa.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://elobservadornacional.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://casesa.es/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://actualidad-abc.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://capital24h.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://extracolumna.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://emprendedoresdehoy.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://digitalfinanzas.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://digitalconfidencial.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://elfinanciero.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://lacronicasiete.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://diariodecapital.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://diarioshoy.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://periodicprincipal.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://digitalextra.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://diarionasud.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://economiasdigitales.com/argentina/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://extraempress.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/" }
    ]
  },
  // Mexico
  {
    country: "Mexico",
    publications: [
      { url: "https://elobservadornacional.com/mexico/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://casesa.es/mexico/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://actualidad-abc.com/mexico/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://capital24h.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://finanzasinversion.com/mexico/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://informeanalisf.es/mexico/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://noticianegocio.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://digitalconfidencial.com/mexico/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://elfinanciero.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://diariodecapital.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://lacronicasiete.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://diarioshoy.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://periodicprincipal.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://digitalextra.com/mexico/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://economiasdigitales.com/mexico/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" }
    ]
  },
  // Chile
  {
    country: "Chile",
    publications: [
      { url: "https://ciudademprendedores.com/chile/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://extracolumna.com/chile/2024/12/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" },
      { url: "https://digitalfinanzas.com/chile/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/" },
      { url: "https://diariodecapital.com/chile/iceberg-data-convierte-el-desorden-digital-en-organizacion/" },
      { url: "https://periodicprincipal.com/chile/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/" }
    ]
  }
];

const PressCoverage = () => {
  const [showPublications, setShowPublications] = useState(false);
  
  const getDomainName = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0];
    } catch {
      return url;
    }
  };

  return (
    <>
      <SEO 
        title="Press Coverage - Iceberg Data in Global Media"
        description="Explore Iceberg Data's comprehensive media coverage across different countries. Read about our data solutions and industry insights in leading publications."
        keywords="press coverage, media coverage, news articles, Iceberg Data news, data analytics press"
        type="article"
      />
      {/* SEO-friendly links (visually hidden) */}
      <div className="sr-only">
        <h2>All Press Coverage by Country</h2>
        {pressPublications.map((country, index) => (
          <div key={index}>
            <h3>{country.country} Press Coverage</h3>
            <ul>
              {country.publications.map((pub, pubIndex) => (
                <li key={pubIndex}>
                  <a href={pub.url} target="_blank" rel="noopener noreferrer">
                    {getDomainName(pub.url)} - Iceberg Data Press Coverage
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-6">
              Global Press Coverage
            </h1>
            <p className="text-xl text-dark-700 max-w-3xl mx-auto">
              Explore our comprehensive media coverage across different countries and publications
            </p>
          </div>

          {/* Featured Articles */}
          <div className="mb-20">
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pressArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="text-sm text-primary-600 mb-3">{article.date}</div>
                    <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-dark-700 mb-4 flex-grow">
                      {article.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium">
                      Read on {getDomainName(article.link)}
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
                </a>
              ))}
            </div>
          </div>

          {/* View All Publications Button */}
          <div className="text-center mb-20">
            <button
              onClick={() => setShowPublications(true)}
              className="inline-flex items-center px-6 py-3 bg-dark-900 text-white rounded-xl hover:bg-dark-800 transition-colors"
            >
              View All Publications
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* David's Personal Website Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-primary-50 to-accent-purple/10 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">
                Learn More About Our CEO
              </h3>
              <p className="text-dark-700 mb-6">
                Visit David Martin Riveros&apos; personal website to learn more about his journey, speaking engagements, and thought leadership in the data industry.
              </p>
              <a
                href="https://www.davidmartinriveros.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Visit Personal Website
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <PublicationsModal
        isOpen={showPublications}
        onClose={() => setShowPublications(false)}
        publications={pressPublications}
      />
    </>
  );
};

export default PressCoverage; 