import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CookiePolicyPage: React.FC = () => {
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
            {language === 'en' ? 'Cookie Policy' : 'Πολιτική Cookies'}
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
          
          {/* Introduction */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              {language === 'en'
                ? 'This Cookie Policy explains how PixelPro Solutions uses cookies and similar technologies on its website to improve user experience and analyze traffic.'
                : 'Η παρούσα Πολιτική Cookies εξηγεί πώς η PixelPro Solutions χρησιμοποιεί cookies και παρόμοιες τεχνολογίες στον ιστότοπό της για να βελτιώσει την εμπειρία χρήστη και να αναλύσει την επισκεψιμότητα.'
              }
            </p>
            <p className="text-gray-400 text-sm">
              <strong>{language === 'en' ? 'Last updated:' : 'Τελευταία ενημέρωση:'}</strong> {language === 'en' ? 'January 19, 2025' : '19 Ιανουαρίου 2025'}
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '1. What are Cookies' : '1. Τι είναι τα Cookies'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'Cookies are small text files that are stored on your device (computer, tablet, mobile) when you visit a website. They help the website "remember" your actions and preferences.'
                : 'Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας (υπολογιστή, tablet, κινητό) όταν επισκέπτεστε έναν ιστότοπο. Βοηθούν τον ιστότοπο να "θυμάται" τις ενέργειές σας και τις προτιμήσεις σας.'
              }
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '2. Which Cookies We Use' : '2. Ποια Cookies Χρησιμοποιούμε'}
            </h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {language === 'en' ? '2.1 Google Analytics Cookies' : '2.1 Cookies Google Analytics'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'We use Google Analytics to understand how visitors use our website. These cookies collect anonymous information such as:'
                : 'Χρησιμοποιούμε το Google Analytics για να κατανοήσουμε πώς οι επισκέπτες χρησιμοποιούν τον ιστότοπό μας. Αυτά τα cookies συλλέγουν ανώνυμες πληροφορίες όπως:'
              }
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
              <li>{language === 'en' ? 'Number of visitors' : 'Αριθμός επισκεπτών'}</li>
              <li>{language === 'en' ? 'Pages they visit' : 'Σελίδες που επισκέπτονται'}</li>
              <li>{language === 'en' ? 'Time spent on website' : 'Χρόνος παραμονής στον ιστότοπο'}</li>
              <li>{language === 'en' ? 'Visit source (e.g. Google, direct visit)' : 'Πηγή επίσκεψης (π.χ. Google, άμεση επίσκεψη)'}</li>
              <li>{language === 'en' ? 'Geographic location (city level)' : 'Γεωγραφική τοποθεσία (σε επίπεδο πόλης)'}</li>
            </ul>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-black/40">
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Cookie Name' : 'Όνομα Cookie'}
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Purpose' : 'Σκοπός'}
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Duration' : 'Διάρκεια'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">_ga</td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Distinguishes unique users' : 'Διακρίνει μοναδικούς χρήστες'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '2 years' : '2 έτη'}
                    </td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">_ga_*</td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Stores session state' : 'Αποθηκεύει κατάσταση συνεδρίας'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '2 years' : '2 έτη'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">_gid</td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Distinguishes unique users' : 'Διακρίνει μοναδικούς χρήστες'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '24 hours' : '24 ώρες'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '3. Cookie Categories' : '3. Κατηγορίες Cookies'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h4 className="font-bold text-white mb-3">
                  {language === 'en' ? 'Analytics Cookies' : 'Αναλυτικά Cookies'}
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>{language === 'en' ? 'Purpose:' : 'Σκοπός:'}</strong> {language === 'en' ? 'Statistics and usage analysis' : 'Στατιστικές και ανάλυση χρήσης'}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>{language === 'en' ? 'Provider:' : 'Πάροχος:'}</strong> Google Analytics
                </p>
                <p className="text-gray-300 text-sm">
                  <strong>{language === 'en' ? 'Category:' : 'Κατηγορία:'}</strong> {language === 'en' ? 'Non-essential' : 'Μη απαραίτητα'}
                </p>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-6">
                <h4 className="font-bold text-white mb-3">
                  {language === 'en' ? 'Functional Cookies' : 'Λειτουργικά Cookies'}
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>{language === 'en' ? 'Purpose:' : 'Σκοπός:'}</strong> {language === 'en' ? 'Basic website functionality' : 'Βασική λειτουργία ιστοτόπου'}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>{language === 'en' ? 'Provider:' : 'Πάροχος:'}</strong> PixelPro Solutions
                </p>
                <p className="text-gray-300 text-sm">
                  <strong>{language === 'en' ? 'Category:' : 'Κατηγορία:'}</strong> {language === 'en' ? 'Essential' : 'Απαραίτητα'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '4. Cookie Management' : '4. Διαχείριση Cookies'}
            </h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {language === 'en' ? '4.1 Browser Settings' : '4.1 Ρυθμίσεις Περιηγητή'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'You can control and delete cookies through your browser settings:'
                : 'Μπορείτε να ελέγξετε και να διαγράψετε cookies μέσω των ρυθμίσεων του περιηγητή σας:'
              }
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
              <li><strong>Chrome:</strong> {language === 'en' ? 'Settings → Privacy and security → Cookies' : 'Ρυθμίσεις → Απόρρητο και ασφάλεια → Cookies'}</li>
              <li><strong>Firefox:</strong> {language === 'en' ? 'Settings → Privacy and security → Cookies' : 'Ρυθμίσεις → Απόρρητο και ασφάλεια → Cookies'}</li>
              <li><strong>Safari:</strong> {language === 'en' ? 'Preferences → Privacy → Cookies' : 'Προτιμήσεις → Απόρρητο → Cookies'}</li>
              <li><strong>Edge:</strong> {language === 'en' ? 'Settings → Cookies and site permissions' : 'Ρυθμίσεις → Cookies και δικαιώματα ιστοτόπου'}</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">
              {language === 'en' ? '4.2 Opt-out Google Analytics' : '4.2 Opt-out Google Analytics'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'You can opt out of Google Analytics by installing the '
                : 'Μπορείτε να εξαιρεθείτε από το Google Analytics εγκαθιστώντας το '
              }
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline ml-1">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '5. Consent' : '5. Συναίνεση'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'By continuing to use our website, you agree to the use of cookies as described in this policy. You can withdraw your consent at any time through your browser settings.'
                : 'Συνεχίζοντας να χρησιμοποιείτε τον ιστότοπό μας, συμφωνείτε με τη χρήση των cookies όπως περιγράφεται σε αυτή την πολιτική. Μπορείτε να ανακαλέσετε τη συναίνεσή σας ανά πάσα στιγμή μέσω των ρυθμίσεων του περιηγητή σας.'
              }
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '6. Policy Changes' : '6. Αλλαγές στην Πολιτική'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'We may update this Cookie Policy occasionally. Changes will be posted on this page with an updated date.'
                : 'Ενδέχεται να ενημερώσουμε αυτή την Πολιτική Cookies περιστασιακά. Οι αλλαγές θα δημοσιεύονται σε αυτή τη σελίδα με ενημερωμένη ημερομηνία.'
              }
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '7. Contact' : '7. Επικοινωνία'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'For questions about cookie usage, contact us:'
                : 'Για ερωτήσεις σχετικά με τη χρήση cookies, επικοινωνήστε μαζί μας:'
              }
            </p>
            <div className="bg-black/40 border border-white/10 rounded-lg p-4">
              <p className="text-gray-300 mb-2"><strong>Email:</strong> hello@pixelpro.solutions</p>
              <p className="text-gray-300 mb-2"><strong>{language === 'en' ? 'Phone UK:' : 'Τηλέφωνο UK:'}</strong> +44 20 8129 5829</p>
              <p className="text-gray-300"><strong>{language === 'en' ? 'Phone GR:' : 'Τηλέφωνο GR:'}</strong> +30 697 3517 695</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'en' ? 'Questions about our cookie usage?' : 'Ερωτήσεις για τη χρήση cookies;'}
            </h3>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                {language === 'en'
                  ? 'Contact us for any questions about our privacy practices.'
                  : 'Επικοινωνήστε μαζί μας για οποιεσδήποτε ερωτήσεις σχετικά με τις πρακτικές απορρήτου μας.'
                }
              </p>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Αυτός ο ιστότοπος χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας και να αναλύσει την επισκεψιμότητα μέσω Google Analytics. 
                  Τα δεδομένα συλλέγονται ανώνυμα και δεν μοιράζονται με τρίτους. Συνεχίζοντας την περιήγηση, συμφωνείτε με τη χρήση cookies. 
                  <button className='text-pink-400 hover:text-pink-300 underline ml-1'>Μάθετε περισσότερα</button> | 
                  <button className='text-pink-400 hover:text-pink-300 underline ml-1'>Ρυθμίσεις</button>"
                </p>
              </div>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
                {language === 'en' ? 'Contact Us' : 'Επικοινωνήστε μαζί μας'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
