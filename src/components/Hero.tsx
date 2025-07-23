import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-4 pt-56 md:pt-64 lg:pt-72 pb-24 md:pb-36 lg:pb-52 flex items-center justify-center min-h-[calc(100vh-160px)]">
          <div className="text-center max-w-4xl space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" itemProp="headline">
              <span className="text-white">{t('hero.title.part1')}</span>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f43f5e)' }}>{t('hero.title.part2')}</span>
            </h1>
            <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed px-2 max-w-3xl mx-auto" itemProp="description">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <button
                onClick={() => (window as any).navigateToConsultation?.()}
                className="px-6 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors glow-on-hover interactive text-sm sm:text-base"
              >
                {t('hero.cta.consultation')}
              </button>
              <button
                className="px-6 py-4 bg-transparent border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive text-sm sm:text-base"
                onClick={() => (window as any).navigateToTetris?.()}
              >
                {t('hero.cta.game')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
