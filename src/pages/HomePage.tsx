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
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <PromoVideo />
      <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <About isHomepage={true} />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default HomePage;
