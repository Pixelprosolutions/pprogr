import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('pixelpro-cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('pixelpro-cookie-consent', 'accepted');
    localStorage.setItem('pixelpro-analytics-consent', 'true');
    setIsVisible(false);
    // Enable Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const acceptNecessary = () => {
    localStorage.setItem('pixelpro-cookie-consent', 'necessary-only');
    localStorage.setItem('pixelpro-analytics-consent', 'false');
    setIsVisible(false);
    // Disable Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  const saveSettings = (analytics: boolean) => {
    localStorage.setItem('pixelpro-cookie-consent', 'custom');
    localStorage.setItem('pixelpro-analytics-consent', analytics.toString());
    setIsVisible(false);
    setShowSettings(false);
    
    // Update Google Analytics consent
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg max-w-4xl mx-auto">
        {!showSettings ? (
          // Main banner
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white mb-2">🍪 Χρήση Cookies</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Αυτός ο ιστότοπος χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας και να αναλύσει την επισκεψιμότητα μέσω Google Analytics. 
              Τα δεδομένα συλλέγονται ανώνυμα και δεν μοιράζονται με τρίτους. Συνεχίζοντας την περιήγηση, συμφωνείτε με τη χρήση cookies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 text-sm">
                <button
                  onClick={() => (window as any).navigateToCookiePolicy?.()}
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  Μάθετε περισσότερα
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  Ρυθμίσεις
                </button>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 bg-transparent border border-white/30 text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
                >
                  Μόνο Απαραίτητα
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-white text-sm rounded-lg font-medium transition-all duration-300"
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
                >
                  Αποδοχή Όλων
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Settings panel
          <CookieSettings 
            onSave={saveSettings}
            onBack={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
};

interface CookieSettingsProps {
  onSave: (analytics: boolean) => void;
  onBack: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ onSave, onBack }) => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Ρυθμίσεις Cookies</h3>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        {/* Necessary Cookies */}
        <div className="flex items-start justify-between p-4 bg-black/40 rounded-lg border border-white/10">
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-1">Απαραίτητα Cookies</h4>
            <p className="text-gray-300 text-sm">
              Αυτά τα cookies είναι απαραίτητα για τη βασική λειτουργία του ιστοτόπου και δεν μπορούν να απενεργοποιηθούν.
            </p>
          </div>
          <div className="ml-4">
            <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="flex items-start justify-between p-4 bg-black/40 rounded-lg border border-white/10">
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-1">Αναλυτικά Cookies</h4>
            <p className="text-gray-300 text-sm">
              Βοηθούν να κατανοήσουμε πώς χρησιμοποιείτε τον ιστότοπο μέσω ανώνυμων στατιστικών (Google Analytics).
            </p>
          </div>
          <div className="ml-4">
            <button
              onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                analyticsEnabled ? 'bg-pink-600 justify-end' : 'bg-gray-600 justify-start'
              } px-1`}
            >
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-transparent border border-white/30 text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
        >
          Πίσω
        </button>
        <button
          onClick={() => onSave(analyticsEnabled)}
          className="px-4 py-2 text-white text-sm rounded-lg font-medium transition-all duration-300"
          style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
        >
          Αποθήκευση Ρυθμίσεων
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
