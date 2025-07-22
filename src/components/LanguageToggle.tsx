import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
      <button
        onClick={() => setLanguage('el')}
        className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          language === 'el'
            ? 'bg-white text-black'
            : 'text-white hover:bg-white/20'
        }`}
      >
        ΕΛ
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-black'
            : 'text-white hover:bg-white/20'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;