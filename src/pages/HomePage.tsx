import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PromoVideo from '../components/PromoVideo';
import Projects from '../components/Projects';
import About from '../components/About';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Services />
      <PromoVideo />
      <Projects />
      <About isHomepage={true} />
      <Pricing />
      <Contact />
    </main>
  );
};

export default HomePage;
