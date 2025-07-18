import React from 'react';
import About from '../components/About';

const AboutPage: React.FC = () => {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center transform transition-all duration-500 hover:scale-105">
          Σχετικά με Εμάς
        </h1>
      </div>
      
      <About />
      
      {/* Note: Future development - Add team member profiles, company history timeline, and values section */}
    </main>
  );
};

export default AboutPage;
