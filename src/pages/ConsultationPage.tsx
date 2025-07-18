import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Building, Globe, Users, Target, DollarSign, Calendar } from 'lucide-react';

const ConsultationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    
    // Business Information
    industry: '',
    companySize: '',
    website: '',
    businessAge: '',
    
    // Project Information
    services: [] as string[],
    budget: '',
    timeline: '',
    hasWebsite: '',
    currentChallenges: '',
    
    // Goals and Objectives
    primaryGoals: [] as string[],
    targetAudience: '',
    competitors: '',
    successMetrics: '',
    
    // Additional Information
    additionalInfo: '',
    hearAboutUs: '',
    preferredContact: '',
    contactTime: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof typeof prev].includes(value)
        ? (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const serviceOptions = [
    'Ανάπτυξη Ιστοτόπου',
    'Σχεδιασμός UI/UX',
    'E-Commerce Λύσεις',
    'Ψηφιακό Μάρκετινγκ',
    'SEO Βελτιστοποίηση',
    'Διαχείριση Social Media',
    'Ανάπτυξη Mobile App',
    'Δημιουργικό Περιεχόμενο',
    'Email Marketing',
    'Branding & Ταυτότητα'
  ];

  const goalOptions = [
    'Αύξηση Online Πωλήσεων',
    'Βελτίωση Brand Awareness',
    'Γενιά Leads',
    'Βελτίωση User Experience',
    'Επέκταση σε Νέες Αγορές',
    'Αυτοματοποίηση Διαδικασιών',
    'Βελτίωση SEO Rankings',
    'Αύξηση Social Media Engagement'
  ];

  if (isSubmitted) {
    return (
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 min-h-[600px] flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Ευχαριστούμε!</h1>
              <p className="text-gray-300 text-lg mb-6">
                Η αίτησή σας για δωρεάν συμβουλευτική έχει σταλεί επιτυχώς. Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.
              </p>
              <p className="text-gray-400">
                Στο μεταξύ, μπορείτε να εξερευνήσετε τα έργα μας ή να μάθετε περισσότερα για τις υπηρεσίες μας.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Δωρεάν Συμβουλευτική
            </h1>
            <p className="text-gray-300 text-xl">
              Συμπληρώστε τη φόρμα παρακάτω και θα επικοινωνήσουμε μαζί σας για μια δωρεάν συμβουλευτική 30 λεπτών
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white border-white/30'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="min-h-[600px] flex flex-col">
            {/* Step 1: Personal & Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6 flex-grow">
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">Προσωπικές & Επιχειρηματικές Πληροφορίες</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Όνομα *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Επώνυμο *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Τηλέφωνο *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Εταιρεία *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Θέση στην Εταιρεία</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Κλάδος Δραστηριότητας</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε κλάδο</option>
                      <option value="retail">Λιανικό Εμπόριο</option>
                      <option value="services">Υπηρεσίες</option>
                      <option value="manufacturing">Παραγωγή</option>
                      <option value="technology">Τεχνολογία</option>
                      <option value="healthcare">Υγεία</option>
                      <option value="education">Εκπαίδευση</option>
                      <option value="hospitality">Φιλοξενία</option>
                      <option value="real-estate">Ακίνητα</option>
                      <option value="other">Άλλο</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Μέγεθος Εταιρείας</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε μέγεθος</option>
                      <option value="1-5">1-5 εργαζόμενοι</option>
                      <option value="6-20">6-20 εργαζόμενοι</option>
                      <option value="21-50">21-50 εργαζόμενοι</option>
                      <option value="51-100">51-100 εργαζόμενοι</option>
                      <option value="100+">100+ εργαζόμενοι</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Information */}
            {currentStep === 2 && (
              <div className="space-y-6 flex-grow">
                <div className="flex items-center mb-6">
                  <Globe className="w-6 h-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">Πληροφορίες Έργου</h2>
                </div>

                <div>
                  <label className="block text-white font-medium mb-4">Ποιες υπηρεσίες σας ενδιαφέρουν; *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxChange('services', service)}
                          className="w-4 h-4 text-white bg-black/50 border-white/20 rounded focus:ring-white/50"
                        />
                        <span className="text-gray-300">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Προϋπολογισμός</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε προϋπολογισμό</option>
                      <option value="under-1000">Κάτω από €1.000</option>
                      <option value="1000-5000">€1.000 - €5.000</option>
                      <option value="5000-10000">€5.000 - €10.000</option>
                      <option value="10000-25000">€10.000 - €25.000</option>
                      <option value="25000+">€25.000+</option>
                      <option value="discuss">Θα το συζητήσουμε</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Χρονοδιάγραμμα</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε χρονοδιάγραμμα</option>
                      <option value="asap">Άμεσα</option>
                      <option value="1-month">Εντός 1 μήνα</option>
                      <option value="2-3-months">2-3 μήνες</option>
                      <option value="3-6-months">3-6 μήνες</option>
                      <option value="6-months+">6+ μήνες</option>
                      <option value="flexible">Ευέλικτο</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Έχετε ήδη ιστότοπο;</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="yes"
                        checked={formData.hasWebsite === 'yes'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-white bg-black/50 border-white/20"
                      />
                      <span className="text-gray-300">Ναι</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasWebsite"
                        value="no"
                        checked={formData.hasWebsite === 'no'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-white bg-black/50 border-white/20"
                      />
                      <span className="text-gray-300">Όχι</span>
                    </label>
                  </div>
                </div>

                {formData.hasWebsite === 'yes' && (
                  <div>
                    <label className="block text-white font-medium mb-2">URL Ιστότοπου</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="https://www.example.com"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-white font-medium mb-2">Ποιες είναι οι κύριες προκλήσεις που αντιμετωπίζετε;</label>
                  <textarea
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Περιγράψτε τις κύριες προκλήσεις που αντιμετωπίζετε στον ψηφιακό τομέα..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Goals & Target Audience */}
            {currentStep === 3 && (
              <div className="space-y-6 flex-grow">
                <div className="flex items-center mb-6">
                  <Target className="w-6 h-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">Στόχοι & Κοινό-Στόχος</h2>
                </div>

                <div>
                  <label className="block text-white font-medium mb-4">Ποιοι είναι οι κύριοι στόχοι σας; *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goalOptions.map((goal) => (
                      <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.primaryGoals.includes(goal)}
                          onChange={() => handleCheckboxChange('primaryGoals', goal)}
                          className="w-4 h-4 text-white bg-black/50 border-white/20 rounded focus:ring-white/50"
                        />
                        <span className="text-gray-300">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Περιγράψτε το κοινό-στόχο σας</label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Ποιοι είναι οι ιδανικοί πελάτες σας; Ηλικία, τοποθεσία, ενδιαφέροντα, συμπεριφορά..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Κύριοι Ανταγωνιστές</label>
                  <textarea
                    name="competitors"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Αναφέρετε 2-3 κύριους ανταγωνιστές και τι σας διαφοροποιεί από αυτούς..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Πώς θα μετρήσετε την επιτυχία;</label>
                  <textarea
                    name="successMetrics"
                    value={formData.successMetrics}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="π.χ. αύξηση πωλήσεων κατά 30%, περισσότερες επισκέψεις, καλύτερη κατάταξη στο Google..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Additional Information */}
            {currentStep === 4 && (
              <div className="space-y-6 flex-grow">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">Επιπλέον Πληροφορίες</h2>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Επιπλέον πληροφορίες ή ερωτήσεις</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Υπάρχει κάτι άλλο που θα θέλατε να μας πείτε για το έργο σας;"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Πώς μάθατε για εμάς;</label>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Επιλέξτε</option>
                    <option value="google">Google αναζήτηση</option>
                    <option value="social-media">Social Media</option>
                    <option value="referral">Σύσταση φίλου/συνεργάτη</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other-website">Άλλος ιστότοπος</option>
                    <option value="other">Άλλο</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Προτιμώμενος τρόπος επικοινωνίας</label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε</option>
                      <option value="email">Email</option>
                      <option value="phone">Τηλέφωνο</option>
                      <option value="video-call">Video Call</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Καλύτερη ώρα επικοινωνίας</label>
                    <select
                      name="contactTime"
                      value={formData.contactTime}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Επιλέξτε</option>
                      <option value="morning">Πρωί (9:00-12:00)</option>
                      <option value="afternoon">Απόγευμα (12:00-17:00)</option>
                      <option value="evening">Βράδυ (17:00-20:00)</option>
                      <option value="flexible">Ευέλικτο</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-auto pt-6 border-t border-white/10">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Προηγούμενο
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center glow-on-hover interactive"
                  >
                    Επόμενο
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center glow-on-hover interactive"
                  >
                    Υποβολή Αίτησης
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ConsultationPage;