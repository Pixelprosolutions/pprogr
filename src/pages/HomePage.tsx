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
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Δεν είστε σίγουροι ποιες υπηρεσίες χρειάζεστε;
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Κάθε επιχείρηση είναι μοναδική. Ας συζητήσουμε τους στόχους σας και θα σας προτείνουμε την καλύτερη στρατηγική για την ψηφιακή σας ανάπτυξη.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window as any).navigateToConsultation?.()}
                className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors glow-on-hover interactive text-lg"
              >
                Δωρεάν Συμβουλευτική - 30 λεπτά
              </button>
              <button
                onClick={() => window.open('tel:+306973517695', '_self')}
                className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors glow-on-hover interactive text-lg"
              >
                Καλέστε μας τώρα
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Χωρίς δέσμευση • Απαντάμε εντός 24 ωρών
            </p>
          </div>
        </div>
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
