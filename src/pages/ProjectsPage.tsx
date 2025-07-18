import React from 'react';
import Projects from '../components/Projects';

const ProjectsPage: React.FC = () => {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 mb-16 flex flex-col items-center justify-center min-h-[30vh]">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Τα Έργα μας</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center leading-relaxed">
            Εξερευνήστε το χαρτοφυλάκιό μας με επιτυχημένα έργα όπου έχουμε βοηθήσει τις τοπικές επιχειρήσεις να μεταμορφώσουν την ψηφιακή τους παρουσία
            και να επιτύχουν μετρήσιμα αποτελέσματα.
          </p>
        </div>
      </div>
      
      <Projects />
      
      {/* Note: Future development - Add project filtering by industry/service type and detailed case studies */}
    </main>
  );
};

export default ProjectsPage;
