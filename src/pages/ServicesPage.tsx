import React from 'react';
import Services from '../components/Services';
import Pricing from '../components/Pricing';

const ServicesPage: React.FC = () => {
  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Οι Υπηρεσίες μας
          </h1>
          <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed">
            Προσφέρουμε μια ολοκληρωμένη γκάμα ψηφιακών υπηρεσιών που έχουν σχεδιαστεί για να βοηθήσουν την τοπική σας επιχείρηση να ευδοκιμήσει στο διαδίκτυο.
            Από την ανάπτυξη ιστοτόπων έως τα δημιουργικά μέσα, σας καλύπτουμε.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ανάπτυξη Ιστοτόπων</h2>
            <p className="text-gray-300 mb-4">
              Οι υπηρεσίες μας για την ανάπτυξη ιστοτόπων επικεντρώνονται στη δημιουργία responsive, γρήγορων ιστοτόπων που μετατρέπουν τους επισκέπτες σε πελάτες. Κατασκευάζουμε με σύγχρονες τεχνολογίες που διασφαλίζουν ότι ο ιστότοπός σας λειτουργεί άψογα σε όλες τις συσκευές.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Προσαρμοσμένη ανάπτυξη ιστοτόπων</li>
              <li>Λύσεις WordPress και CMS</li>
              <li>Συντήρηση και υποστήριξη ιστοτόπων</li>
              <li>Βελτιστοποίηση απόδοσης</li>
              <li>Ανάπτυξη web εφαρμογών</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Σχεδιασμός UI/UX</h2>
            <p className="text-gray-300 mb-4">
              Δημιουργούμε έξυπνες διεπαφές χρήστη και απρόσκοπτες εμπειρίες που διατηρούν τους επισκέπτες αφοσιωμένους. Η διαδικασία σχεδιασμού μας εστιάζει στην κατανόηση των αναγκών των χρηστών σας και στη δημιουργία διεπαφών που είναι τόσο όμορφες όσο και λειτουργικές.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Έρευνα χρηστών και ανάπτυξη προσώπων</li>
              <li>Wireframing και prototyping</li>
              <li>Οπτικός σχεδιασμός και επωνυμία</li>
              <li>Δοκιμές χρηστικότητας</li>
              <li>Βελτιστοποίηση ποσοστού μετατροπής</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Λύσεις E-Commerce</h2>
            <p className="text-gray-300 mb-4">
              Μετατρέψτε τον ιστότοπό σας σε μια μηχανή πωλήσεων με τις λύσεις ηλεκτρονικού εμπορίου μας. Κατασκευάζουμε ηλεκτρονικά καταστήματα που είναι εύκολα στη διαχείριση και παρέχουν μια απρόσκοπτη εμπειρία αγορών για τους πελάτες σας.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Custom e-commerce development</li>
              <li>Shopping cart and checkout optimization</li>
              <li>Payment gateway integration</li>
              <li>Inventory management systems</li>
              <li>Product catalog design</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ψηφιακό Μάρκετινγκ</h2>
            <p className="text-gray-300 mb-4">
              Κάντε την επιχείρησή σας να δειχθεί από τους σωστούς ανθρώπους με τις στοχευμένες στρατηγικές ψηφιακού μάρκετινγκ. Σας βοηθάμε να προσεγγίσετε πιθανούς πελάτες και να τους μετατρέψετε σε πιστούς θαυμαστές της επωνυμίας σας.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Βελτιστοποίηση για μηχανές αναζήτησης (SEO)</li>
              <li>Διαφήμιση Pay-per-click (PPC)</li>
              <li>Μάρκετινγκ μέσων κοινωνικής δικτύωσης</li>
              <li>Καμπάνιες email μάρκετινγκ</li>
              <li>Στρατηγική μάρκετινγκ περιεχομένου</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ανάπτυξη Mobile App</h2>
            <p className="text-gray-300 mb-4">
              Επεκτείνετε την ψηφιακή σας παρουσία με προσαρμοσμένες εφαρμογές για κινητά που επιτρέπουν στους πελάτες σας να αλληλεπιδρούν με την επιχείρησή σας εν κινήσει. Αναπτύσσουμε εγγενείς και cross-platform εφαρμογές που προσφέρουν εξαιρετικές εμπειρίες χρήστη.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>iOS and Android app development</li>
              <li>Cross-platform solutions</li>
              <li>Progressive web apps (PWAs)</li>
              <li>App store optimization</li>
              <li>Ongoing maintenance and updates</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
            <h2 className="text-2xl font-bold text-white mb-4">Δημιουργικό Περιεχόμενο</h2>
            <p className="text-gray-300 mb-4">
              Τραβήξτε την προσοχή και πείτε την ιστορία της επωνυμίας σας με συναρπαστικό οπτικό περιεχόμενο. Οι δημιουργικές υπηρεσίες μέσων μας σάς βοηθούν να ξεχωρίσετε σε ένα πολυσύχναστο ψηφιακό τοπίο με οπτικά στοιχεία επαγγελματικής ποιότητας.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Παραγωγή και επεξεργασία βίντεο</li>
              <li>Animation και motion graphics</li>
              <li>Φωτογραφία και επεξεργασία εικόνας</li>
              <li>Γραφιστική για ψηφιακά και έντυπα</li>
              <li>Ανάπτυξη ταυτότητας επωνυμίας</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button className="w-full bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
                Μάθετε περισσότερα
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Services />
      <Pricing />
    </main>
  );
};

export default ServicesPage;
