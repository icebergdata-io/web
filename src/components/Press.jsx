import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const pressArticles = [
  {
    title: "How Iceberg Data Extracts Business Insights",
    description: "Learn how we transforms raw data into actionable business intelligence",
    link: "https://ceoweekly.com/iceberg-data-how-david-martin-riveros-extracts-insights/",
    date: "2024"
  },
  {
    title: "How Iceberg Data Helps Hotels Use Data to Boost Bookings",
    description: "Discover how our solutions help the hospitality industry leverage data for growth",
    link: "https://www.cxodispatch.com/thought-leadership/how-david-martin-riveros-helps-hotels-use-data-to-boost-bookings/",
    date: "2024"
  },
  {
    title: "Iceberg Data: Data-Driven Decisions For Enterprises",
    description: "Our CEO's vision on transforming enterprise decision-making through data",
    link: "https://usreporter.com/david-martin-riveros-data-driven-decisions-for-enterprises/",
    date: "2024"
  },
  {
    title: "Iceberg Data: Using AI to Unlock Government Updates",
    description: "How Iceberg Data's technology helps track and analyze government data",
    link: "https://nyweekly.com/business/david-martin-riveros-using-ai-to-unlock-government-updates/",
    date: "2024"
  },
  {
    title: "How Iceberg Data' agentic AI revolutionizes data collection",
    description: "Exploring the innovative AI technology behind our data collection solutions",
    link: "https://www.digitaljournal.com/tech-science/how-david-martin-riveros-agentic-ai-revolutionizes-data-collection/article",
    date: "2024"
  },
  {
    title: "Iceberg Data Transforms Public Data into Strategic Decisions",
    description: "Learn how Iceberg Data is revolutionizing the way businesses leverage public data for strategic decision-making.",
    date: "March 2024",
    link: "https://elmundoempresa.com/mexico/iceberg-data-la-solucion-para-transformar-datos-publicos-en-decisiones-estrategicas/",
    image: "/images/press/article1.jpg",
    imageAlt: "Iceberg Data's data transformation process visualization"
  },
  {
    title: "From Recipe Books to Big Data: Iceberg Data Redefines Business Data Integration",
    description: "Discover how Iceberg Data is bridging the gap between traditional data sources and modern big data analytics.",
    date: "March 2024",
    link: "https://ciudademprendedores.com/argentina/desde-el-recetario-hasta-el-big-data-iceberg-data-reevalua-la-integracion-de-datos-empresariales/",
    image: "/images/press/article2.jpg",
    imageAlt: "Data integration workflow diagram by Iceberg Data"
  },
  {
    title: "Iceberg Data Turns Digital Chaos into Organization",
    description: "See how Iceberg Data's innovative approach is helping businesses organize and make sense of their digital data.",
    date: "February 2024",
    link: "https://elmundoempresa.com/argentina/iceberg-data-convierte-el-desorden-digital-en-organizacion/",
    image: "/images/press/article3.jpg",
    imageAlt: "Digital organization system showcase by Iceberg Data"
  }
];

const Press = () => {
  const [randomArticles, setRandomArticles] = useState([]);

  useEffect(() => {
    // Randomly select 3 articles from the pressArticles array
    const shuffledArticles = [...pressArticles].sort(() => Math.random() - 0.5);
    setRandomArticles(shuffledArticles.slice(0, 3));
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-dark-900">
              In the{' '}
              <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Press
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dark-600 max-w-2xl mx-auto">
              Read what others are saying about our innovative data solutions
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {randomArticles.map((article, index) => (
            <motion.a
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-elevation-2 p-8 h-full transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium">
                      {article.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-dark-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-dark-600 mb-6 flex-grow">
                    {article.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                    Read Article
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/press"
            className="inline-flex items-center px-6 py-3 bg-dark-900 text-white rounded-xl hover:bg-dark-800 transition-colors"
          >
            View All Press Coverage
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Press; 