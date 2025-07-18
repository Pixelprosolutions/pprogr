import React from 'react';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Επικοινωνήστε μαζί μας</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center">
          Είστε έτοιμοι να συζητήσουμε το έργο σας; Επικοινωνήστε με την ομάδα μας και ας αρχίσουμε να μεταμορφώνουμε την ψηφιακή σας παρουσία.
        </p>
      </div>
      
      <Contact />
      
      {/* Note: Future development - Add FAQ section, office location map, and business hours */}
    </main>
  );
};

export default ContactPage;
