import React, { useState } from 'react';
import { CheckCircle, Info, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const Pricing: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const packages = [
    {
      name: "Starter",
      price: 699,
      description: "Για επιχειρήσεις που ξεκινούν την online προβολή τους",
      features: [
        "Κατασκευή ιστοτόπου (έως 6 σελίδες)",
        "Φιλοξενία, ασφάλεια και τεχνική υποστήριξη",
        "Βασική βελτιστοποίηση SEO",
        "Διαχείριση social media (2 πλατφόρμες)",
        "8 δημοσιεύσεις / 4 stories",
        "Μία καμπάνια διαφήμισης (Meta ή Google)",
        "1 αναθεώρηση/μήνα",
        "Μηνιαία αναφορά απόδοσης"
      ],
      recommendedBudget: "από €150 /μήνα"
    },
    {
      name: "Growth",
      price: 1299,
      description: "Για επιχειρήσεις που αναπτύσσονται και χρειάζονται σταθερή ψηφιακή παρουσία",
      features: [
        "Προσαρμοσμένος ιστότοπος με απεριόριστες σελίδες",
        "Ενισχυμένο SEO και τοπική προβολή (GMB, κριτικές)",
        "Διαχείριση social media (4 πλατφόρμες)",
        "16 δημοσιεύσεις / 8 stories / 4 βίντεο",
        "Διαφημίσεις σε Meta και Google",
        "Στρατηγική, copywriting, A/B testing",
        "1 άρθρο blog (SEO optimized) /μήνα",
        "2 αναθεωρήσεις/μήνα",
        "Πίνακας ελέγχου απόδοσης"
      ],
      recommendedBudget: "€400–€700 /μήνα"
    },
    {
      name: "Dominance",
      price: 2299,
      description: "Για επιχειρήσεις που θέλουν να κυριαρχήσουν στον κλάδο τους",
      features: [
        "Premium ιστότοπος με προσαρμοσμένες λειτουργίες ή light e-shop",
        "Διαχείριση social media (6 πλατφόρμες, περιλαμβάνει TikTok, LinkedIn)",
        "30 δημοσιεύσεις / 15 stories / 8 βίντεο / carousel",
        "Full funnel διαφημιστική στρατηγική",
        "Retargeting, landing pages, conversion funnels",
        "2 άρθρα blog /μήνα",
        "4 αναθεωρήσεις/μήνα",
        "Αναλυτική αναφορά KPI & ROI",
        "Διευθυντής έργου για συνεχή υποστήριξη"
      ],
      recommendedBudget: "€1.000–€2.000+ /μήνα"
    }
  ];

  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const selectPackage = (packageName: string) => {
    setSelectedPackage(packageName === selectedPackage ? null : packageName);
  };

  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0;
    const pkg = packages.find(p => p.name === selectedPackage);
    return pkg ? pkg.price : 0;
  };

  const hasSelectedServices = () => {
    return selectedPackage !== null;
  };

  const faqItems: FAQItemProps[] = [
    {
      question: "Δεν είμαι σίγουρος ποιες ενότητες χρειάζομαι. Μπορείτε να βοηθήσετε;",
      answer: "Απολύτως! Προσφέρουμε μια δωρεάν συμβουλή για να συζητήσουμε τους επιχειρηματικούς σας στόχους και να προτείνουμε τις καλύτερες ενότητες για την επίτευξή τους. Θα αναλύσουμε την τρέχουσα διαδικτυακή σας παρουσία, θα εντοπίσουμε ευκαιρίες βελτίωσης και θα δημιουργήσουμε ένα προσαρμοσμένο σχέδιο προσαρμοσμένο στις συγκεκριμένες ανάγκες σας."
    },
    {
      question: "Τι γίνεται αν χρειαστεί να ακυρώσω τη συνδρομή μου;",
      answer: "Μπορείτε να ακυρώσετε τη συνδρομή σας ανά πάσα στιγμή, χωρίς ερωτήσεις. Πιστεύουμε στην απόκτηση της επιχείρησής σας κάθε μήνα και δεν θέλουμε να σας δεσμεύσουμε σε ένα μακροπρόθεσμο συμβόλαιο εάν οι υπηρεσίες μας δεν ανταποκρίνονται στις προσδοκίες σας. Απλώς ειδοποιήστε μας πριν από την επόμενη ημερομηνία χρέωσης και θα επεξεργαστούμε την ακύρωσή σας."
    },
    {
      question: "Υπάρχουν κρυφές χρεώσεις ή μακροπρόθεσμα συμβόλαια;",
      answer: "Όχι, δεν υπάρχουν κρυφές χρεώσεις ή μακροπρόθεσμα συμβόλαια. Η τιμολόγησή μας είναι διαφανής και απλή. Η μηνιαία τιμή που βλέπετε είναι η τιμή που πληρώνετε και μπορείτε να ακυρώσετε ανά πάσα στιγμή. Ωστόσο, ενδέχεται να ισχύουν πρόσθετες χρεώσεις για συγκεκριμένες υπηρεσίες — όπως ο διαφημιστικός προϋπολογισμός (δαπάνες διαφήμισης) και η χρήση API τρίτων."
    },
    {
      question: "Πόσο γρήγορα θα δω αποτελέσματα;",
      answer: "Το χρονοδιάγραμμα για την εμφάνιση αποτελεσμάτων ποικίλλει ανάλογα με τις ενότητες που επιλέγετε και την τρέχουσα κατάσταση της διαδικτυακής σας παρουσίας. Ωστόσο, οι περισσότεροι πελάτες αρχίζουν να βλέπουν θετικές αλλαγές μέσα στους πρώτους μήνες. Θα παρακολουθούμε στενά την πρόοδό σας και θα παρέχουμε τακτικές αναφορές για να σας κρατάμε ενήμερους."
    },
    {
      question: "Τι γίνεται αν χρειάζομαι υποστήριξη ή έχω ερωτήσεις;",
      answer: "Προσφέρουμε αποκλειστική υποστήριξη σε όλους τους πελάτες μας. Μπορείτε να επικοινωνήσετε μαζί μας μέσω email ή τηλεφώνου και θα απαντήσουμε άμεσα για να αντιμετωπίσουμε τις ερωτήσεις και τις ανησυχίες σας. Δεσμευόμαστε να παρέχουμε εξαιρετική εξυπηρέτηση πελατών και να διασφαλίσουμε ότι είστε απόλυτα ικανοποιημένοι με τις υπηρεσίες μας."
    },
    {
      question: "Είμαι κάτοχος του περιεχομένου που δημιουργήθηκε για μένα;",
      answer: "Ναι! Διατηρείτε την πλήρη κυριότητα όλου του περιεχομένου που δημιουργήθηκε για εσάς, συμπεριλαμβανομένου του κώδικα ιστότοπου, των σχεδίων, των άρθρων ιστολογίου, των δημοσιεύσεων στα μέσα κοινωνικής δικτύωσης και του διαφημιστικού κειμένου. Πιστεύουμε στην ενδυνάμωση των πελατών μας και στην παροχή ελέγχου των ψηφιακών τους στοιχείων."
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => (prev === index ? null : index));
  };

  return (
    <section id="pricing" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">Πακέτα Υπηρεσιών PixelPro</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
            Επιλέξτε το πακέτο που ταιριάζει στην επιχειρησή σας και ενισχύστε την ψηφιακή σας παρουσία.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 transition-all duration-300 ${
                  selectedPackage === pkg.name
                    ? 'border-accent-500 bg-accent-500/20'
                    : 'border-white/10 hover:border-white/30'
                }`}
                onClick={() => selectPackage(pkg.name)}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="text-xl md:text-2xl font-bold text-white">€{pkg.price}<span className="text-sm font-normal">/μήνα</span></div>
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{pkg.description}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#f43f5e] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gray-400">
                  Προτεινόμενο διαφημιστικό budget: {pkg.recommendedBudget}
                  <br />
                  (δεν περιλαμβάνεται στο πακέτο)
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8 relative">
            <h3 className="text-xl md:text-2xl font-bold text-white inline-flex items-center justify-center flex-wrap">
              Σύνολο: €{calculateTotalPrice()} /μήνα
              <span 
                className="relative inline-block"
                onMouseEnter={() => setShowDisclaimer(true)}
                onMouseLeave={() => setShowDisclaimer(false)}
              >
                <Info className="h-4 w-4 ml-1 text-gray-400 hover:text-gray-300 cursor-pointer" />
                {showDisclaimer && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-md p-2 text-sm text-gray-300 w-64 z-10 max-w-[90vw]">
                    Δεν υπάρχουν κρυφές χρεώσεις. Ωστόσο, ενδέχεται να ισχύουν πρόσθετες χρεώσεις για συγκεκριμένες υπηρεσίες — όπως ο διαφημιστικός προϋπολογισμός (δαπάνες διαφήμισης) και η χρήση API τρίτων. <a href="#" className="text-rose-400 hover:text-rose-300">Για μια πλήρη ανάλυση, ανατρέξτε στην ενότητα Κατανόηση του Κόστους Μάρκετινγκ</a>
                  </div>
                )}
              </span>
            </h3>
            <p className="text-gray-400 text-xs mt-1">Ακύρωση ανά πάσα στιγμή.</p>
          </div>

          <div className="flex flex-col justify-center gap-4 mt-6 md:mt-8">
            {/* Buy Button - Only enabled when services are selected */}
            <button 
              className={`px-6 py-4 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive text-sm md:text-base ${
                hasSelectedServices() 
                  ? '' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!hasSelectedServices()}
              onClick={() => hasSelectedServices() && (window as any).navigateToPackageSelection?.()}
            >
              Επιλέξτε το {selectedPackage} Πακέτο
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            {/* Consultation Button - For those who don't know what they need */}
            <button 
              className="px-6 py-4 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive text-sm md:text-base"
              onClick={() => (window as any).navigateToConsultation?.()}
            >
              Δεν είστε σίγουροι; Δωρεάν Συμβουλευτική
            </button>
          </div>
          
          {/* Additional information for the Buy button */}
          {hasSelectedServices() && (
            <div className="mt-4 text-center text-xs md:text-sm text-gray-400 px-2">
              Επόμενο: Συμπληρώστε μια γρήγορη φόρμα ένταξης για να παράσχετε τις πληροφορίες που χρειαζόμαστε για να ξεκινήσουμε με τις επιλεγμένες υπηρεσίες σας.
            </div>
          )}
        </div>

        {/* Important Note Section */}
        <div className="mt-6 md:mt-8 relative bg-red-500/60 backdrop-blur-lg border border-red-500/20 rounded-xl p-4 md:p-6 shadow-lg shadow-red-500/10 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          {/* Inner glow effects for ice-like depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-xl pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 via-white/8 to-transparent rounded-t-xl pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/15 via-white/5 to-transparent rounded-l-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-white/12 to-transparent rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-red-300/10 to-transparent rounded-bl-xl pointer-events-none"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent rounded-xl pointer-events-none animate-pulse"></div>
          
          {/* Content with relative positioning */}
          <div className="relative z-10">
          <h4 className="text-base md:text-lg font-semibold text-white mb-2 drop-shadow-sm">Σημαντική Σημείωση</h4>
          <p className="text-gray-100 text-sm md:text-base drop-shadow-sm leading-relaxed">
            Το διαφημιστικό budget (Meta ή Google Ads) καταβάλλεται ξεχωριστά και απευθείας στην εκάστοτε πλατφόρμα.
            Η ομάδα μας αναλαμβάνει τη διαχείριση και τη βελτιστοποίηση των καμπανιών με βάση τους στόχους της επιχείρησής σας.
          </p>
          <p className="text-gray-100 mt-3 text-sm md:text-base drop-shadow-sm leading-relaxed">
            Ειδικές Ανάγκες; Προσφέρουμε και προσαρμοσμένα πακέτα για SEO, περιεχόμενο, email marketing, e-shop ή συμβουλευτική στρατηγικής.
          </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-32">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center px-2">Συχνές Ερωτήσεις</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/30 hover:bg-black/40 mx-2">
                <button 
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center text-white font-medium text-sm md:text-base"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  {expandedFAQ === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                <div className={`p-4 md:p-6 pt-0 text-gray-300 text-sm md:text-base ${expandedFAQ === index ? 'block' : 'hidden'}`}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
