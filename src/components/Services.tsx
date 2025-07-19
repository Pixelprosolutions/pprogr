import React from 'react';
import { Code, Palette, Globe, LineChart, Smartphone, Film } from 'lucide-react';

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
  const services = [
    {
      title: "Ανάπτυξη Ιστοτόπων",
      description: "Κατασκευάζουμε επαγγελματικούς ιστότοπους που είναι εύχρηστοι και σας βοηθούν να προσελκύσετε νέους πελάτες. Ένας καλά σχεδιασμένος ιστότοπος είναι η διαδικτυακή σας βιτρίνα.",
      icon: <Code className="h-8 w-8" />
    },
    {
      title: "Σχεδιασμός UI/UX",
      description: "Δημιουργούμε έξυπνες διεπαφές χρήστη και απρόσκοπτες εμπειρίες που διατηρούν τους επισκέπτες αφοσιωμένους και τους μετατρέπουν σε πελάτες.",
      icon: <Palette className="h-8 w-8" />
    },
    {
      title: "Λύσεις E-Commerce",
      description: "Σας βοηθάμε να πουλήσετε τα προϊόντα σας online με ασφαλείς και εύκολες στη διαχείριση λύσεις ηλεκτρονικού εμπορίου. Προσεγγίστε πελάτες πέρα από την τοπική σας περιοχή.",
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: "Ψηφιακό Μάρκετινγκ",
      description: "Κάνουμε την επιχείρησή σας να εμφανίζεται στο διαδίκτυο με στοχευμένες διαφημίσεις και καμπάνιες στα μέσα κοινωνικής δικτύωσης. Αφήστε μας να σας βοηθήσουμε να προσεγγίσετε τους σωστούς πελάτες.",
      icon: <LineChart className="h-8 w-8" />
    },
    {
      title: "Ανάπτυξη Mobile App",
      description: "Δημιουργούμε mobile apps που επιτρέπουν στους πελάτες σας να συνδεθούν μαζί σας εν κινήσει. Να είστε προσβάσιμοι στους πελάτες σας οποτεδήποτε, οπουδήποτε.",
      icon: <Smartphone className="h-8 w-8" />
    },
    {
      title: "Δημιουργικό Περιεχόμενο",
      description: "Παράγουμε ελκυστικό οπτικό περιεχόμενο, συμπεριλαμβανομένων βίντεο, animations και γραφικών που λένε την ιστορία της επωνυμίας σας και τραβούν την προσοχή.",
      icon: <Film className="h-8 w-8" />
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2">Πώς Βοηθάμε τις Τοπικές Επιχειρήσεις</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
            Προσφέρουμε μια σειρά υπηρεσιών που έχουν σχεδιαστεί για να βοηθήσουν την επιχείρησή σας να πετύχει στο διαδίκτυο.
          </p>
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
