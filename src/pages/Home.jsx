import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Problems from '../components/Problems';
import Solutions from '../components/Solutions';
import ServiceSection from '../components/ServiceSection';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Press from '../components/Press';

const Home = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state to prevent scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="problems">
        <Problems />
      </div>
      <div id="solutions">
        <Solutions />
      </div>
      <div id="services">
        <ServiceSection />
      </div>
      <div id="case-studies">
        <CaseStudies />
      </div>
      <div id="press">
        <Press />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home; 