import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PromoVideo from '../components/PromoVideo';
import Projects from '../components/Projects';
import About from '../components/About';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <main itemScope itemType="https://schema.org/WebPage">
      <section id="home">
        <Hero />
      </section>
      <section id="services" itemScope itemType="https://schema.org/Service">
        <Services />
      </section>
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" itemProp="headline">{t('cta.title')}</h2>
            <p className="text-gray-300/80 text-xl md:text-2xl mb-8 max-w-3xl mx-auto" itemProp="description">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window as any).navigateToConsultation?.()}
                className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors glow-on-hover interactive text-base md:text-lg"
                aria-label="Κλείστε δωρεάν συμβουλευτική συνάντηση"
              >
                {t('cta.consultation')}
              </button>
              <button
                onClick={() => window.open('tel:+306973517695', '_self')}
                className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors glow-on-hover interactive text-base md:text-lg"
                aria-label="Καλέστε μας στο +30 697 3517 695"
              >
                {t('cta.call')}
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">{t('cta.note')}</p>
          </div>
        </div>
      </section>
      <PromoVideo />
      <section id="projects">
        <Projects />
      </section>
      <section id="about" itemScope itemType="https://schema.org/AboutPage">
        <About isHomepage={true} />
      </section>
      <section id="pricing" itemScope itemType="https://schema.org/Offer">
        <Pricing />
      </section>
      <section id="contact" itemScope itemType="https://schema.org/ContactPage">
        <Contact />
      </section>
    </main>
  );
};

export default HomePage;
