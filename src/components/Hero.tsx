import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="relative">
        <div className="container mx-auto px-6 py-32 md:py-48 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Βοηθώντας τις Τοπικές Επιχειρήσεις να <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Αναπτυχθούν στο Διαδίκτυο</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Δημιουργούμε ιστότοπους και στρατηγικές ψηφιακού μάρκετινγκ που βοηθούν τις τοπικές επιχειρήσεις να προσελκύσουν περισσότερους πελάτες και να αυξήσουν τα έσοδά τους.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
                onClick={() => navigate('/how-we-work')}
              >
                Δείτε Πώς Μπορούμε να Βοηθήσουμε
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
                onClick={() => navigate('/contact')}
              >
                Επικοινωνήστε μαζί μας
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;