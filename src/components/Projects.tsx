import React from 'react';
import { ExternalLink } from 'lucide-react';

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
                className="bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-1 px-3 rounded-lg text-sm backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center"
                style={{ 
                  backgroundColor: 'rgba(244, 63, 94, 0.5)',
                  boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.1), 0 4px 6px -4px rgba(244, 63, 94, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.7)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(244, 63, 94, 0.2), 0 4px 6px -4px rgba(244, 63, 94, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(244, 63, 94, 0.1), 0 4px 6px -4px rgba(244, 63, 94, 0.1)';
                }}
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
                className="bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(244, 63, 94, 0.5)',
                  boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.1), 0 4px 6px -4px rgba(244, 63, 94, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.7)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(244, 63, 94, 0.2), 0 4px 6px -4px rgba(244, 63, 94, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(244, 63, 94, 0.1), 0 4px 6px -4px rgba(244, 63, 94, 0.1)';
                }}
              >
                Δείτε Περισσότερα
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 text-sm"
            >
              {isExpanded ? "Εμφάνιση Λιγότερων" : "Λεπτομέρειες Έργου"}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-6">
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">Η Πρόκληση</h4>
                <p className="text-gray-300/80">{challenge}</p>
              </div>
              
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">Η Λύση μας</h4>
                <p className="text-gray-300/80">{solution}</p>
              </div>
              
              <div className="bg-black/40 p-6 rounded-lg">
                <h4 className="text-white font-bold text-xl mb-3">Αποτελέσματα</h4>
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
  const projects = [
    {
      title: "VoltBuild – EV Charging Experts",
      description: "voltbuild.gr - Κατασκευή Ιστοσελίδας · E-shop · SEO & Περιεχόμενο · Στρατηγική",
      tags: ["Κατασκευή Ιστοσελίδας", "E-shop", "SEO & Περιεχόμενο", "Στρατηγική"],
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
      title: "Naterra – Home Renovations (UK)",
      description: "naterra.uk - Branding · Κατασκευή Ιστοσελίδας · Digital Marketing Strategy",
      tags: ["Branding", "Κατασκευή Ιστοσελίδας", "Digital Marketing Strategy"],
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
      title: "KTS Woodart – Custom Carpentry (UK)",
      description: "ktswoodart.com - Κατασκευή Ιστοσελίδας · Rebranding · Digital Strategy · Social Media",
      tags: ["Κατασκευή Ιστοσελίδας", "Rebranding", "Digital Strategy", "Social Media"],
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
      title: "Alex Alali – Digital Portfolio",
      description: "alexlali.com - One-page Ιστοσελίδα · Personal Branding · Παρουσίαση Case Studies",
      tags: ["One-page Ιστοσελίδα", "Personal Branding", "Παρουσίαση Case Studies"],
      result: "Επαγγελματικό ψηφιακό portfolio για παρουσίαση δεξιοτήτων και έργων",
      challenge: "Ο Alex Alali χρειαζόταν ένα επαγγελματικό ψηφιακό portfolio για να παρουσιάσει τις δεξιότητες και τα έργα του.",
      solution: "Κατασκευάστηκε minimal site με ξεκάθαρη παρουσίαση έργων και προτροπές για συνεργασία.",
      metrics: [
        "Ισχυρή επαγγελματική ταυτότητα",
        "Πλήρης παρουσίαση δεξιοτήτων & έργων",
        "Χρήση σε επαγγελματικές προσεγγίσεις"
      ],
      websiteUrl: "https://alexlali.com"
    },
    {
      title: "Ιατρείο Σιδηρόπουλου – Ουρολογική Κλινική",
      description: "sidiropoulos-urology.gr - Κατασκευή Ιστοσελίδας · Ιατρικό Περιεχόμενο · Δομή για SEO",
      tags: ["Κατασκευή Ιστοσελίδας", "Ιατρικό Περιεχόμενο", "Δομή για SEO"],
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
      title: "Underground Talent – Music Media Brand (UK)",
      description: "undergroundtalent.co.uk - Κατασκευή Ιστοσελίδας · Branding · 360° Στρατηγική Marketing · Σχεδιασμός Προϊόντων",
      tags: ["Κατασκευή Ιστοσελίδας", "Branding", "360° Marketing", "Σχεδιασμός Προϊόντων"],
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #c084fc, #f43f5e)' }}>
            Έργα & Μελέτες Περίπτωσης
          </h2>
          <p className="text-gray-300/80 text-xl md:text-2xl max-w-3xl mx-auto">
            Δείτε πώς βοηθήσαμε επιχειρήσεις στην Ελλάδα και διεθνώς να αναπτυχθούν ψηφιακά
          </p>
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
