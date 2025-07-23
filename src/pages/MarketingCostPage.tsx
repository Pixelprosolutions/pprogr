import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MarketingCostPage: React.FC = () => {
  const { t, language } = useLanguage();
  
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
            {language === 'en' ? 'Understanding Marketing Costs' : 'Κατανόηση του Κόστους Μάρκετινγκ'}
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {language === 'en' 
                ? 'The question "How much does marketing cost?" doesn\'t have a simple answer. The cost depends on the type of business, goals, competition, and strategy to be followed. In this section, we\'ll help you understand exactly what you\'re paying for, which costs are investments, and how to evaluate the performance of each campaign.'
                : 'Η ερώτηση «Πόσο κοστίζει το μάρκετινγκ;» δεν έχει μία απλή απάντηση. Το κόστος εξαρτάται από το είδος της επιχείρησης, τους στόχους, τον ανταγωνισμό και τη στρατηγική που θα ακολουθηθεί. Σε αυτή την ενότητα, θα σας βοηθήσουμε να κατανοήσετε τι ακριβώς πληρώνετε, ποια κόστη είναι επένδυση και πώς να αξιολογείτε την απόδοση κάθε καμπάνιας.'
              }
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '1. What does marketing cost include?' : '1. Τι περιλαμβάνει το κόστος μάρκετινγκ;'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'Marketing is not a single thing. It\'s a combination of services and actions, such as:'
                : 'Το μάρκετινγκ δεν είναι ένα μεμονωμένο πράγμα. Είναι ένας συνδυασμός από υπηρεσίες και ενέργειες, όπως:'
              }
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>{language === 'en' ? 'Website development or optimization' : 'Κατασκευή ή βελτιστοποίηση ιστοσελίδας'}</li>
              <li>{language === 'en' ? 'SEO (Search Engine Optimization)' : 'SEO (Βελτιστοποίηση στις Μηχανές Αναζήτησης)'}</li>
              <li>{language === 'en' ? 'Google & Meta Ads (paid advertising)' : 'Google & Meta Ads (πληρωμένες διαφημίσεις)'}</li>
              <li>{language === 'en' ? 'Social Media Management & Content Creation' : 'Διαχείριση Social Media & Δημιουργία Περιεχομένου'}</li>
              <li>{language === 'en' ? 'Email Marketing or SMS Campaigns' : 'Email Marketing ή SMS Καμπάνιες'}</li>
              <li>{language === 'en' ? 'Performance analysis and optimizations' : 'Ανάλυση απόδοσης και βελτιστοποιήσεις'}</li>
            </ul>
            <p className="text-gray-300 mt-4">
              {language === 'en'
                ? 'Each pillar can have different costs — depending on frequency, quality, and depth of services.'
                : 'Ο κάθε πυλώνας μπορεί να έχει διαφορετικό κόστος — ανάλογα με τη συχνότητα, την ποιότητα και το βάθος των υπηρεσιών.'
              }
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '2. How is the total budget determined?' : '2. Πώς καθορίζεται το συνολικό budget;'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'A basic industry rule is that a business dedicates 5% to 15% of annual revenue to marketing — depending on whether it\'s in a growth, stability, or expansion phase.'
                : 'Ένας βασικός κανόνας του κλάδου είναι ότι μια επιχείρηση αφιερώνει 5% έως 15% του ετήσιου κύκλου εργασιών στο μάρκετινγκ — ανάλογα με το αν βρίσκεται σε φάση ανάπτυξης, σταθερότητας ή επέκτασης.'
              }
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {language === 'en' ? 'Examples:' : 'Παραδείγματα:'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-black/40">
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Annual Revenue' : 'Ετήσιος Τζίρος'}
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Conservative Budget (5%)' : 'Συντηρητικό Budget (5%)'}
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Aggressive Budget (15%)' : 'Επιθετικό Budget (15%)'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">€100.000</td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '€5,000/year or €420/month' : '€5.000/έτος ή €420/μήνα'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '€15,000/year or €1,250/month' : '€15.000/έτος ή €1.250/μήνα'}
                    </td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">€250.000</td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '€12,500/year' : '€12.500/έτος'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? '€37,500/year' : '€37.500/έτος'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-4 mt-4">
              <p className="text-pink-300 font-medium">
                <strong>{language === 'en' ? 'Tip:' : 'Tip:'}</strong> {language === 'en'
                  ? 'Businesses that view marketing as an expense remain stagnant. Those that treat it as an investment grow more steadily with predictable returns.'
                  : 'Οι επιχειρήσεις που βλέπουν το μάρκετινγκ ως έξοδο, μένουν στάσιμες. Όσες το αντιμετωπίζουν ως επένδυση, αναπτύσσονται πιο σταθερά και με προβλέψιμη απόδοση.'
                }
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '3. Which services have the best ROI?' : '3. Ποιες υπηρεσίες έχουν το καλύτερο ROI;'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'ROI (Return on Investment) varies from business to business. However:'
                : 'Το ROI (Return on Investment) διαφέρει από επιχείρηση σε επιχείρηση. Ωστόσο:'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">
                  {language === 'en' ? 'SEO' : 'SEO'}
                </h4>
                <p className="text-gray-300 text-sm">
                  {language === 'en'
                    ? 'Brings organic traffic and reduces long-term need for paid advertising.'
                    : 'Φέρνει οργανική επισκεψιμότητα και μειώνει μακροπρόθεσμα την ανάγκη για πληρωμένες διαφημίσεις.'
                  }
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">
                  {language === 'en' ? 'Google Ads' : 'Google Ads'}
                </h4>
                <p className="text-gray-300 text-sm">
                  {language === 'en'
                    ? 'Provide immediate results, useful for new businesses or seasonal campaigns.'
                    : 'Δίνουν άμεσα αποτελέσματα, χρήσιμο για νέες επιχειρήσεις ή εποχιακές καμπάνιες.'
                  }
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">
                  {language === 'en' ? 'Blog & Content' : 'Blog & Περιεχόμενο'}
                </h4>
                <p className="text-gray-300 text-sm">
                  {language === 'en'
                    ? 'Builds trust, SEO, and repeat traffic.'
                    : 'Χτίζει εμπιστοσύνη, SEO και επαναλαμβανόμενη επισκεψιμότητα.'
                  }
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">
                  {language === 'en' ? 'Social Media' : 'Social Media'}
                </h4>
                <p className="text-gray-300 text-sm">
                  {language === 'en'
                    ? 'Ideal for increasing engagement, message repetition, and maintaining audience relationships.'
                    : 'Ιδανικά για αύξηση εμπλοκής, επανάληψη μηνύματος και διατήρηση σχέσης με το κοινό.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '4. How to evaluate performance?' : '4. Πώς να αξιολογήσετε την απόδοση;'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'No cost has value without measurement.'
                : 'Κανένα κόστος δεν έχει αξία χωρίς μέτρηση.'
              }
            </p>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'Define some basic KPIs:'
                : 'Ορίστε μερικά βασικά KPIs:'
              }
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-black/40">
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Goal' : 'Στόχος'}
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white">
                      {language === 'en' ? 'Measurable KPI' : 'Μετρήσιμο KPI'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Increase traffic' : 'Αύξηση επισκεψιμότητας'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Visits / CTR / SEO ranking' : 'Επισκέψεις / CTR / SEO ranking'}
                    </td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Increase leads' : 'Αύξηση leads'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Forms / calls / requests' : 'Φόρμες / τηλέφωνα / αιτήματα'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Sales' : 'Πωλήσεις'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'ROAS / Conversion Rate' : 'ROAS / Conversion Rate'}
                    </td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Branding' : 'Branding'}
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      {language === 'en' ? 'Social Engagement / Mentions / Reach' : 'Social Engagement / Mentions / Reach'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-300 mt-4">
              {language === 'en'
                ? 'A professional marketing agency should show you numbers, not just creative work.'
                : 'Ένα επαγγελματικό γραφείο μάρκετινγκ πρέπει να σας δείχνει αριθμούς, όχι απλά δημιουργικά.'
              }
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'en' ? '5. Final thought: You pay for growth, not for "likes"' : '5. Τελική σκέψη: Πληρώνετε για ανάπτυξη, όχι για «like»'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'A smart marketing strategy should:'
                : 'Μια έξυπνη στρατηγική μάρκετινγκ πρέπει:'
              }
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li>{language === 'en' ? 'Bring genuine interest' : 'Να φέρνει πραγματικό ενδιαφέρον'}</li>
              <li>{language === 'en' ? 'Enhance visitor-to-customer conversion' : 'Να ενισχύει τη μετατροπή επισκεπτών σε πελάτες'}</li>
              <li>{language === 'en' ? 'Differentiate you from competition' : 'Να σας ξεχωρίζει από τον ανταγωνισμό'}</li>
              <li>{language === 'en' ? 'Be based on data, not assumptions' : 'Να βασίζεται σε στοιχεία, όχι υποθέσεις'}</li>
            </ul>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <p className="text-purple-300 font-medium text-lg">
                {language === 'en'
                  ? 'If all of the above align with the services you\'re paying for, then you\'re not spending money, you\'re investing strategically.'
                  : 'Εάν όλα τα παραπάνω ευθυγραμμίζονται με τις υπηρεσίες που πληρώνετε, τότε δεν ξοδεύετε χρήματα, επενδύετε στρατηγικά.'
                } <strong className="text-pink-400">{language === 'en' ? '' : ''}</strong>
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'en' ? 'Have questions about marketing costs?' : 'Έχετε ερωτήσεις για το κόστος μάρκετινγκ;'}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'en'
                ? 'Book a free consultation and we\'ll help you understand exactly what you need.'
                : 'Κλείστε μια δωρεάν συμβουλευτική και θα σας βοηθήσουμε να κατανοήσετε τι ακριβώς χρειάζεστε.'
              }
            </p>
            <button
              onClick={() => (window as any).navigateToConsultation?.()}
              className="text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
            >
              {language === 'en' ? 'Free Consultation' : 'Δωρεάν Συμβουλευτική'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCostPage;
