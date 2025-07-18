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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  result,
  challenge,
  solution,
  metrics = []
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10 p-8 h-full">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-300/80 text-xl leading-relaxed mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-1 px-3 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center"
          >
            {isExpanded ? "Εμφάνιση Λιγότερων" : "Δείτε Περισσότερα"}
            <ExternalLink className="ml-2 h-4 w-4" />
          </button>

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
                      <div key={i} className="bg-pink-500/10 p-3 rounded-lg border border-pink-500/20">
                        <p className="text-pink-400 text-sm">{metric}</p>
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
      title: "VoltBuild – EV Charging Solutions",
      description: "Σύγχρονη ψηφιακή παρουσία για κορυφαίο πάροχο φορτιστών ηλεκτρικών οχημάτων στην Ελλάδα.",
      tags: ["Ιστότοπος", "E-shop", "SEO", "Ελληνική Αγορά"],
      result: "VoltBuild αναδείχθηκε ως κορυφαίος πάροχος φορτιστών EV στην Ελλάδα με διεθνή αναγνώριση",
      challenge: "Η VoltBuild χρειαζόταν μια σύγχρονη ψηφιακή παρουσία που θα αντανακλούσε την επαγγελματική προσέγγισή τους στον τομέα της ηλεκτρικής κίνησης και θα προσελκύει διεθνή ενδιαφέρον.",
      solution: "Ανασχεδιάσαμε τον ιστότοπο με πλήρη ελληνική και αγγλική έκδοση, υλοποιήσαμε SEO στρατηγική για διεθνή αγορά, δημιουργήσαμε e-shop με πολυγλωσσική υποστήριξη.",
      metrics: [
        "300% αύξηση online πωλήσεων",
        "Top 1 σε αναζητήσεις EV φορτιστών",
        "40% διεθνείς πελάτες"
      ]
    },
    {
      title: "Naterra – Home Renovations",
      description: "Επαγγελματική ψηφιακή στρατηγική για εταιρεία ανακαινίσεων κατοικιών στο Λονδίνο.",
      tags: ["Ιστότοπος", "Marketing", "Branding"],
      result: "Ενίσχυση της ψηφιακής παρουσίας στο Ηνωμένο Βασίλειο",
      challenge: "Η Naterra χρειαζόταν ολοκληρωμένη ψηφιακή στρατηγική για να προωθήσει τις υπηρεσίες ανακαινίσεων κατοικιών στο Λονδίνο.",
      solution: "Παρέχαμε πλήρες πακέτο marketing: ιστοσελίδα, SEO, διαφημίσεις, branding και τοπική προβολή.",
      metrics: [
        "50+ νέες εργασίες το μήνα",
        "Top 3 σε αναζητήσεις ανακαινίσεων"
      ]
    },
    {
      title: "KTS Woodart – Ξυλουργική Τέχνη",
      description: "Ψηφιακή ταυτότητα για εργαστήρι ξυλουργικής με έμφαση στη χειροποίητη τέχνη.",
      tags: ["Branding", "Storytelling", "SEO"],
      result: "Αύξηση της αναγνωρισιμότητας για τις χειροποίητες κατασκευές ξύλου",
      challenge: "Η KTS Woodart χρειαζόταν να αναδείξει την τέχνη και την ποιότητα των ξυλουργικών της κατασκευών μέσω ψηφιακών καναλιών.",
      solution: "Από το μηδέν: δημιουργήσαμε branding, storytelling, κατασκευάσαμε website και υλοποιήσαμε τοπική SEO στρατηγική.",
      metrics: [
        "200% αύξηση επικοινωνιών",
        "30+ custom παραγγελίες μηνιαίως"
      ]
    },
    {
      title: "Alex Alali – Digital Portfolio",
      description: "Επαγγελματικό portfolio για ψηφιακό στρατηγό με έμφαση στην παρουσίαση έργων.",
      tags: ["Portfolio", "Digital CV", "Branding"],
      result: "Επαγγελματική παρουσίαση έργων & εξειδίκευσης",
      challenge: "Ο Alex Alali χρειαζόταν μια σαφής και επαγγελματική ψηφιακή παρουσία για να προβάλει τις δεξιότητες και τα έργα του.",
      solution: "Σχεδιάσαμε ένα προσωπικό online portfolio και βιογραφικό με επικέντρωση στη σαφή παρουσίαση έργων & εξειδίκευσης.",
      metrics: [
        "5 νέες συνεργασίες",
        "Top 1% στο Behance"
      ]
    },
    {
      title: "Ιατρείο Σιδηρόπουλου",
      description: "Σύγχρονη ιστοσελίδα για ουρολογικό ιατρείο με έμφαση στην αξιοπιστία και προσβασιμότητα.",
      tags: ["Ιστότοπος", "Ιατρικές Πληροφορίες", "Accessibility"],
      result: "Επαγγελματική παρουσία για ιατρείο στη Βόρεια Ελλάδα",
      challenge: "Το ιατρείο χρειαζόταν μια καθαρή, επαγγελματική ιστοσελίδα που θα έδινε αξιοπιστία και εύκολη πρόσβαση σε πληροφορίες.",
      solution: "Δημιουργήσαμε μια ιστοσελίδα με εστίαση στη δομή, την προσβασιμότητα και τις ιατρικές πληροφορίες.",
      metrics: [
        "40% μείωση τηλεφωνικών ερωτήσεων",
        "90% θετικά σχόλια ασθενών"
      ]
    },
    {
      title: "Underground Talent – Music Label",
      description: "Δυναμική ψηφιακή εμπειρία για δισκογραφική εταιρεία ηλεκτρονικής μουσικής.",
      tags: ["Ιστότοπος", "Music", "Mobile-first"],
      result: "Βελτιωμένη εμπειρία για fans ηλεκτρονικής μουσικής",
      challenge: "Το Underground Talent χρειαζόταν μια δυναμική ψηφιακή παρουσία που θα αντανακλούσε την ταυτότητα του label και θα εξυπηρετούσε τους fans.",
      solution: "Αναπτύξαμε ένα website με focus σε καλλιτέχνες, δισκογραφία και mobile-first εμπειρία.",
      metrics: [
        "10.000+ μηνιαίες επισκέψεις",
        "50% αύξηση streams"
      ]
    }
  ];

  return (
    <section id="projects" className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
