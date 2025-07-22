import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {

  return (
    <div>
      <section id="contact" className="py-12 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Επικοινωνήστε μαζί μας</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Ακολουθήστε μας</h3>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/pixelpro.solutions/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/alex-alali/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/pixelpro.solutions/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@PixelproSolutions" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="mt-4 md:mt-6">
                <button
                  className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive text-sm md:text-base"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Πάμε στην κορυφή
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Έτοιμοι να Ξεκινήσουμε;</h3>
              <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto">
                Επικοινωνήστε μαζί μας σήμερα και ας συζητήσουμε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να αναπτυχθεί στο διαδίκτυο.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => (window as any).navigateToConsultation?.()}
                  className="w-full bg-transparent border border-white/30 text-white font-medium py-4 px-6 md:px-8 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center text-base md:text-lg"
                >
                  Δωρεάν Συμβουλευτική
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-4">Ή επικοινωνήστε απευθείας:</p>
                <div className="space-y-2 text-center text-gray-300 text-sm md:text-base">
                  <a href="mailto:hello@pixelpro.solutions" className="flex items-center justify-center hover:text-white transition-colors">
                    <Mail className="h-4 w-4 mr-2" />
                    hello@pixelpro.solutions
                  </a>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">London Office:</p>
                    <p>DA16 3AP, London, United Kingdom</p>
                    <a href="tel:+442081295829" className="flex items-center justify-center hover:text-white transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      +44 20 8129 5829
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Greece Office:</p>
                    <p>60100, Katerini, Greece</p>
                    <a href="tel:+306973517695" className="flex items-center justify-center hover:text-white transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      +30 697 3517 695
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;