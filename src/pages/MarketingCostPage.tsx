import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const MarketingCostPage: React.FC = () => {
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
            Πίσω
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Κατανόηση του Κόστους Μάρκετινγκ
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Η ερώτηση «Πόσο κοστίζει το μάρκετινγκ;» δεν έχει μία απλή απάντηση. Το κόστος εξαρτάται από το είδος της επιχείρησης, τους στόχους, τον ανταγωνισμό και τη στρατηγική που θα ακολουθηθεί. Σε αυτή την ενότητα, θα σας βοηθήσουμε να κατανοήσετε τι ακριβώς πληρώνετε, ποια κόστη είναι επένδυση και πώς να αξιολογείτε την απόδοση κάθε καμπάνιας.
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Τι περιλαμβάνει το κόστος μάρκετινγκ;</h2>
            <p className="text-gray-300 mb-4">
              Το μάρκετινγκ δεν είναι ένα μεμονωμένο πράγμα. Είναι ένας συνδυασμός από υπηρεσίες και ενέργειες, όπως:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Κατασκευή ή βελτιστοποίηση ιστοσελίδας</li>
              <li>SEO (Βελτιστοποίηση στις Μηχανές Αναζήτησης)</li>
              <li>Google & Meta Ads (πληρωμένες διαφημίσεις)</li>
              <li>Διαχείριση Social Media & Δημιουργία Περιεχομένου</li>
              <li>Email Marketing ή SMS Καμπάνιες</li>
              <li>Ανάλυση απόδοσης και βελτιστοποιήσεις</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Ο κάθε πυλώνας μπορεί να έχει διαφορετικό κόστος — ανάλογα με τη συχνότητα, την ποιότητα και το βάθος των υπηρεσιών.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Πώς καθορίζεται το συνολικό budget;</h2>
            <p className="text-gray-300 mb-4">
              Ένας βασικός κανόνας του κλάδου είναι ότι μια επιχείρηση αφιερώνει <strong className="text-pink-400">5% έως 15%</strong> του ετήσιου κύκλου εργασιών στο μάρκετινγκ — ανάλογα με το αν βρίσκεται σε φάση ανάπτυξης, σταθερότητας ή επέκτασης.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-3">Παραδείγματα:</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-black/40">
                    <th className="border border-white/20 p-3 text-left text-white">Ετήσιος Τζίρος</th>
                    <th className="border border-white/20 p-3 text-left text-white">Συντηρητικό Budget (5%)</th>
                    <th className="border border-white/20 p-3 text-left text-white">Επιθετικό Budget (15%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">€100.000</td>
                    <td className="border border-white/20 p-3 text-gray-300">€5.000/έτος ή €420/μήνα</td>
                    <td className="border border-white/20 p-3 text-gray-300">€15.000/έτος ή €1.250/μήνα</td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">€250.000</td>
                    <td className="border border-white/20 p-3 text-gray-300">€12.500/έτος</td>
                    <td className="border border-white/20 p-3 text-gray-300">€37.500/έτος</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-4 mt-4">
              <p className="text-pink-300 font-medium">
                <strong>Tip:</strong> Οι επιχειρήσεις που βλέπουν το μάρκετινγκ ως έξοδο, μένουν στάσιμες. Όσες το αντιμετωπίζουν ως επένδυση, αναπτύσσονται πιο σταθερά και με προβλέψιμη απόδοση.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Ποιες υπηρεσίες έχουν το καλύτερο ROI;</h2>
            <p className="text-gray-300 mb-4">
              Το ROI (Return on Investment) διαφέρει από επιχείρηση σε επιχείρηση. Ωστόσο:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">SEO</h4>
                <p className="text-gray-300 text-sm">Φέρνει οργανική επισκεψιμότητα και μειώνει μακροπρόθεσμα την ανάγκη για πληρωμένες διαφημίσεις.</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">Google Ads</h4>
                <p className="text-gray-300 text-sm">Δίνουν άμεσα αποτελέσματα, χρήσιμο για νέες επιχειρήσεις ή εποχιακές καμπάνιες.</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">Blog & Περιεχόμενο</h4>
                <p className="text-gray-300 text-sm">Χτίζει εμπιστοσύνη, SEO και επαναλαμβανόμενη επισκεψιμότητα.</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h4 className="font-bold text-pink-400 mb-2">Social Media</h4>
                <p className="text-gray-300 text-sm">Ιδανικά για αύξηση εμπλοκής, επανάληψη μηνύματος και διατήρηση σχέσης με το κοινό.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Πώς να αξιολογήσετε την απόδοση;</h2>
            <p className="text-gray-300 mb-4">
              Κανένα κόστος δεν έχει αξία χωρίς μέτρηση.
            </p>
            <p className="text-gray-300 mb-4">
              Ορίστε μερικά βασικά KPIs:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-black/40">
                    <th className="border border-white/20 p-3 text-left text-white">Στόχος</th>
                    <th className="border border-white/20 p-3 text-left text-white">Μετρήσιμο KPI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">Αύξηση επισκεψιμότητας</td>
                    <td className="border border-white/20 p-3 text-gray-300">Επισκέψεις / CTR / SEO ranking</td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">Αύξηση leads</td>
                    <td className="border border-white/20 p-3 text-gray-300">Φόρμες / τηλέφωνα / αιτήματα</td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">Πωλήσεις</td>
                    <td className="border border-white/20 p-3 text-gray-300">ROAS / Conversion Rate</td>
                  </tr>
                  <tr className="bg-black/20">
                    <td className="border border-white/20 p-3 text-gray-300">Branding</td>
                    <td className="border border-white/20 p-3 text-gray-300">Social Engagement / Mentions / Reach</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-300 mt-4">
              Ένα επαγγελματικό γραφείο μάρκετινγκ πρέπει να σας δείχνει αριθμούς, όχι απλά δημιουργικά.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Τελική σκέψη: Πληρώνετε για ανάπτυξη, όχι για «like»</h2>
            <p className="text-gray-300 mb-4">
              Μια έξυπνη στρατηγική μάρκετινγκ πρέπει:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li>Να φέρνει πραγματικό ενδιαφέρον</li>
              <li>Να ενισχύει τη μετατροπή επισκεπτών σε πελάτες</li>
              <li>Να σας ξεχωρίζει από τον ανταγωνισμό</li>
              <li>Να βασίζεται σε στοιχεία, όχι υποθέσεις</li>
            </ul>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <p className="text-purple-300 font-medium text-lg">
                Εάν όλα τα παραπάνω ευθυγραμμίζονται με τις υπηρεσίες που πληρώνετε, τότε δεν ξοδεύετε χρήματα, <strong className="text-pink-400">επενδύετε στρατηγικά</strong>.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Έχετε ερωτήσεις για το κόστος μάρκετινγκ;</h3>
            <p className="text-gray-300 mb-6">
              Κλείστε μια δωρεάν συμβουλευτική και θα σας βοηθήσουμε να κατανοήσετε τι ακριβώς χρειάζεστε.
            </p>
            <button
              onClick={() => (window as any).navigateToConsultation?.()}
              className="text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
            >
              Δωρεάν Συμβουλευτική
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCostPage;