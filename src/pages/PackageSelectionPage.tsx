import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, User, Mail, Phone, Building, Globe, MessageSquare } from 'lucide-react';
import { insertPackageSelection, type PackageSelection } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  address: string;
  city: string;
  selectedPackage: string;
  additionalServices: string[];
  message: string;
  budget: string;
  timeline: string;
}

const PackageSelectionPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: ''
    },
    address: '',
    city: '',
    selectedPackage: '',
    additionalServices: [],
    message: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      name: "Starter",
      price: 699,
      description: "Για επιχειρήσεις που ξεκινούν την online προβολή τους"
    },
    {
      name: "Growth",
      price: 1299,
      description: "Για επιχειρήσεις που αναπτύσσονται και χρειάζονται σταθερή ψηφιακή παρουσία"
    },
    {
      name: "Dominance",
      price: 2299,
      description: "Για επιχειρήσεις που θέλουν να κυριαρχήσουν στον κλάδο τους"
    }
  ];

  const additionalServices = [
    'E-commerce Development',
    'Advanced SEO Package',
    'Email Marketing Setup',
    'Content Creation Package',
    'Branding & Logo Design',
    'Photography/Videography',
    'Google Ads Management',
    'Facebook Ads Management'
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
    
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const packageData: PackageSelection = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website || undefined,
        social_media: formData.socialMedia,
        address: formData.address || undefined,
        city: formData.city || undefined,
        selected_package: formData.selectedPackage,
        additional_services: formData.additionalServices,
        message: formData.message || undefined,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined
      };

      await insertPackageSelection(packageData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting package selection:', error);
      alert('Υπήρξε ένα σφάλμα κατά την αποστολή της αίτησης. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black/80 to-black/90 text-white p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center py-12 md:py-20">
            <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-12">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Ευχαριστούμε!</h1>
                <p className="text-gray-300 text-lg md:text-xl mb-6">
                  Η αίτησή σας για το {formData.selectedPackage} πακέτο έχει σταλεί επιτυχώς.
                </p>
                <p className="text-gray-400 mb-8 text-sm md:text-base">
                  Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να συζητήσουμε τις λεπτομέρειες.
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => (window as any).navigateToHome?.()}
                  className="w-full text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg text-sm md:text-base"
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #f43f5e)' }}
                >
                  Επιστροφή στην Αρχική
                </button>
                
                <div className="text-center text-gray-400 text-sm">
                  <p>Ή επικοινωνήστε απευθείας:</p>
                  <p className="mt-2">
                    <a href="mailto:hello@pixelpro.solutions" style={{ color: '#f43f5e' }} className="hover:opacity-80">
                      hello@pixelpro.solutions
                    </a>
                    {' | '}
                    <a href="tel:+306973517695" style={{ color: '#f43f5e' }} className="hover:opacity-80">
                      +30 697 3517 695
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
        <div className="flex items-center justify-between mb-6 md:mb-8 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <button
            onClick={() => (window as any).navigateToHome?.()}
            className="flex items-center text-white hover:text-pink-400 transition-colors bg-white/10 backdrop-blur-sm border border-white/20 py-2 px-3 md:px-4 rounded-lg hover:bg-white/20 text-sm md:text-base"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Πίσω
          </button>
          <h1 className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Επιλογή Πακέτου
          </h1>
          <div className="w-16 md:w-20"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-8">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Στοιχεία Επιχείρησης</h2>
            <p className="text-gray-300 text-sm md:text-base px-2">
              Συμπληρώστε τα στοιχεία σας για να προχωρήσουμε με την επιλογή του κατάλληλου πακέτου.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Package Selection */}
            <div>
              <label className="block text-white font-medium mb-4 text-sm md:text-base">
                Επιλέξτε Πακέτο *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <label key={pkg.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="selectedPackage"
                      value={pkg.name}
                      checked={formData.selectedPackage === pkg.name}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div 
                      className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                        formData.selectedPackage === pkg.name
                          ? 'border-pink-500 bg-pink-500/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <h3 className="font-bold text-white text-lg">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-pink-400 my-2">€{pkg.price}/μήνα</p>
                      <p className="text-gray-300 text-sm">{pkg.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <User className="inline h-4 w-4 mr-2" />
                  Όνομα Επικοινωνίας *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Το όνομά σας"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Building className="inline h-4 w-4 mr-2" />
                  Όνομα Επιχείρησης *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Όνομα επιχείρησης"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Τηλέφωνο *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="+30 210 1234567"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  Διεύθυνση
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Διεύθυνση επιχείρησης"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  Πόλη
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Πόλη"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">
                <Globe className="inline h-4 w-4 mr-2" />
                Υπάρχων Ιστότοπος
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder="https://www.example.com"
              />
            </div>

            {/* Social Media */}
            <div>
              <label className="block text-white font-medium mb-4 text-sm md:text-base">
                Social Media Accounts
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Facebook URL"
                />
                <input
                  type="url"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="Instagram URL"
                />
                <input
                  type="url"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  name="socialMedia.youtube"
                  value={formData.socialMedia.youtube}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder="YouTube URL"
                />
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <label className="block text-white font-medium mb-4 text-sm md:text-base">
                Επιπλέον Υπηρεσίες (προαιρετικό)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {additionalServices.map((service) => (
                  <label key={service} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="sr-only"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200`}
                      style={{
                        backgroundColor: formData.additionalServices.includes(service) ? '#f43f5e' : 'transparent',
                        borderColor: formData.additionalServices.includes(service) ? '#f43f5e' : 'rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {formData.additionalServices.includes(service) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  Επιπλέον Προϋπολογισμός
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
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
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  Χρονοδιάγραμμα
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
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
              <label className="block text-white font-medium mb-2 text-sm md:text-base">
                <MessageSquare className="inline h-4 w-4 mr-2" />
                Επιπλέον Πληροφορίες
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm md:text-base"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder="Πείτε μας περισσότερα για τις ανάγκες σας, τους στόχους σας, ή οτιδήποτε άλλο θα θέλατε να μας πείτε..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.phone || !formData.selectedPackage}
                className="disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 md:px-8 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center mx-auto min-w-[200px] text-sm md:text-base"
                style={{ 
                  background: isSubmitting || !formData.name || !formData.email || !formData.company || !formData.phone || !formData.selectedPackage
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
      </div>
    </div>
  );
};

export default PackageSelectionPage;