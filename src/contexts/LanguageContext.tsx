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
    
    // Pricing Section
    'pricing.title': 'Πακέτα Υπηρεσιών PixelPro',
    'pricing.description': 'Επιλέξτε το πακέτο που ταιριάζει στην επιχειρησή σας και ενισχύστε την ψηφιακή σας παρουσία.',
    'pricing.starter.name': 'Starter',
    'pricing.growth.name': 'Growth', 
    'pricing.dominance.name': 'Dominance',
    'pricing.month': '/μήνα',
    'pricing.select': 'Επιλέξτε το',
    'pricing.package': 'Πακέτο',
    'pricing.unsure': 'Δεν είστε σίγουροι; Δωρεάν Συμβουλευτική',
    'pricing.total': 'Σύνολο:',
    'pricing.cancel': 'Ακύρωση ανά πάσα στιγμή.',
    'pricing.faq.title': 'Συχνές Ερωτήσεις',
    
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
    
    // Projects - Individual project content
    'projects.voltbuild.title': 'VoltBuild – EV Charging Experts',
    'projects.voltbuild.description': 'voltbuild.gr - Κατασκευή Ιστοσελίδας · E-shop · SEO & Περιεχόμενο · Στρατηγική',
    'projects.voltbuild.tags.website': 'Κατασκευή Ιστοσελίδας',
    'projects.voltbuild.tags.eshop': 'E-shop',
    'projects.voltbuild.tags.seo': 'SEO & Περιεχόμενο',
    'projects.voltbuild.tags.strategy': 'Στρατηγική',
    
    'projects.naterra.title': 'Naterra – Home Renovations (UK)',
    'projects.naterra.description': 'naterra.uk - Branding · Κατασκευή Ιστοσελίδας · Digital Marketing Strategy',
    'projects.naterra.tags.branding': 'Branding',
    'projects.naterra.tags.website': 'Κατασκευή Ιστοσελίδας',
    'projects.naterra.tags.marketing': 'Digital Marketing Strategy',
    
    'projects.kts.title': 'KTS Woodart – Custom Carpentry (UK)',
    'projects.kts.description': 'ktswoodart.com - Κατασκευή Ιστοσελίδας · Rebranding · Digital Strategy · Social Media',
    'projects.kts.tags.website': 'Κατασκευή Ιστοσελίδας',
    'projects.kts.tags.rebranding': 'Rebranding',
    'projects.kts.tags.digital': 'Digital Strategy',
    'projects.kts.tags.social': 'Social Media',
    
    'projects.alex.title': 'Alex Alali – Digital Portfolio',
    'projects.alex.description': 'alexalali.com - One-page Ιστοσελίδα · Personal Branding · Παρουσίαση Case Studies',
    'projects.alex.tags.onepage': 'One-page Ιστοσελίδα',
    'projects.alex.tags.personal': 'Personal Branding',
    'projects.alex.tags.cases': 'Παρουσίαση Case Studies',
    
    'projects.sidiropoulos.title': 'Ιατρείο Σιδηρόπουλου – Ουρολογική Κλινική',
    'projects.sidiropoulos.description': 'sidiropoulos-urology.gr - Κατασκευή Ιστοσελίδας · Ιατρικό Περιεχόμενο · Δομή για SEO',
    'projects.sidiropoulos.tags.website': 'Κατασκευή Ιστοσελίδας',
    'projects.sidiropoulos.tags.medical': 'Ιατρικό Περιεχόμενο',
    'projects.sidiropoulos.tags.seo': 'Δομή για SEO',
    
    'projects.underground.title': 'Underground Talent – Music Media Brand (UK)',
    'projects.underground.description': 'undergroundtalent.co.uk - Κατασκευή Ιστοσελίδας · Branding · 360° Στρατηγική Marketing · Σχεδιασμός Προϊόντων',
    'projects.underground.tags.website': 'Κατασκευή Ιστοσελίδας',
    'projects.underground.tags.branding': 'Branding',
    'projects.underground.tags.marketing360': '360° Marketing',
    'projects.underground.tags.products': 'Σχεδιασμός Προϊόντων',
    
    'projects.buttons.more': 'Δείτε Περισσότερα',
    'projects.buttons.details': 'Λεπτομέρειες Έργου',
    'projects.buttons.less': 'Εμφάνιση Λιγότερων',
    'projects.challenge': 'Η Πρόκληση',
    'projects.solution': 'Η Λύση μας',
    'projects.results': 'Αποτελέσματα',
    
    // Pricing - Package features and details
    'pricing.starter.description': 'Για επιχειρήσεις που ξεκινούν την online προβολή τους',
    'pricing.growth.description': 'Για επιχειρήσεις που αναπτύσσονται και χρειάζονται σταθερή ψηφιακή παρουσία',
    'pricing.dominance.description': 'Για επιχειρήσεις που θέλουν να κυριαρχήσουν στον κλάδο τους',
    
    'pricing.features.website': 'Κατασκευή ιστοτόπου (έως 6 σελίδες)',
    'pricing.features.hosting': 'Φιλοξενία, ασφάλεια και τεχνική υποστήριξη',
    'pricing.features.seo': 'Βασική βελτιστοποίηση SEO',
    'pricing.features.social1': 'Διαχείριση social media ( 1 πλατφόρμα)',
    'pricing.features.posts8': '8 δημοσιεύσεις / 4 stories / 4 Carousel / 1 Video',
    'pricing.features.campaign1': 'Μία καμπάνια διαφήμισης (Meta ή Google)',
    'pricing.features.blog2': '2 άρθρα blog (SEO optimized) /μήνα',
    'pricing.features.revision1': '1 αναθεώρηση/μήνα',
    'pricing.features.report': 'Μηνιαία αναφορά απόδοσης',
    
    'pricing.budget.starter': 'από €150 /μήνα',
    'pricing.budget.growth': '€400–€700 /μήνα',
    'pricing.budget.dominance': '€1.000–€2.000+ /μήνα',
    'pricing.budget.note': '(δεν περιλαμβάνεται στο πακέτο)',
    'pricing.budget.recommended': 'Προτεινόμενο διαφημιστικό budget:',
    
    'pricing.note.title': 'Σημαντική Σημείωση',
    'pricing.note.content': 'Το διαφημιστικό budget (Meta ή Google Ads) καταβάλλεται ξεχωριστά και απευθείας στην εκάστοτε πλατφόρμα. Η ομάδα μας αναλαμβάνει τη διαχείριση και τη βελτιστοποίηση των καμπανιών με βάση τους στόχους της επιχείρησής σας.',
    
    'pricing.next.info': 'Επόμενο: Συμπληρώστε μια γρήγορη φόρμα ένταξης για να παράσχετε τις πληροφορίες που χρειαζόμαστε για να ξεκινήσουμε με τις επιλεγμένες υπηρεσίες σας.',
    
    // FAQ Questions and Answers
    'faq.q1': 'Δεν είμαι σίγουρος ποιες ενότητες χρειάζομαι. Μπορείτε να βοηθήσετε;',
    'faq.a1': 'Απολύτως! Προσφέρουμε μια δωρεάν συμβουλή για να συζητήσουμε τους επιχειρηματικούς σας στόχους και να προτείνουμε τις καλύτερες ενότητες για την επίτευξή τους. Θα αναλύσουμε την τρέχουσα διαδικτυακή σας παρουσία, θα εντοπίσουμε ευκαιρίες βελτίωσης και θα δημιουργήσουμε ένα προσαρμοσμένο σχέδιο προσαρμοσμένο στις συγκεκριμένες ανάγκες σας.',
    
    'faq.q2': 'Τι γίνεται αν χρειαστεί να ακυρώσω τη συνδρομή μου;',
    'faq.a2': 'Μπορείτε να ακυρώσετε τη συνδρομή σας ανά πάσα στιγμή, χωρίς ερωτήσεις. Πιστεύουμε στην απόκτηση της επιχείρησής σας κάθε μήνα και δεν θέλουμε να σας δεσμεύσουμε σε ένα μακροπρόθεσμο συμβόλαιο εάν οι υπηρεσίες μας δεν ανταποκρίνονται στις προσδοκίες σας. Απλώς ειδοποιήστε μας πριν από την επόμενη ημερομηνία χρέωσης και θα επεξεργαστούμε την ακύρωσή σας.',
    
    'faq.q3': 'Υπάρχουν κρυφές χρεώσεις ή μακροπρόθεσμα συμβόλαια;',
    'faq.a3': 'Όχι, δεν υπάρχουν κρυφές χρεώσεις ή μακροπρόθεσμα συμβόλαια. Η τιμολόγησή μας είναι διαφανής και απλή. Η μηνιαία τιμή που βλέπετε είναι η τιμή που πληρώνετε και μπορείτε να ακυρώσετε ανά πάσα στιγμή. Ωστόσο, ενδέχεται να ισχύουν πρόσθετες χρεώσεις για συγκεκριμένες υπηρεσίες — όπως ο διαφημιστικός προϋπολογισμός (δαπάνες διαφήμισης) και η χρήση API τρίτων.',
    
    'faq.q4': 'Πόσο γρήγορα θα δω αποτελέσματα;',
    'faq.a4': 'Το χρονοδιάγραμμα για την εμφάνιση αποτελεσμάτων ποικίλλει ανάλογα με τις ενότητες που επιλέγετε και την τρέχουσα κατάσταση της διαδικτυακής σας παρουσίας. Ωστόσο, οι περισσότεροι πελάτες αρχίζουν να βλέπουν θετικές αλλαγές μέσα στους πρώτους μήνες. Θα παρακολουθούμε στενά την πρόοδό σας και θα παρέχουμε τακτικές αναφορές για να σας κρατάμε ενήμερους.',
    
    'faq.q5': 'Τι γίνεται αν χρειάζομαι υποστήριξη ή έχω ερωτήσεις;',
    'faq.a5': 'Προσφέρουμε αποκλειστική υποστήριξη σε όλους τους πελάτες μας. Μπορείτε να επικοινωνήσετε μαζί μας μέσω email ή τηλεφώνου και θα απαντήσουμε άμεσα για να αντιμετωπίσουμε τις ερωτήσεις και τις ανησυχίες σας. Δεσμευόμαστε να παρέχουμε εξαιρετική εξυπηρέτηση πελατών και να διασφαλίσουμε ότι είστε απόλυτα ικανοποιημένοι με τις υπηρεσίες μας.',
    
    'faq.q6': 'Είμαι κάτοχος του περιεχομένου που δημιουργήθηκε για μένα;',
    'faq.a6': 'Ναι! Διατηρείτε την πλήρη κυριότητα όλου του περιεχομένου που δημιουργήθηκε για εσάς, συμπεριλαμβανομένου του κώδικα ιστότοπου, των σχεδίων, των άρθρων ιστολογίου, των δημοσιεύσεων στα μέσα κοινωνικής δικτύωσης και του διαφημιστικού κειμένου. Πιστεύουμε στην ενδυνάμωση των πελατών μας και στην παροχή ελέγχου των ψηφιακών τους στοιχείων.',
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
    
    // Pricing Section
    'pricing.title': 'PixelPro Service Packages',
    'pricing.description': 'Choose the package that fits your business and enhance your digital presence.',
    'pricing.starter.name': 'Starter',
    'pricing.growth.name': 'Growth',
    'pricing.dominance.name': 'Dominance', 
    'pricing.month': '/month',
    'pricing.select': 'Select the',
    'pricing.package': 'Package',
    'pricing.unsure': 'Not sure? Free Consultation',
    'pricing.total': 'Total:',
    'pricing.cancel': 'Cancel anytime.',
    'pricing.faq.title': 'Frequently Asked Questions',
    
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
    
    // Projects - Individual project content
    'projects.voltbuild.title': 'VoltBuild – EV Charging Experts',
    'projects.voltbuild.description': 'voltbuild.gr - Website Development · E-shop · SEO & Content · Strategy',
    'projects.voltbuild.tags.website': 'Website Development',
    'projects.voltbuild.tags.eshop': 'E-shop',
    'projects.voltbuild.tags.seo': 'SEO & Content',
    'projects.voltbuild.tags.strategy': 'Strategy',
    
    'projects.naterra.title': 'Naterra – Home Renovations (UK)',
    'projects.naterra.description': 'naterra.uk - Branding · Website Development · Digital Marketing Strategy',
    'projects.naterra.tags.branding': 'Branding',
    'projects.naterra.tags.website': 'Website Development',
    'projects.naterra.tags.marketing': 'Digital Marketing Strategy',
    
    'projects.kts.title': 'KTS Woodart – Custom Carpentry (UK)',
    'projects.kts.description': 'ktswoodart.com - Website Development · Rebranding · Digital Strategy · Social Media',
    'projects.kts.tags.website': 'Website Development',
    'projects.kts.tags.rebranding': 'Rebranding',
    'projects.kts.tags.digital': 'Digital Strategy',
    'projects.kts.tags.social': 'Social Media',
    
    'projects.alex.title': 'Alex Alali – Digital Portfolio',
    'projects.alex.description': 'alexalali.com - One-page Website · Personal Branding · Case Studies Showcase',
    'projects.alex.tags.onepage': 'One-page Website',
    'projects.alex.tags.personal': 'Personal Branding',
    'projects.alex.tags.cases': 'Case Studies Showcase',
    
    'projects.sidiropoulos.title': 'Sidiropoulos Clinic – Urology Practice',
    'projects.sidiropoulos.description': 'sidiropoulos-urology.gr - Website Development · Medical Content · SEO Structure',
    'projects.sidiropoulos.tags.website': 'Website Development',
    'projects.sidiropoulos.tags.medical': 'Medical Content',
    'projects.sidiropoulos.tags.seo': 'SEO Structure',
    
    'projects.underground.title': 'Underground Talent – Music Media Brand (UK)',
    'projects.underground.description': 'undergroundtalent.co.uk - Website Development · Branding · 360° Marketing Strategy · Product Design',
    'projects.underground.tags.website': 'Website Development',
    'projects.underground.tags.branding': 'Branding',
    'projects.underground.tags.marketing360': '360° Marketing',
    'projects.underground.tags.products': 'Product Design',
    
    'projects.buttons.more': 'View More',
    'projects.buttons.details': 'Project Details',
    'projects.buttons.less': 'Show Less',
    'projects.challenge': 'The Challenge',
    'projects.solution': 'Our Solution',
    'projects.results': 'Results',
    
    // Pricing - Package features and details
    'pricing.starter.description': 'For businesses starting their online presence',
    'pricing.growth.description': 'For growing businesses that need stable digital presence',
    'pricing.dominance.description': 'For businesses that want to dominate their industry',
    
    'pricing.features.website': 'Website development (up to 6 pages)',
    'pricing.features.hosting': 'Hosting, security and technical support',
    'pricing.features.seo': 'Basic SEO optimization',
    'pricing.features.social1': 'Social media management (1 platform)',
    'pricing.features.posts8': '8 posts / 4 stories / 4 Carousel / 1 Video',
    'pricing.features.campaign1': 'One advertising campaign (Meta or Google)',
    'pricing.features.blog2': '2 blog articles (SEO optimized) /month',
    'pricing.features.revision1': '1 revision/month',
    'pricing.features.report': 'Monthly performance report',
    
    'pricing.budget.starter': 'from €150 /month',
    'pricing.budget.growth': '€400–€700 /month',
    'pricing.budget.dominance': '€1,000–€2,000+ /month',
    'pricing.budget.note': '(not included in package)',
    'pricing.budget.recommended': 'Recommended advertising budget:',
    
    'pricing.note.title': 'Important Note',
    'pricing.note.content': 'The advertising budget (Meta or Google Ads) is paid separately and directly to each platform. Our team handles the management and optimization of campaigns based on your business goals.',
    
    'pricing.next.info': 'Next: Complete a quick onboarding form to provide the information we need to get started with your selected services.',
    
    // FAQ Questions and Answers
    'faq.q1': 'I\'m not sure which services I need. Can you help?',
    'faq.a1': 'Absolutely! We offer a free consultation to discuss your business goals and recommend the best services for achieving them. We\'ll analyze your current online presence, identify improvement opportunities, and create a customized plan tailored to your specific needs.',
    
    'faq.q2': 'What if I need to cancel my subscription?',
    'faq.a2': 'You can cancel your subscription at any time, no questions asked. We believe in earning your business every month and don\'t want to lock you into a long-term contract if our services don\'t meet your expectations. Simply notify us before your next billing date and we\'ll process your cancellation.',
    
    'faq.q3': 'Are there any hidden fees or long-term contracts?',
    'faq.a3': 'No, there are no hidden fees or long-term contracts. Our pricing is transparent and simple. The monthly price you see is what you pay, and you can cancel at any time. However, additional charges may apply for specific services — such as advertising budget (ad spend) and third-party API usage.',
    
    'faq.q4': 'How quickly will I see results?',
    'faq.a4': 'The timeline for seeing results varies depending on the services you choose and the current state of your online presence. However, most clients start seeing positive changes within the first few months. We\'ll closely monitor your progress and provide regular reports to keep you informed.',
    
    'faq.q5': 'What if I need support or have questions?',
    'faq.a5': 'We provide dedicated support to all our clients. You can reach out to us via email or phone, and we\'ll respond promptly to address your questions and concerns. We\'re committed to providing excellent customer service and ensuring you\'re completely satisfied with our services.',
    
    'faq.q6': 'Do I own the content created for me?',
    'faq.a6': 'Yes! You retain full ownership of all content created for you, including website code, designs, blog articles, social media posts, and ad copy. We believe in empowering our clients and providing control over their digital assets.',
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