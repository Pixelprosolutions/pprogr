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
    
    // Project Details - Individual project content
    'projects.voltbuild.challenge': 'Η VoltBuild χρειαζόταν έναν σύγχρονο ιστότοπο με SEO-first δομή για να ξεχωρίσει στον ταχέως αναπτυσσόμενο χώρο των φορτιστών EV στην Ελλάδα.',
    'projects.voltbuild.solution': 'Κατασκευάσαμε responsive website με λειτουργικό eshop, δημιουργήσαμε SEO σελίδες υπηρεσιών και αναπτύξαμε περιεχόμενο για οργανική ανάπτυξη.',
    'projects.voltbuild.result': 'Η VoltBuild ξεχώρισε στον ταχέως αναπτυσσόμενο χώρο των φορτιστών EV στην Ελλάδα',
    'projects.voltbuild.metrics.1': '300% αύξηση οργανικής επισκεψιμότητας',
    'projects.voltbuild.metrics.2': 'Πρώτες θέσεις στο Google για βασικές λέξεις-κλειδιά',
    'projects.voltbuild.metrics.3': 'Αύξηση εισερχόμενων leads και πωλήσεων',
    
    'projects.naterra.challenge': 'Η Naterra ήθελε να ενισχύσει την παρουσία της στο Λονδίνο και να ξεχωρίσει στον κλάδο των ανακαινίσεων.',
    'projects.naterra.solution': 'Δημιουργήσαμε brand ταυτότητα, σχεδιάσαμε επαγγελματικό ιστότοπο και βάλαμε τα θεμέλια για στοχευμένη digital στρατηγική.',
    'projects.naterra.result': 'Ενίσχυση της παρουσίας στο Λονδίνο και διαφοροποίηση στον κλάδο των ανακαινίσεων',
    'projects.naterra.metrics.1': 'Σύγχρονη, πλήρως responsive ιστοσελίδα',
    'projects.naterra.metrics.2': 'Σταθερή οργανική ανάπτυξη',
    'projects.naterra.metrics.3': 'Αύξηση αιτήσεων εργασιών μέσω website',
    
    'projects.kts.challenge': 'Η KTS Woodart, με έδρα το Λονδίνο, χρειαζόταν επαναπροσδιορισμό brand και online στρατηγική.',
    'projects.kts.solution': 'Αναπτύξαμε νέα οπτική ταυτότητα, responsive website και πλάνο ψηφιακής ανάπτυξης με εστίαση σε τοπικό κοινό και social media.',
    'projects.kts.result': 'Επαναπροσδιορισμός brand και online στρατηγική με εστίαση σε τοπικό κοινό',
    'projects.kts.metrics.1': 'Ολοκληρωμένο νέο brand με συνεκτική παρουσία',
    'projects.kts.metrics.2': 'Επαγγελματικό portfolio έργων',
    'projects.kts.metrics.3': 'Ενεργοποίηση οργανικής ροής πελατών',
    
    'projects.alex.challenge': 'Ο Alex Alali χρειαζόταν ένα επαγγελματικό ψηφιακό portfolio για να παρουσιάσει τις δεξιότητες και τα έργα του.',
    'projects.alex.solution': 'Κατασκευάστηκε minimal site με ξεκάθαρη παρουσίαση έργων και προτροπές για συνεργασία.',
    'projects.alex.result': 'Επαγγελματικό ψηφιακό portfolio για παρουσίαση δεξιοτήτων και έργων',
    'projects.alex.metrics.1': 'Ισχυρή επαγγελματική ταυτότητα',
    'projects.alex.metrics.2': 'Πλήρης παρουσίαση δεξιοτήτων & έργων',
    'projects.alex.metrics.3': 'Χρήση σε επαγγελματικές προσεγγίσεις',
    
    'projects.sidiropoulos.challenge': 'Το ιατρείο χρειαζόταν σύγχρονη παρουσία που να εμπνέει εμπιστοσύνη και να διευκολύνει την πρόσβαση των ασθενών σε πληροφορίες.',
    'projects.sidiropoulos.solution': 'Δημιουργήσαμε ιστοσελίδα με ξεκάθαρη δομή, ιατρικό περιεχόμενο και ενσωματωμένη φόρμα επικοινωνίας.',
    'projects.sidiropoulos.result': 'Σύγχρονη παρουσία που εμπνέει εμπιστοσύνη και διευκολύνει την πρόσβαση των ασθενών',
    'projects.sidiropoulos.metrics.1': '90% θετικό feedback από χρήστες',
    'projects.sidiropoulos.metrics.2': 'Μείωση ερωτήσεων μέσω τηλεφώνου',
    'projects.sidiropoulos.metrics.3': 'Καλύτερη θέση σε τοπικές αναζητήσεις',
    
    'projects.underground.challenge': 'Το brand ήθελε να ενισχύσει την παρουσία του παγκοσμίως στον χώρο της ηλεκτρονικής μουσικής και των fashion προϊόντων.',
    'projects.underground.solution': 'Δημιουργήσαμε επαγγελματικό website, αναπτύξαμε δυναμική ταυτότητα και εφαρμόσαμε ολιστική στρατηγική marketing με περιεχόμενο, προϊόντα και funnels.',
    'projects.underground.result': 'Ενίσχυση παρουσίας παγκοσμίως στον χώρο της ηλεκτρονικής μουσικής και fashion προϊόντων',
    'projects.underground.metrics.1': '10.000+ επισκέψεις/μήνα',
    'projects.underground.metrics.2': '5.000+ πωλήσεις προϊόντων',
    'projects.underground.metrics.3': 'Top 80 παγκοσμίως στην κατηγορία',
    'projects.underground.metrics.4': 'Ανάπτυξη κοινού μέσω YouTube και direct traffic',
    
    // Footer translations
    'footer.company.description': 'Μετατρέποντας τις ιδέες σε ψηφιακή πραγματικότητα μέσω καινοτόμων διαδικτυακών λύσεων και στρατηγικού ψηφιακού μάρκετινγκ.',
    'footer.services.title': 'Υπηρεσίες',
    'footer.services.website': 'Ανάπτυξη Ιστοτόπων',
    'footer.services.uiux': 'Σχεδιασμός UI/UX',
    'footer.services.ecommerce': 'Λύσεις E-Commerce',
    'footer.services.marketing': 'Ψηφιακό Μάρκετινγκ',
    'footer.services.mobile': 'Ανάπτυξη Mobile App',
    'footer.services.content': 'Δημιουργικό Περιεχόμενο',
    'footer.links.title': 'Γρήγοροι Σύνδεσμοι',
    'footer.links.home': 'Αρχική',
    'footer.links.about': 'Σχετικά με Εμάς',
    'footer.links.services': 'Υπηρεσίες',
    'footer.links.projects': 'Έργα',
    'footer.links.pricing': 'Τιμές',
    'footer.links.contact': 'Επικοινωνία',
    'footer.links.privacy': 'Πολιτική Απορρήτου',
    'footer.links.cookies': 'Πολιτική Cookies',
    'footer.contact.title': 'Επικοινωνήστε μαζί μας',
    'footer.copyright': 'Με επιφύλαξη παντός δικαιώματος.',
    
    // Contact page specific
    'contact.scroll.top': 'Πάμε στην κορυφή',
    
    // Consultation form translations
    'consultation.title': 'Δωρεάν Συμβουλευτική',
    'consultation.back': 'Πίσω',
    'consultation.form.title': 'Ας Γνωριστούμε!',
    'consultation.form.description': 'Συμπληρώστε τη φόρμα παρακάτω και θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να συζητήσουμε τις ανάγκες της επιχείρησής σας.',
    'consultation.form.name': 'Όνομα',
    'consultation.form.name.placeholder': 'Το όνομά σας',
    'consultation.form.email': 'Email',
    'consultation.form.email.placeholder': 'email@example.com',
    'consultation.form.phone': 'Τηλέφωνο',
    'consultation.form.phone.placeholder': '+30 210 1234567',
    'consultation.form.company': 'Επιχείρηση',
    'consultation.form.company.placeholder': 'Όνομα επιχείρησης',
    'consultation.form.website': 'Υπάρχων Ιστότοπος',
    'consultation.form.website.placeholder': 'https://www.example.com',
    'consultation.form.services': 'Ποιες υπηρεσίες σας ενδιαφέρουν;',
    'consultation.form.budget': 'Προϋπολογισμός',
    'consultation.form.budget.placeholder': 'Επιλέξτε προϋπολογισμό',
    'consultation.form.timeline': 'Χρονοδιάγραμμα',
    'consultation.form.timeline.placeholder': 'Επιλέξτε χρονοδιάγραμμα',
    'consultation.form.message': 'Πείτε μας περισσότερα για το έργο σας',
    'consultation.form.message.placeholder': 'Περιγράψτε τους στόχους σας, τις προκλήσεις που αντιμετωπίζετε, ή οτιδήποτε άλλο θα θέλατε να μας πείτε...',
    'consultation.form.submit': 'Στείλτε την Αίτηση',
    'consultation.form.submitting': 'Αποστολή...',
    'consultation.form.required': 'Υποχρεωτικά πεδία',
    
    // Tetris game translations
    'tetris.title': 'Παιχνίδι',
    'tetris.back': 'Πίσω',
    'tetris.score': 'Σκορ',
    'tetris.level': 'Επίπεδο',
    'tetris.lines': 'Γραμμές',
    'tetris.pause': 'Παύση',
    'tetris.continue': 'Συνέχεια Παιχνιδιού',
    'tetris.gameover': 'Game Over!',
    'tetris.finalscore': 'Τελικό Σκορ:',
    'tetris.newgame': 'Νέο Παιχνίδι',
    'tetris.quickdrop': 'Γρήγορη Πτώση',
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
    
    // Project Details - Individual project content
    'projects.voltbuild.challenge': 'VoltBuild needed a modern website with SEO-first structure to stand out in the rapidly developing EV charging space in Greece.',
    'projects.voltbuild.solution': 'We built a responsive website with functional eshop, created SEO service pages and developed content for organic growth.',
    'projects.voltbuild.result': 'VoltBuild stood out in the rapidly developing EV charging space in Greece',
    'projects.voltbuild.metrics.1': '300% increase in organic traffic',
    'projects.voltbuild.metrics.2': 'Top positions on Google for key keywords',
    'projects.voltbuild.metrics.3': 'Increase in incoming leads and sales',
    
    'projects.naterra.challenge': 'Naterra wanted to strengthen its presence in London and stand out in the renovation industry.',
    'projects.naterra.solution': 'We created brand identity, designed a professional website and laid the foundation for targeted digital strategy.',
    'projects.naterra.result': 'Strengthened presence in London and differentiation in the renovation industry',
    'projects.naterra.metrics.1': 'Modern, fully responsive website',
    'projects.naterra.metrics.2': 'Steady organic growth',
    'projects.naterra.metrics.3': 'Increase in work requests through website',
    
    'projects.kts.challenge': 'KTS Woodart, based in London, needed brand redefinition and online strategy.',
    'projects.kts.solution': 'We developed new visual identity, responsive website and digital development plan focusing on local audience and social media.',
    'projects.kts.result': 'Brand redefinition and online strategy focusing on local audience',
    'projects.kts.metrics.1': 'Complete new brand with consistent presence',
    'projects.kts.metrics.2': 'Professional project portfolio',
    'projects.kts.metrics.3': 'Activation of organic customer flow',
    
    'projects.alex.challenge': 'Alex Alali needed a professional digital portfolio to showcase his skills and projects.',
    'projects.alex.solution': 'A minimal site was built with clear project presentation and collaboration prompts.',
    'projects.alex.result': 'Professional digital portfolio for showcasing skills and projects',
    'projects.alex.metrics.1': 'Strong professional identity',
    'projects.alex.metrics.2': 'Complete presentation of skills & projects',
    'projects.alex.metrics.3': 'Use in professional approaches',
    
    'projects.sidiropoulos.challenge': 'The clinic needed a modern presence that inspires trust and facilitates patient access to information.',
    'projects.sidiropoulos.solution': 'We created a website with clear structure, medical content and integrated contact form.',
    'projects.sidiropoulos.result': 'Modern presence that inspires trust and facilitates patient access',
    'projects.sidiropoulos.metrics.1': '90% positive feedback from users',
    'projects.sidiropoulos.metrics.2': 'Reduction in phone inquiries',
    'projects.sidiropoulos.metrics.3': 'Better position in local searches',
    
    'projects.underground.challenge': 'The brand wanted to strengthen its presence globally in electronic music and fashion products.',
    'projects.underground.solution': 'We created a professional website, developed dynamic identity and implemented holistic marketing strategy with content, products and funnels.',
    'projects.underground.result': 'Strengthened presence globally in electronic music and fashion products',
    'projects.underground.metrics.1': '10,000+ visits/month',
    'projects.underground.metrics.2': '5,000+ product sales',
    'projects.underground.metrics.3': 'Top 80 globally in category',
    'projects.underground.metrics.4': 'Audience growth through YouTube and direct traffic',
    
    // Footer translations
    'footer.company.description': 'Transforming ideas into digital reality through innovative web solutions and strategic digital marketing.',
    'footer.services.title': 'Services',
    'footer.services.website': 'Website Development',
    'footer.services.uiux': 'UI/UX Design',
    'footer.services.ecommerce': 'E-Commerce Solutions',
    'footer.services.marketing': 'Digital Marketing',
    'footer.services.mobile': 'Mobile App Development',
    'footer.services.content': 'Creative Content',
    'footer.links.title': 'Quick Links',
    'footer.links.home': 'Home',
    'footer.links.about': 'About Us',
    'footer.links.services': 'Services',
    'footer.links.projects': 'Projects',
    'footer.links.pricing': 'Pricing',
    'footer.links.contact': 'Contact',
    'footer.links.privacy': 'Privacy Policy',
    'footer.links.cookies': 'Cookie Policy',
    'footer.contact.title': 'Contact Us',
    'footer.copyright': 'All rights reserved.',
    
    // Contact page specific
    'contact.scroll.top': 'Go to Top',
    
    // Consultation form translations
    'consultation.title': 'Free Consultation',
    'consultation.back': 'Back',
    'consultation.form.title': 'Let\'s Get Acquainted!',
    'consultation.form.description': 'Fill out the form below and we will contact you within 24 hours to discuss your business needs.',
    'consultation.form.name': 'Name',
    'consultation.form.name.placeholder': 'Your name',
    'consultation.form.email': 'Email',
    'consultation.form.email.placeholder': 'email@example.com',
    'consultation.form.phone': 'Phone',
    'consultation.form.phone.placeholder': '+44 20 1234567',
    'consultation.form.company': 'Company',
    'consultation.form.company.placeholder': 'Company name',
    'consultation.form.website': 'Existing Website',
    'consultation.form.website.placeholder': 'https://www.example.com',
    'consultation.form.services': 'Which services interest you?',
    'consultation.form.budget': 'Budget',
    'consultation.form.budget.placeholder': 'Select budget',
    'consultation.form.timeline': 'Timeline',
    'consultation.form.timeline.placeholder': 'Select timeline',
    'consultation.form.message': 'Tell us more about your project',
    'consultation.form.message.placeholder': 'Describe your goals, challenges you face, or anything else you\'d like to tell us...',
    'consultation.form.submit': 'Send Request',
    'consultation.form.submitting': 'Sending...',
    'consultation.form.required': 'Required fields',
    
    // Tetris game translations
    'tetris.title': 'Game',
    'tetris.back': 'Back',
    'tetris.score': 'Score',
    'tetris.level': 'Level',
    'tetris.lines': 'Lines',
    'tetris.pause': 'Pause',
    'tetris.continue': 'Continue Game',
    'tetris.gameover': 'Game Over!',
    'tetris.finalscore': 'Final Score:',
    'tetris.newgame': 'New Game',
    'tetris.quickdrop': 'Quick Drop',
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