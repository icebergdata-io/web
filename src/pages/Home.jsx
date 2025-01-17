import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Problems from '../components/Problems';
import ServiceSection from '../components/ServiceSection';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const Home = () => {
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
      <div id="services">
        <ServiceSection />
      </div>
      <div id="case-studies">
        <CaseStudies />
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