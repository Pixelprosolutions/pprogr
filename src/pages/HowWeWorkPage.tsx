import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowWeWorkPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <main className="pt-32 pb-32">
      <div className="container mx-auto px-4 mb-28">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">Πώς Δουλεύουμε</h1>
        <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-center">
          Η αποδεδειγμένη διαδικασία μας διασφαλίζει ότι παρέχουμε εξαιρετικά αποτελέσματα για κάθε πελάτη.
                    Δείτε πώς μεταμορφώνουμε την ψηφιακή σας παρουσία από την αρχή μέχρι το τέλος.
        </p>
      </div>
      
      <div className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 gap-24">
          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">01</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ανακάλυψη</h3>
              <p className="text-gray-300/80 text-lg leading-relaxed">Μαθαίνουμε για την επιχείρησή σας, τους στόχους και τις προκλήσεις σας</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Κατανόηση της Επιχείρησής σας Εσωτερικά και Εξωτερικά</h4>
              <p className="text-gray-300 mb-4">
                Κάθε επιτυχημένο έργο ξεκινά με μια διεξοδική φάση ανακάλυψης. Αφιερώνουμε χρόνο για να κατανοήσουμε την επιχείρησή σας, τον κλάδο, το κοινό-στόχο και τις μοναδικές προκλήσεις σας. Αυτή δεν είναι απλώς μια γρήγορη συζήτηση – διεξάγουμε σε βάθος έρευνα για να εντοπίσουμε ευκαιρίες που άλλοι μπορεί να χάσουν.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Διεξοδικό ερωτηματολόγιο για την καταγραφή των επιχειρηματικών σας στοιχείων</li>
                  <li>Ανάλυση της τρέχουσας ψηφιακής σας παρουσίας και των ανταγωνιστών</li>
                  <li>Ταυτοποίηση του κοινού-στόχου και της διαδικτυακής του συμπεριφοράς</li>
                  <li>Συζήτηση των επιχειρηματικών σας στόχων και πώς το ψηφιακό μπορεί να τους υποστηρίξει</li>
                  <li>Ανασκόπηση της ταυτότητας και της επικοινωνίας της επωνυμίας σας</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Στο τέλος αυτής της φάσης, θα έχουμε μια σαφή κατανόηση του πού βρίσκεστε τώρα και πού θέλετε να πάτε. Αυτό το θεμέλιο διασφαλίζει ότι κάθε απόφαση που λαμβάνουμε προχωρώντας προς τα εμπρός ευθυγραμμίζεται με τους επιχειρηματικούς σας στόχους.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 md:order-last bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">02</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Στρατηγική</h3>
              <p className="text-gray-300">Δημιουργούμε ένα προσαρμοσμένο σχέδιο για την επίτευξη των στόχων σας</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Δημιουργία του Ψηφιακού σας Οδικού Χάρτη</h4>
              <p className="text-gray-300 mb-4">
                Με μια βαθιά κατανόηση της επιχείρησής σας, αναπτύσσουμε μια ολοκληρωμένη στρατηγική που χρησιμεύει ως ο ψηφιακός σας οδικός χάρτης. Αυτό δεν είναι ένα πρότυπο που ταιριάζει σε όλους – είναι ένα προσαρμοσμένο σχέδιο σχεδιασμένο ειδικά για τις επιχειρηματικές σας ανάγκες και τους στόχους ανάπτυξης.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Λεπτομερές πεδίο εφαρμογής έργου και χρονοδιάγραμμα</li>
                  <li>Επιλογή των κατάλληλων ψηφιακών πλατφορμών και τεχνολογιών</li>
                  <li>Στρατηγική περιεχομένου ευθυγραμμισμένη με την ταυτότητα της επωνυμίας σας</li>
                  <li>Σχεδιασμός εμπειρίας χρήστη και χαρτογράφηση της διαδρομής του πελάτη</li>
                  <li>Μετρήσιμοι στόχοι και δείκτες επιδόσεων για παρακολούθηση της επιτυχίας</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Το έγγραφο στρατηγικής σας γίνεται το κοινό μας όραμα για το έργο. Διασφαλίζει ότι όλοι είναι ευθυγραμμισμένοι με τους στόχους, την προσέγγιση και τα αναμενόμενα αποτελέσματα πριν προχωρήσουμε στις φάσεις σχεδιασμού και ανάπτυξης.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">03</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Σχεδιασμός</h3>
              <p className="text-gray-300">Δημιουργούμε μια εκπληκτική οπτική ταυτότητα που έχει απήχηση</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Ζωντανεύοντας την Επωνυμία σας</h4>
              <p className="text-gray-300 mb-4">
                Ο σχεδιασμός είναι το σημείο όπου η ψηφιακή σας παρουσία αρχίζει να διαμορφώνεται οπτικά. Η διαδικασία σχεδιασμού μας εστιάζει στη δημιουργία μιας εμπειρίας που όχι μόνο φαίνεται όμορφη αλλά και οδηγεί σε αποτελέσματα. Συνδυάζουμε την αισθητική με τη λειτουργικότητα για να δημιουργήσουμε σχέδια που εμπλέκουν το κοινό σας και αντικατοπτρίζουν την ταυτότητα της επωνυμίας σας.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Wireframes και πρωτότυπα για βασικές σελίδες και λειτουργίες</li>
                  <li>Οπτικά σχέδια σχεδιασμού που ευθυγραμμίζονται με την επωνυμία σας</li>
                  <li>Προσέγγιση σχεδιασμού mobile-first και responsive</li>
                  <li>Στοιχεία διεπαφής χρήστη που καθοδηγούν τους επισκέπτες προς μετατροπή</li>
                  <li>Συνεργατική διαδικασία αναθεώρησης με ευκαιρίες για σχόλια</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Δεν προχωράμε μέχρι να είστε απόλυτα ικανοποιημένοι με την κατεύθυνση του σχεδιασμού. Αυτή η συνεργατική προσέγγιση διασφαλίζει ότι το τελικό προϊόν θα ξεπεράσει τις προσδοκίες σας και θα έχει απήχηση στο κοινό-στόχο σας.
              </p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 md:order-last bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl font-bold text-white">04</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Κατασκευή</h3>
              <p className="text-gray-300">Κατασκευάζουμε την ψηφιακή σας λύση με ακρίβεια</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Κατασκευή με Αριστεία</h4>
              <p className="text-gray-300 mb-4">
                Κατά τη διάρκεια της φάσης ανάπτυξης, μετατρέπουμε τα σχέδια σε πλήρως λειτουργικές ψηφιακές εμπειρίες. Η ομάδα ανάπτυξής μας χρησιμοποιεί σύγχρονες τεχνολογίες και βέλτιστες πρακτικές για να διασφαλίσει ότι ο ιστότοπος ή η εφαρμογή σας είναι γρήγορη, ασφαλής και επεκτάσιμη.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Καθαρός, αποδοτικός κώδικας που ακολουθεί τα βιομηχανικά πρότυπα</li>
                  <li>Τακτικές ενημερώσεις προόδου και αναθεωρήσεις ορόσημων</li>
                  <li>Ενσωμάτωση απαραίτητων εργαλείων και υπηρεσιών τρίτων</li>
                  <li>Διεξοδικές δοκιμές σε όλες τις συσκευές και προγράμματα περιήγησης</li>
                  <li>Βελτιστοποίηση απόδοσης για γρήγορους χρόνους φόρτωσης</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Διατηρούμε ανοιχτή επικοινωνία σε όλη τη διάρκεια της διαδικασίας ανάπτυξης, παρέχοντας τακτικές ενημερώσεις και ευκαιρίες για την ανασκόπηση της προόδου. Αυτό διασφαλίζει ότι δεν υπάρχουν εκπλήξεις και ότι το τελικό προϊόν πληροί όλες τις απαιτήσεις.
              </p>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">05</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Εκκίνηση</h3>
              <p className="text-gray-300">Αναπτύσσουμε τη λύση σας και διασφαλίζουμε ότι όλα λειτουργούν τέλεια</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Ζωντανά με Αυτοπεποίθηση</h4>
              <p className="text-gray-300 mb-4">
                Η ημέρα της εκκίνησης είναι συναρπαστική, αλλά μπορεί επίσης να είναι αγχωτική. Η δομημένη διαδικασία εκκίνησης διασφαλίζει μια ομαλή μετάβαση από την ανάπτυξη σε ένα ζωντανό περιβάλλον. Χειριζόμαστε όλες τις τεχνικές πτυχές της ανάπτυξης και διεξάγουμε διεξοδικούς τελικούς ελέγχους για να διασφαλίσουμε ότι όλα λειτουργούν τέλεια.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Λίστα ελέγχου πριν την εκκίνηση για επαλήθευση όλων των απαιτήσεων</li>
                  <li>Συντονισμένη ανάπτυξη για ελαχιστοποίηση ή εξάλειψη των διακοπών</li>
                  <li>Τελικός έλεγχος ποιότητας και λειτουργικότητας</li>
                  <li>Ρύθμιση εργαλείων αναλυτικών στοιχείων και παρακολούθησης</li>
                  <li>Εκπαίδευση και τεκμηρίωση για την ομάδα σας</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Δεν ξεκινάμε απλώς και φεύγουμε. Παρακολουθούμε στενά τον ιστότοπό σας τις ημέρες μετά την εκκίνηση για να αντιμετωπίσουμε γρήγορα τυχόν προβλήματα που ενδέχεται να προκύψουν και να διασφαλίσουμε τη βέλτιστη απόδοση σε πραγματικές συνθήκες.
              </p>
            </div>
          </div>
          
          {/* Step 6 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 md:order-last bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">06</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ανάπτυξη</h3>
              <p className="text-gray-300">Σας βοηθάμε να εξελιχθείτε και να βελτιωθείτε με βάση πραγματικά δεδομένα</p>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-xl font-bold text-white mb-4">Συνεχής Βελτίωση και Υποστήριξη</h4>
              <p className="text-gray-300 mb-4">
                Η εκκίνηση είναι μόνο η αρχή του ψηφιακού σας ταξιδιού. Παρέχουμε συνεχή υποστήριξη και βελτιστοποίηση για να διασφαλίσουμε ότι η ψηφιακή σας παρουσία συνεχίζει να εξελίσσεται και να αποδίδει αποτελέσματα. Χρησιμοποιώντας δεδομένα και αναλυτικά στοιχεία, εντοπίζουμε ευκαιρίες για βελτίωση και ανάπτυξη.
              </p>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-bold text-white mb-2">Τι να Περιμένετε:</h5>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Τακτικές αναφορές απόδοσης και αναλυτικά στοιχεία</li>
                  <li>Συνεχής τεχνική υποστήριξη και συντήρηση</li>
                  <li>Βελτιστοποίηση ποσοστού μετατροπής για βελτιωμένα αποτελέσματα</li>
                  <li>Ενημερώσεις περιεχομένου και βελτιώσεις λειτουργιών</li>
                  <li>Στρατηγικές διαβουλεύσεις για ευθυγράμμιση με εξελισσόμενους επιχειρηματικούς στόχους</li>
                </ul>
              </div>
              <p className="text-gray-300">
                Στόχος μας είναι να δημιουργήσουμε μια μακροχρόνια συνεργασία που θα βοηθήσει την επιχείρησή σας να αναπτυχθεί. Επενδύουμε στην επιτυχία σας και θα συνεχίσουμε να παρέχουμε αξία πολύ μετά την αρχική εκκίνηση.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl mb-28 shadow-lg max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Είστε Έτοιμοι να Ξεκινήσετε;</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ας συζητήσουμε πώς η αποδεδειγμένη διαδικασία μας μπορεί να βοηθήσει την επιχείρησή σας να επιτύχει τους ψηφιακούς της στόχους.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
          >
            Επικοινωνήστε μαζί μας
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default HowWeWorkPage;
