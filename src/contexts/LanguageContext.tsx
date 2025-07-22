import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.services': 'Υπηρεσίες',
    'nav.about': 'Σχετικά',
    'nav.projects': 'Έργα',
    'nav.pricing': 'Τιμές',
    'nav.contact': 'Επικοινωνία',
    'nav.consultation': 'Δωρεάν Συμβουλευτική',
    
    // Hero Section
    'hero.title.part1': 'Βοηθάμε Τοπικές Επιχειρήσεις να ',
    'hero.title.part2': 'Αναπτυχθούν Online',
    'hero.description': 'Δημιουργούμε ιστοσελίδες και στρατηγικό marketing που φέρνει νέους πελάτες, ενισχύει την εικόνα σας και μετατρέπει την online παρουσία σας σε επιχειρηματικό πλεονέκτημα.',
    'hero.cta.consultation': 'Δωρεάν Συμβουλευτική',
    'hero.cta.game': 'Σπατάλησε το Χρονο Σου',
    
    // Services Section
    'services.title': 'Πώς Βοηθάμε τις Τοπικές Επιχειρήσεις',
    'services.description': 'Προσφέρουμε εξειδικευμένες υπηρεσίες που έχουν σχεδιαστεί για να βοηθήσουν την επιχείρησή σας να αναπτυχθεί στο διαδίκτυο.',
    'services.website.title': 'Κατασκευή Ιστοσελίδων',
    'services.website.description': 'Κατασκευάζουμε επαγγελματικές ιστοσελίδες που φορτώνουν γρήγορα, λειτουργούν άψογα σε κινητά και έχουν σχεδιαστεί για να μετατρέπουν επισκέπτες σε πελάτες.',
    'services.eshop.title': 'Κατασκευή E‑Shop',
    'services.eshop.description': 'Στήνουμε σύγχρονα ηλεκτρονικά καταστήματα, ασφαλή και εύκολα στη διαχείριση, με λειτουργίες πληρωμών, αποστολών και αποθέματος. Σας βοηθάμε να πουλάτε online σε ευρύτερο κοινό.',
    'services.branding.title': 'Branding',
    'services.branding.description': 'Δημιουργούμε ολοκληρωμένες εταιρικές ταυτότητες με έμφαση στη συνοχή, την αναγνωρισιμότητα και τη στρατηγική διαφοροποίηση της επιχείρησής σας.',
    'services.marketing.title': 'Στρατηγικές Μάρκετινγκ',
    'services.marketing.description': 'Σχεδιάζουμε και υλοποιούμε marketing στρατηγικές που φέρνουν μετρήσιμα αποτελέσματα — από SEO και Google Ads μέχρι οργανικό περιεχόμενο και διαφημίσεις στα social media.',
    'services.mobile.title': 'Κατασκευή Mobile App',
    'services.mobile.description': 'Αναπτύσσουμε mobile εφαρμογές για επιχειρήσεις που θέλουν να προσφέρουν υπηρεσίες, κρατήσεις ή προϊόντα μέσω κινητού, με εύχρηστο σχεδιασμό και γρήγορη απόκριση.',
    'services.content.title': 'Παραγωγή Περιεχομένου',
    'services.content.description': 'Παράγουμε επαγγελματικό περιεχόμενο, όπως βίντεο, γραφικά και φωτογραφίες, που αναδεικνύουν την επιχείρησή σας και ενισχύουν τη διαδικτυακή σας εικόνα.',
    
    // Projects Section
    'projects.title': 'Έργα & Case Studies',
    'projects.description': 'Δείτε πώς βοηθήσαμε επιχειρήσεις στην Ελλάδα και διεθνώς να αναπτυχθούν ψηφιακά',
    
    // About Section
    'about.title': 'Σχετικά με Εμάς',
    'about.description.part1': 'Η PixelPro Solutions είναι μια δημιουργική ομάδα με έδρα την Ελλάδα και το Ηνωμένο Βασίλειο, αφιερωμένη στο να βοηθά τοπικές επιχειρήσεις να αναπτυχθούν ψηφιακά.',
    'about.description.part2': 'Με πάνω από 15 χρόνια εμπειρίας σε branding, ιστοσελίδες και στρατηγικές marketing, προσφέρουμε πρακτικές λύσεις που φέρνουν πραγματικά αποτελέσματα, όχι απλώς εντυπωσιακές εικόνες.',
    'about.description.part3': 'Δουλεύουμε στενά με κάθε πελάτη για να κατανοήσουμε εις βάθος την επιχείρηση, τον κλάδο και τις ανάγκες του. Από την πρώτη συμβουλευτική έως την τελική υλοποίηση, ο υπεύθυνος μας βρίσκεται δίπλα σας, ειδικά στην κρίσιμη φάση της ανάλυσης και στρατηγικού σχεδιασμού.',
    
    // Pricing Section
    'pricing.title': 'Πακέτα Υπηρεσιών PixelPro',
    'pricing.description': 'Επιλέξτε το πακέτο που ταιριάζει στην επιχειρησή σας και ενισχύστε την ψηφιακή σας παρουσία.',
    
    // Contact Section
    'contact.title': 'Επικοινωνήστε μαζί μας',
    'contact.follow': 'Ακολουθήστε μας',
    'contact.ready.title': 'Έτοιμοι να Ξεκινήσουμε;',
    'contact.ready.description': 'Επικοινωνήστε μαζί μας σήμερα και ας συζητήσουμε πώς μπορούμε να βοηθήσουμε την επιχείρησή σας να αναπτυχθεί στο διαδίκτυο.',
    'contact.direct': 'Ή επικοινωνήστε απευθείας:',
    
    // Video Section
    'video.title': 'Δείτε τη Δουλειά μας σε Δράση',
    'video.description': 'Παρακολουθήστε πώς βοηθάμε τις τοπικές επιχειρήσεις να μεταμορφώσουν την ψηφιακή τους παρουσία και να αυξήσουν την πελατειακή τους βάση.',
    
    // CTA Section
    'cta.title': 'Δεν είστε σίγουροι ποιες υπηρεσίες χρειάζεστε;',
    'cta.description': 'Κάθε επιχείρηση είναι μοναδική. Ας συζητήσουμε τους στόχους σας και θα σας προτείνουμε την καλύτερη στρατηγική για την ψηφιακή σας ανάπτυξη.',
    'cta.consultation': 'Δωρεάν Συμβουλευτική - 30 λεπτά',
    'cta.call': 'Καλέστε μας τώρα',
    'cta.note': 'Χωρίς δέσμευση • Απαντάμε εντός 24 ωρών',
    
    // Common
    'common.back': 'Πίσω',
    'common.loading': 'Φόρτωση...',
    'common.error': 'Σφάλμα',
    'common.success': 'Επιτυχία',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.consultation': 'Free Consultation',
    
    // Hero Section
    'hero.title.part1': 'We Help Local Businesses ',
    'hero.title.part2': 'Grow Online',
    'hero.description': 'We create websites and strategic marketing that brings new customers, strengthens your brand, and transforms your online presence into a business advantage.',
    'hero.cta.consultation': 'Free Consultation',
    'hero.cta.game': 'Waste Your Time',
    
    // Services Section
    'services.title': 'How We Help Local Businesses',
    'services.description': 'We offer specialized services designed to help your business grow online.',
    'services.website.title': 'Website Development',
    'services.website.description': 'We build professional websites that load fast, work flawlessly on mobile, and are designed to convert visitors into customers.',
    'services.eshop.title': 'E-Commerce Development',
    'services.eshop.description': 'We set up modern online stores that are secure and easy to manage, with payment, shipping, and inventory features. We help you sell online to a wider audience.',
    'services.branding.title': 'Branding',
    'services.branding.description': 'We create comprehensive corporate identities with emphasis on consistency, recognition, and strategic differentiation of your business.',
    'services.marketing.title': 'Marketing Strategies',
    'services.marketing.description': 'We design and implement marketing strategies that deliver measurable results — from SEO and Google Ads to organic content and social media advertising.',
    'services.mobile.title': 'Mobile App Development',
    'services.mobile.description': 'We develop mobile applications for businesses that want to offer services, bookings, or products via mobile, with user-friendly design and fast response.',
    'services.content.title': 'Content Production',
    'services.content.description': 'We produce professional content such as videos, graphics, and photos that showcase your business and enhance your online image.',
    
    // Projects Section
    'projects.title': 'Projects & Case Studies',
    'projects.description': 'See how we helped businesses in Greece and internationally grow digitally',
    
    // About Section
    'about.title': 'About Us',
    'about.description.part1': 'PixelPro Solutions is a creative team based in Greece and the United Kingdom, dedicated to helping local businesses grow digitally.',
    'about.description.part2': 'With over 15 years of experience in branding, websites, and marketing strategies, we offer practical solutions that deliver real results, not just impressive visuals.',
    'about.description.part3': 'We work closely with each client to understand their business, industry, and needs in depth. From the first consultation to final implementation, our manager is by your side, especially during the critical analysis and strategic planning phase.',
    
    // Pricing Section
    'pricing.title': 'PixelPro Service Packages',
    'pricing.description': 'Choose the package that fits your business and enhance your digital presence.',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.follow': 'Follow Us',
    'contact.ready.title': 'Ready to Get Started?',
    'contact.ready.description': 'Contact us today and let\'s discuss how we can help your business grow online.',
    'contact.direct': 'Or contact us directly:',
    
    // Video Section
    'video.title': 'See Our Work in Action',
    'video.description': 'Watch how we help local businesses transform their digital presence and increase their customer base.',
    
    // CTA Section
    'cta.title': 'Not sure which services you need?',
    'cta.description': 'Every business is unique. Let\'s discuss your goals and we\'ll suggest the best strategy for your digital growth.',
    'cta.consultation': 'Free Consultation - 30 minutes',
    'cta.call': 'Call Us Now',
    'cta.note': 'No commitment • We respond within 24 hours',
    
    // Common
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('el');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('pixelpro-language') as Language;
    if (savedLanguage && (savedLanguage === 'el' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('pixelpro-language', lang);
    
    // Update document language
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};