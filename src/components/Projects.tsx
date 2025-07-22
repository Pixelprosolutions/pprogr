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
      result: "Η VoltBuild ξεχώρισε στον ταχέως αναπτυσσόμενο χώρο των φορτιστών EV στην Ελλάδα",
      challenge: "Η VoltBuild χρειαζόταν έναν σύγχρονο ιστότοπο με SEO-first δομή για να ξεχωρίσει στον ταχέως αναπτυσσόμενο χώρο των φορτιστών EV στην Ελλάδα.",
      solution: "Κατασκευάσαμε responsive website με λειτουργικό eshop, δημιουργήσαμε SEO σελίδες υπηρεσιών και αναπτύξαμε περιεχόμενο για οργανική ανάπτυξη.",
      metrics: [
        "300% αύξηση οργανικής επισκεψιμότητας",
        "Πρώτες θέσεις στο Google για βασικές λέξεις-κλειδιά",
        "Αύξηση εισερχόμενων leads και πωλήσεων"
      ],
      websiteUrl: "https://voltbuild.gr"
    },
    {
      title: t('projects.naterra.title'),
      description: t('projects.naterra.description'),
      tags: [t('projects.naterra.tags.branding'), t('projects.naterra.tags.website'), t('projects.naterra.tags.marketing')],
      result: "Ενίσχυση της παρουσίας στο Λονδίνο και διαφοροποίηση στον κλάδο των ανακαινίσεων",
      challenge: "Η Naterra ήθελε να ενισχύσει την παρουσία της στο Λονδίνο και να ξεχωρίσει στον κλάδο των ανακαινίσεων.",
      solution: "Δημιουργήσαμε brand ταυτότητα, σχεδιάσαμε επαγγελματικό ιστότοπο και βάλαμε τα θεμέλια για στοχευμένη digital στρατηγική.",
      metrics: [
        "Σύγχρονη, πλήρως responsive ιστοσελίδα",
        "Σταθερή οργανική ανάπτυξη",
        "Αύξηση αιτήσεων εργασιών μέσω website"
      ],
      websiteUrl: "https://naterra.uk"
    },
    {
      title: t('projects.kts.title'),
      description: t('projects.kts.description'),
      tags: [t('projects.kts.tags.website'), t('projects.kts.tags.rebranding'), t('projects.kts.tags.digital'), t('projects.kts.tags.social')],
      result: "Επαναπροσδιορισμός brand και online στρατηγική με εστίαση σε τοπικό κοινό",
      challenge: "Η KTS Woodart, με έδρα το Λονδίνο, χρειαζόταν επαναπροσδιορισμό brand και online στρατηγική.",
      solution: "Αναπτύξαμε νέα οπτική ταυτότητα, responsive website και πλάνο ψηφιακής ανάπτυξης με εστίαση σε τοπικό κοινό και social media.",
      metrics: [
        "Ολοκληρωμένο νέο brand με συνεκτική παρουσία",
        "Επαγγελματικό portfolio έργων",
        "Ενεργοποίηση οργανικής ροής πελατών"
      ],
      websiteUrl: "https://ktswoodart.com"
    },
    {
      title: t('projects.alex.title'),
      description: t('projects.alex.description'),
      tags: [t('projects.alex.tags.onepage'), t('projects.alex.tags.personal'), t('projects.alex.tags.cases')],
      result: "Επαγγελματικό ψηφιακό portfolio για παρουσίαση δεξιοτήτων και έργων",
      challenge: "Ο Alex Alali χρειαζόταν ένα επαγγελματικό ψηφιακό portfolio για να παρουσιάσει τις δεξιότητες και τα έργα του.",
      solution: "Κατασκευάστηκε minimal site με ξεκάθαρη παρουσίαση έργων και προτροπές για συνεργασία.",
      metrics: [
        "Ισχυρή επαγγελματική ταυτότητα",
        "Πλήρης παρουσίαση δεξιοτήτων & έργων",
        "Χρήση σε επαγγελματικές προσεγγίσεις"
      ],
      websiteUrl: "https://alexalali.com"
    },
    {
      title: t('projects.sidiropoulos.title'),
      description: t('projects.sidiropoulos.description'),
      tags: [t('projects.sidiropoulos.tags.website'), t('projects.sidiropoulos.tags.medical'), t('projects.sidiropoulos.tags.seo')],
      result: "Σύγχρονη παρουσία που εμπνέει εμπιστοσύνη και διευκολύνει την πρόσβαση των ασθενών",
      challenge: "Το ιατρείο χρειαζόταν σύγχρονη παρουσία που να εμπνέει εμπιστοσύνη και να διευκολύνει την πρόσβαση των ασθενών σε πληροφορίες.",
      solution: "Δημιουργήσαμε ιστοσελίδα με ξεκάθαρη δομή, ιατρικό περιεχόμενο και ενσωματωμένη φόρμα επικοινωνίας.",
      metrics: [
        "90% θετικό feedback από χρήστες",
        "Μείωση ερωτήσεων μέσω τηλεφώνου",
        "Καλύτερη θέση σε τοπικές αναζητήσεις"
      ],
      websiteUrl: "https://sidiropoulos-urology.gr"
    },
    {
      title: t('projects.underground.title'),
      description: t('projects.underground.description'),
      tags: [t('projects.underground.tags.website'), t('projects.underground.tags.branding'), t('projects.underground.tags.marketing360'), t('projects.underground.tags.products')],
      result: "Ενίσχυση παρουσίας παγκοσμίως στον χώρο της ηλεκτρονικής μουσικής και fashion προϊόντων",
      challenge: "Το brand ήθελε να ενισχύσει την παρουσία του παγκοσμίως στον χώρο της ηλεκτρονικής μουσικής και των fashion προϊόντων.",
      solution: "Δημιουργήσαμε επαγγελματικό website, αναπτύξαμε δυναμική ταυτότητα και εφαρμόσαμε ολιστική στρατηγική marketing με περιεχόμενο, προϊόντα και funnels.",
      metrics: [
        "10.000+ επισκέψεις/μήνα",
        "5.000+ πωλήσεις προϊόντων",
        "Top 80 παγκοσμίως στην κατηγορία",
        "Ανάπτυξη κοινού μέσω YouTube και direct traffic"
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
