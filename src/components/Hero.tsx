import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-4 py-24 md:py-36 lg:py-52 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="container mx-auto px-4 py-24 md:py-36 lg:py-52 flex items-center justify-center min-h-[calc(100vh-160px)]">
          <div className="text-center max-w-4xl space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Βοηθάμε Τοπικές Επιχειρήσεις να </span>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f43f5e)' }}>Αναπτυχθούν Online</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed px-2">
              Δημιουργούμε ιστοσελίδες και στρατηγικό marketing που φέρνει νέους πελάτες, ενισχύει την εικόνα σας και μετατρέπει την online παρουσία σας σε επιχειρηματικό πλεονέκτημα.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <button
                className="px-6 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive text-sm sm:text-base"
                onClick={() => (window as any).navigateToConsultation?.()}
              >
                Δωρεάν Συμβουλευτική
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                className="px-6 py-4 bg-transparent border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive text-sm sm:text-base"
                onClick={() => (window as any).navigateToTetris?.()}
              >
                Σπατάλησε το Χρονο Σου
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;