import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/80 to-black/90 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <button
            onClick={() => (window as any).navigateToHome?.()}
            className="flex items-center text-white hover:text-pink-400 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 py-2 px-4 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Back' : 'Πίσω'}
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Privacy Policy' : 'Πολιτική Απορρήτου'}
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
          
          {/* Introduction */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              {language === 'en'
                ? 'PixelPro Solutions is committed to protecting the privacy and personal data of its visitors and customers. This Privacy Policy describes how we collect, use, and protect your information.'
                : 'Η PixelPro Solutions δεσμεύεται να προστατεύει την ιδιωτικότητα και τα προσωπικά δεδομένα των επισκεπτών και πελατών της. Η παρούσα Πολιτική Απορρήτου περιγράφει πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.'
              }
            </p>
            <p className="text-gray-400 text-sm">
              <strong>{language === 'en' ? 'Last updated:' : 'Τελευταία ενημέρωση:'}</strong> {language === 'en' ? 'January 19, 2025' : '19 Ιανουαρίου 2025'}
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '1. Data Controller' : '1. Υπεύθυνος Επεξεργασίας'}
            </h2>
            <div className="text-gray-300 space-y-2">
              <p><strong>{language === 'en' ? 'Company:' : 'Επωνυμία:'}</strong> PixelPro Solutions</p>
              <p><strong>{language === 'en' ? 'Addresses:' : 'Διευθύνσεις:'}</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>DA16 3AP, London, United Kingdom</li>
                <li>60100, Katerini, Greece</li>
              </ul>
              <p><strong>{language === 'en' ? 'Contact email:' : 'Email επικοινωνίας:'}</strong> hello@pixelpro.solutions</p>
              <p><strong>{language === 'en' ? 'Phones:' : 'Τηλέφωνα:'}</strong> +44 20 8129 5829 (UK), +30 697 3517 695 (GR)</p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '2. What Data We Collect' : '2. Ποια Δεδομένα Συλλέγουμε'}
            </h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {language === 'en' ? '2.1 Data from Contact Forms' : '2.1 Δεδομένα από Φόρμες Επικοινωνίας'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'When you fill out the contact form or request free consultation, we collect:'
                : 'Όταν συμπληρώνετε τη φόρμα επικοινωνίας ή αιτείστε δωρεάν συμβουλευτική, συλλέγουμε:'
              }
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
              <li>{language === 'en' ? 'First and last name' : 'Όνομα και επώνυμο'}</li>
              <li>{language === 'en' ? 'Email address' : 'Διεύθυνση email'}</li>
              <li>{language === 'en' ? 'Phone number (optional)' : 'Αριθμό τηλεφώνου (προαιρετικό)'}</li>
              <li>{language === 'en' ? 'Company name (optional)' : 'Όνομα επιχείρησης (προαιρετικό)'}</li>
              <li>{language === 'en' ? 'Business website (optional)' : 'Ιστότοπο επιχείρησης (προαιρετικό)'}</li>
              <li>{language === 'en' ? 'Message and information about your needs' : 'Μήνυμα και πληροφορίες για τις ανάγκες σας'}</li>
              <li>{language === 'en' ? 'Selected services of interest' : 'Επιλεγμένες υπηρεσίες ενδιαφέροντος'}</li>
              <li>{language === 'en' ? 'Budget and timeline (optional)' : 'Προϋπολογισμό και χρονοδιάγραμμα (προαιρετικό)'}</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Αυτόματα Συλλεγόμενα Δεδομένα</h3>
            <p className="text-gray-300 mb-4">
              Μέσω του Google Analytics συλλέγουμε ανώνυμα στατιστικά στοιχεία:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Διεύθυνση IP (ανωνυμοποιημένη)</li>
              <li>Τύπο περιηγητή και λειτουργικού συστήματος</li>
              <li>Σελίδες που επισκέπτεστε και χρόνο παραμονής</li>
              <li>Πηγή επίσκεψης (π.χ. Google, άμεση επίσκεψη)</li>
              <li>Γεωγραφική τοποθεσία (σε επίπεδο πόλης/περιοχής)</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Σκοπός Επεξεργασίας</h2>
            <p className="text-gray-300 mb-4">
              Χρησιμοποιούμε τα προσωπικά σας δεδομένα για τους ακόλουθους σκοπούς:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Επικοινωνία:</strong> Για να απαντήσουμε στα αιτήματά σας και να προγραμματίσουμε συναντήσεις</li>
              <li><strong>Παροχή υπηρεσιών:</strong> Για να κατανοήσουμε τις ανάγκες σας και να προτείνουμε κατάλληλες λύσεις</li>
              <li><strong>Βελτίωση ιστοτόπου:</strong> Για να αναλύσουμε τη χρήση του ιστοτόπου και να βελτιώσουμε την εμπειρία χρήστη</li>
              <li><strong>Νομική συμμόρφωση:</strong> Για τήρηση των νομικών μας υποχρεώσεων</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Νομική Βάση Επεξεργασίας</h2>
            <p className="text-gray-300 mb-4">
              Η επεξεργασία των προσωπικών σας δεδομένων βασίζεται στις ακόλουθες νομικές βάσεις:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Συναίνεση:</strong> Όταν συμπληρώνετε εθελοντικά τις φόρμες επικοινωνίας</li>
              <li><strong>Έννομο συμφέρον:</strong> Για την ανάλυση της επισκεψιμότητας και βελτίωση των υπηρεσιών μας</li>
              <li><strong>Εκτέλεση σύμβασης:</strong> Όταν παρέχουμε τις υπηρεσίες που αιτηθήκατε</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Διατήρηση Δεδομένων</h2>
            <p className="text-gray-300 mb-4">
              Διατηρούμε τα προσωπικά σας δεδομένα για τον χρόνο που είναι απαραίτητος:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Δεδομένα φορμών:</strong> Έως 3 έτη από την τελευταία επικοινωνία</li>
              <li><strong>Στατιστικά Google Analytics:</strong> 26 μήνες (αυτόματη διαγραφή)</li>
              <li><strong>Δεδομένα πελατών:</strong> Σύμφωνα με τις νομικές υποχρεώσεις (συνήθως 5-7 έτη)</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Κοινοποίηση σε Τρίτους</h2>
            <p className="text-gray-300 mb-4">
              Δεν πωλούμε, ενοικιάζουμε ή μοιραζόμαστε τα προσωπικά σας δεδομένα με τρίτους, εκτός από:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Παρόχους υπηρεσιών:</strong> Supabase (φιλοξενία βάσης δεδομένων), Google Analytics</li>
              <li><strong>Νομικές υποχρεώσεις:</strong> Όταν απαιτείται από το νόμο</li>
              <li><strong>Προστασία δικαιωμάτων:</strong> Για προστασία των δικαιωμάτων, ιδιοκτησίας ή ασφάλειας</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Ασφάλεια Δεδομένων</h2>
            <p className="text-gray-300 mb-4">
              Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Κρυπτογράφηση SSL/TLS για όλες τις μεταδόσεις δεδομένων</li>
              <li>Ασφαλής φιλοξενία σε πιστοποιημένους παρόχους</li>
              <li>Περιορισμένη πρόσβαση μόνο σε εξουσιοδοτημένο προσωπικό</li>
              <li>Τακτικές δημιουργίες αντιγράφων ασφαλείας</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Τα Δικαιώματά Σας</h2>
            <p className="text-gray-300 mb-4">
              Σύμφωνα με τον GDPR, έχετε τα ακόλουθα δικαιώματα:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Πρόσβαση:</strong> Να ζητήσετε αντίγραφο των προσωπικών σας δεδομένων</li>
              <li><strong>Διόρθωση:</strong> Να διορθώσετε ανακριβή ή ελλιπή δεδομένα</li>
              <li><strong>Διαγραφή:</strong> Να ζητήσετε τη διαγραφή των δεδομένων σας</li>
              <li><strong>Περιορισμός:</strong> Να περιορίσετε την επεξεργασία των δεδομένων σας</li>
              <li><strong>Φορητότητα:</strong> Να λάβετε τα δεδομένα σας σε δομημένη μορφή</li>
              <li><strong>Αντίρρηση:</strong> Να αντιταχθείτε στην επεξεργασία</li>
              <li><strong>Ανάκληση συναίνεσης:</strong> Να ανακαλέσετε τη συναίνεσή σας ανά πάσα στιγμή</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies</h2>
            <p className="text-gray-300 mb-4">
              Ο ιστότοπός μας χρησιμοποιεί cookies μόνο για στατιστικούς σκοπούς μέσω του Google Analytics. 
              Για περισσότερες πληροφορίες, ανατρέξτε στην <button 
                onClick={() => (window as any).navigateToCookiePolicy?.()}
                className="text-pink-400 hover:text-pink-300 underline"
              >
                Πολιτική Cookies
              </button>.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Αλλαγές στην Πολιτική</h2>
            <p className="text-gray-300 mb-4">
              Διατηρούμε το δικαίωμα να τροποποιήσουμε την παρούσα Πολιτική Απορρήτου. 
              Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με ενημερωμένη ημερομηνία.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Επικοινωνία</h2>
            <p className="text-gray-300 mb-4">
              Για οποιεσδήποτε ερωτήσεις σχετικά με την παρούσα Πολιτική Απορρήτου ή για άσκηση των δικαιωμάτων σας, 
              μπορείτε να επικοινωνήσετε μαζί μας:
            </p>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4">
              <p className="text-gray-300 mb-2"><strong>Email:</strong> hello@pixelpro.solutions</p>
              <p className="text-gray-300 mb-2"><strong>Τηλέφωνο UK:</strong> +44 20 8129 5829</p>
              <p className="text-gray-300"><strong>Τηλέφωνο GR:</strong> +30 697 3517 695</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              {language === 'en'
                ? 'You also have the right to file a complaint with the competent Data Protection Authority.'
                : 'Έχετε επίσης το δικαίωμα να υποβάλετε καταγγελία στην αρμόδια Αρχή Προστασίας Δεδομένων.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;