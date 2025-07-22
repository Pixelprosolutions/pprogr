import React from 'react';
import { Code, Palette, Globe, LineChart, Smartphone, Film } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-pink-500/30 hover:bg-black/40 hover:shadow-lg hover:shadow-pink-500/10 space-y-4">
      <div className="text-white">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('services.website.title'),
      description: t('services.website.description'),
      icon: <Code className="h-8 w-8" />
    },
    {
      title: t('services.eshop.title'),
      description: t('services.eshop.description'),
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: t('services.branding.title'),
      description: t('services.branding.description'),
      icon: <Palette className="h-8 w-8" />
    },
    {
      title: t('services.marketing.title'),
      description: t('services.marketing.description'),
      icon: <LineChart className="h-8 w-8" />
    },
    {
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      icon: <Smartphone className="h-8 w-8" />
    },
    {
      title: t('services.content.title'),
      description: t('services.content.description'),
      icon: <Film className="h-8 w-8" />
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('services.title')}</h2>
          <p className="text-gray-300/80 text-xl md:text-2xl max-w-3xl mx-auto">{t('services.description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
