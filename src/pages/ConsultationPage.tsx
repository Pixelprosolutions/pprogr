import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, User, Mail, Phone, Building, Globe, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
  services: string[];
  budget: string;
  timeline: string;
}

const ConsultationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: '',
    services: [],
    budget: '',
    timeline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    'Κατασκευή Ιστοτόπου',
    'Σχεδιασμός UI/UX',
    'E-Commerce Λύσεις',
    'Ψηφιακό Μάρκετινγκ',
    'SEO Βελτιστοποίηση',
    'Social Media Management',
    'Mobile App Development',
    'Branding & Logo Design',
    'Content Creation',
    'Email Marketing'
  ];

  const budgetOptions = [
    'Κάτω από €1.000',
    '€1.000 - €3.000',
    '€3.000 - €5.000',
    '€5.000 - €10.000',
    'Πάνω από €10.000',
    'Θα συζητήσουμε'
  ];

  const timelineOptions = [
    'Άμεσα (1-2 εβδομάδες)',
    'Σύντομα (1 μήνας)',
    'Μεσοπρόθεσμα (2-3 μήνες)',
    'Μακροπρόθεσμα (3+ μήνες)',
    'Ευέλικτο χρονοδιάγραμμα'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black/80 to-black/90 text-white p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <div className="mb-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-4">Ευχαριστούμε!</h1>
                <p className="text-gray-300 text-xl mb-6">
                  Η αίτησή σας για δωρεάν συμβουλευτική έχει σταλεί επιτυχώς.
                </p>
                <p className="text-gray-400 mb-8">
                  Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να προγραμματίσουμε τη συνάντησή μας.
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => (window as any).navigateToHome?.()}
                  className="w-full text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg"
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
                >
                  Επιστροφή στην Αρχική
                </button>
                
                <div className="text-center text-gray-400 text-sm">
                  <p>Ή επικοινωνήστε απευθείας:</p>
                  <p className="mt-2">
                    <a href="mailto:info@pixelpro.gr" style={{ color: '#f43f5e' }} className="hover:opacity-80">
                      info@pixelpro.gr
                    </a>
                    {' | '}
                    <a href="tel:+302101234567" style={{ color: '#f43f5e' }} className="hover:opacity-80">
                      +302101234567
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/80 to-black/90 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <button
            onClick={() => (window as any).navigateToHome?.()}
            className="flex items-center text-white hover:text-pink-400 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 py-2 px-4 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Πίσω
          </button>
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Δωρεάν Συμβουλευτική
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ας Γνωριστούμε!</h2>
            <p className="text-gray-300">
              Συμπληρώστε τη φόρμα παρακάτω και θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να συζητήσουμε τις ανάγκες της επιχείρησής σας.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Όνομα *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Το όνομά σας"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Τηλέφωνο
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="+30 210 1234567"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Building className="inline h-4 w-4 mr-2" />
                  Επιχείρηση
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Όνομα επιχείρησης"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                <Globe className="inline h-4 w-4 mr-2" />
                Υπάρχων Ιστότοπος
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder="https://www.example.com"
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-white font-medium mb-4">
                Ποιες υπηρεσίες σας ενδιαφέρουν; *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="sr-only"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200`}
                      style={{
                        backgroundColor: formData.services.includes(service) ? '#f43f5e' : 'transparent',
                        borderColor: formData.services.includes(service) ? '#f43f5e' : 'rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {formData.services.includes(service) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-gray-300 hover:text-white transition-colors">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Προϋπολογισμός
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                >
                  <option value="">Επιλέξτε προϋπολογισμό</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget} className="bg-black text-white">
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Χρονοδιάγραμμα
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                >
                  <option value="">Επιλέξτε χρονοδιάγραμμα</option>
                  {timelineOptions.map((timeline) => (
                    <option key={timeline} value={timeline} className="bg-black text-white">
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white font-medium mb-2">
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Πείτε μας περισσότερα για το έργο σας
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder="Περιγράψτε τους στόχους σας, τις προκλήσεις που αντιμετωπίζετε, ή οτιδήποτε άλλο θα θέλατε να μας πείτε..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || formData.services.length === 0}
                className="disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-8 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center mx-auto min-w-[200px]"
                style={{ 
                  background: isSubmitting || !formData.name || !formData.email || formData.services.length === 0 
                    ? 'linear-gradient(to right, #6b7280, #6b7280)' 
                    : 'linear-gradient(to right, #8b5cf6, #f43f5e)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Αποστολή...
                  </>
                ) : (
                  <>
                    Στείλτε την Αίτηση
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              
              <p className="text-gray-400 text-sm mt-4">
                * Υποχρεωτικά πεδία
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Τι να περιμένετε;</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>1</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Ανάλυση Αναγκών</h4>
              <p className="text-gray-300 text-sm">Συζητάμε τους στόχους και τις προκλήσεις σας</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>2</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Προτάσεις Λύσεων</h4>
              <p className="text-gray-300 text-sm">Παρουσιάζουμε προσαρμοσμένες στρατηγικές</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>3</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Σχέδιο Δράσης</h4>
              <p className="text-gray-300 text-sm">Δημιουργούμε ένα σαφές roadmap για την επιτυχία</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;