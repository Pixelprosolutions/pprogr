import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  result: string;
  challenge: string;
  solution: string;
  metrics?: string[];
  websiteUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  result,
  challenge,
  solution,
  metrics = [],
  websiteUrl
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10 p-8 h-full">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          </h3>
          <h3 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f43f5e)' }}>
            {title}
          </h3>
          <p className="text-gray-300/80 text-xl leading-relaxed mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black/60 backdrop-blur-sm border border-white/20 text-white py-1 px-3 rounded-lg text-sm hover:bg-black/80 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex flex-col gap-3">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/80 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-black/90 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                {t('projects.buttons.more')}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 text-sm"
            >
              {isExpanded ? t('projects.buttons.less') : t('projects.buttons.details')}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-6">
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">{t('projects.challenge')}</h4>
                <p className="text-gray-300/80">{challenge}</p>
              </div>
              
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">{t('projects.solution')}</h4>
                <p className="text-gray-300/80">{solution}</p>
              </div>
              
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">{t('projects.results')}</h4>
                <p className="text-gray-300/80 mb-4">{result}</p>
                {metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {metrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-lg border" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
                        <p className="text-sm" style={{ color: '#f43f5e' }}>{metric}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      title: t('projects.voltbuild.title'),
      description: t('projects.voltbuild.description'),
      tags: [t('projects.voltbuild.tags.website'), t('projects.voltbuild.tags.eshop'), t('projects.voltbuild.tags.seo'), t('projects.voltbuild.tags.strategy')],
      result: t('projects.voltbuild.result'),
      challenge: t('projects.voltbuild.challenge'),
      solution: t('projects.voltbuild.solution'),
      metrics: [
        t('projects.voltbuild.metrics.1'),
        t('projects.voltbuild.metrics.2'),
        t('projects.voltbuild.metrics.3')
      ],
      websiteUrl: "https://voltbuild.gr"
    },
    {
      title: t('projects.naterra.title'),
      description: t('projects.naterra.description'),
      tags: [t('projects.naterra.tags.branding'), t('projects.naterra.tags.website'), t('projects.naterra.tags.marketing')],
      result: t('projects.naterra.result'),
      challenge: t('projects.naterra.challenge'),
      solution: t('projects.naterra.solution'),
      metrics: [
        t('projects.naterra.metrics.1'),
        t('projects.naterra.metrics.2'),
        t('projects.naterra.metrics.3')
      ],
      websiteUrl: "https://naterra.uk"
    },
    {
      title: t('projects.kts.title'),
      description: t('projects.kts.description'),
      tags: [t('projects.kts.tags.website'), t('projects.kts.tags.rebranding'), t('projects.kts.tags.digital'), t('projects.kts.tags.social')],
      result: t('projects.kts.result'),
      challenge: t('projects.kts.challenge'),
      solution: t('projects.kts.solution'),
      metrics: [
        t('projects.kts.metrics.1'),
        t('projects.kts.metrics.2'),
        t('projects.kts.metrics.3')
      ],
      websiteUrl: "https://ktswoodart.com"
    },
    {
      title: t('projects.alex.title'),
      description: t('projects.alex.description'),
      tags: [t('projects.alex.tags.onepage'), t('projects.alex.tags.personal'), t('projects.alex.tags.cases')],
      result: t('projects.alex.result'),
      challenge: t('projects.alex.challenge'),
      solution: t('projects.alex.solution'),
      metrics: [
        t('projects.alex.metrics.1'),
        t('projects.alex.metrics.2'),
        t('projects.alex.metrics.3')
      ],
      websiteUrl: "https://alexalali.com"
    },
    {
      title: t('projects.sidiropoulos.title'),
      description: t('projects.sidiropoulos.description'),
      tags: [t('projects.sidiropoulos.tags.website'), t('projects.sidiropoulos.tags.medical'), t('projects.sidiropoulos.tags.seo')],
      result: t('projects.sidiropoulos.result'),
      challenge: t('projects.sidiropoulos.challenge'),
      solution: t('projects.sidiropoulos.solution'),
      metrics: [
        t('projects.sidiropoulos.metrics.1'),
        t('projects.sidiropoulos.metrics.2'),
        t('projects.sidiropoulos.metrics.3')
      ],
      websiteUrl: "https://sidiropoulos-urology.gr"
    },
    {
      title: t('projects.underground.title'),
      description: t('projects.underground.description'),
      tags: [t('projects.underground.tags.website'), t('projects.underground.tags.branding'), t('projects.underground.tags.marketing360'), t('projects.underground.tags.products')],
      result: t('projects.underground.result'),
      challenge: t('projects.underground.challenge'),
      solution: t('projects.underground.solution'),
      metrics: [
        t('projects.underground.metrics.1'),
        t('projects.underground.metrics.2'),
        t('projects.underground.metrics.3'),
        t('projects.underground.metrics.4')
      ],
      websiteUrl: "https://undergroundtalent.co.uk"
    }
  ];

  return (
    <section id="projects" className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('projects.title')}</h2>
          <p className="text-gray-300/80 text-xl md:text-2xl max-w-3xl mx-auto">{t('projects.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              result={project.result}
              challenge={project.challenge}
              solution={project.solution}
              metrics={project.metrics}
              websiteUrl={project.websiteUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
