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
      title: "Κατασκευή Ιστοσελίδων",
      description: "Κατασκευάζουμε επαγγελματικές ιστοσελίδες που φορτώνουν γρήγορα, λειτουργούν άψογα σε κινητά και έχουν σχεδιαστεί για να μετατρέπουν επισκέπτες σε πελάτες.",
      icon: <Code className="h-8 w-8" />
    },
    {
      title: "Κατασκευή E‑Shop",
      description: "Στήνουμε σύγχρονα ηλεκτρονικά καταστήματα, ασφαλή και εύκολα στη διαχείριση, με λειτουργίες πληρωμών, αποστολών και αποθέματος. Σας βοηθάμε να πουλάτε online σε ευρύτερο κοινό.",
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: "Branding",
      description: "Δημιουργούμε ολοκληρωμένες εταιρικές ταυτότητες με έμφαση στη συνοχή, την αναγνωρισιμότητα και τη στρατηγική διαφοροποίηση της επιχείρησής σας.",
      icon: <Palette className="h-8 w-8" />
    },
    {
      title: "Στρατηγικές Μάρκετινγκ",
      description: "Σχεδιάζουμε και υλοποιούμε marketing στρατηγικές που φέρνουν μετρήσιμα αποτελέσματα — από SEO και Google Ads μέχρι οργανικό περιεχόμενο και διαφημίσεις στα social media.",
      icon: <LineChart className="h-8 w-8" />
    },
    {
      title: "Κατασκευή Mobile App",
      description: "Αναπτύσσουμε mobile εφαρμογές για επιχειρήσεις που θέλουν να προσφέρουν υπηρεσίες, κρατήσεις ή προϊόντα μέσω κινητού, με εύχρηστο σχεδιασμό και γρήγορη απόκριση.",
      icon: <Smartphone className="h-8 w-8" />
    },
    {
      title: "Παραγωγή Περιεχομένου",
      description: "Παράγουμε επαγγελματικό περιεχόμενο, όπως βίντεο, γραφικά και φωτογραφίες, που αναδεικνύουν την επιχείρησή σας και ενισχύουν τη διαδικτυακή σας εικόνα.",
      icon: <Film className="h-8 w-8" />
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2">Πώς Βοηθάμε τις Τοπικές Επιχειρήσεις</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg px-4">
            Προσφέρουμε εξειδικευμένες υπηρεσίες που έχουν σχεδιαστεί για να βοηθήσουν την επιχείρησή σας να αναπτυχθεί στο διαδίκτυο.
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
