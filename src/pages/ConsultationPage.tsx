import React, { useState } from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle, User, Mail, Phone, Building, Globe, MessageSquare } from 'lucide-react';
import { insertConsultationRequest, type ConsultationRequest } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const serviceOptions = [
    t('consultation.services.website'),
    t('consultation.services.uiux'),
    t('consultation.services.ecommerce'),
    t('consultation.services.marketing'),
    t('consultation.services.seo'),
    t('consultation.services.social'),
    t('consultation.services.mobile'),
    t('consultation.services.branding'),
    t('consultation.services.content'),
    t('consultation.services.email')
  ];

  const budgetOptions = [
    t('consultation.budget.under1k'),
    t('consultation.budget.1k3k'),
    t('consultation.budget.3k5k'),
    t('consultation.budget.5k10k'),
    t('consultation.budget.over10k'),
    t('consultation.budget.discuss')
  ];

  const timelineOptions = [
    t('consultation.timeline.immediate'),
    t('consultation.timeline.soon'),
    t('consultation.timeline.medium'),
    t('consultation.timeline.long'),
    t('consultation.timeline.flexible')
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

    try {
      const consultationData: ConsultationRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        website: formData.website || undefined,
        message: formData.message,
        services: formData.services,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined
      };

      await insertConsultationRequest(consultationData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting consultation request:', error);
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
                  Η αίτησή σας για δωρεάν συμβουλευτική έχει σταλεί επιτυχώς.
                </p>
                <p className="text-gray-400 mb-8 text-sm md:text-base">
                  Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών για να προγραμματίσουμε τη συνάντησή μας.
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
                    <a href="tel:+442081295829" style={{ color: '#f43f5e' }} className="hover:opacity-80">
                      +44 20 8129 5829
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
            {t('consultation.back')}
          </button>
          <h1 className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t('consultation.title')}
          </h1>
          <div className="w-16 md:w-20"></div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-8">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{t('consultation.form.title')}</h2>
            <p className="text-gray-300 text-sm md:text-base px-2">
              {t('consultation.form.description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <User className="inline h-4 w-4 mr-2" />
                  {t('consultation.form.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder={t('consultation.form.name.placeholder')}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Mail className="inline h-4 w-4 mr-2" />
                  {t('consultation.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder={t('consultation.form.email.placeholder')}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Phone className="inline h-4 w-4 mr-2" />
                  {t('consultation.form.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder={t('consultation.form.phone.placeholder')}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  <Building className="inline h-4 w-4 mr-2" />
                  {t('consultation.form.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                  placeholder={t('consultation.form.company.placeholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">
                <Globe className="inline h-4 w-4 mr-2" />
                {t('consultation.form.website')}
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder={t('consultation.form.website.placeholder')}
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-white font-medium mb-4 text-sm md:text-base">
                {t('consultation.form.services')} *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
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
                  {t('consultation.form.budget')}
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                >
                  <option value="">{t('consultation.form.budget.placeholder')}</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget} className="bg-black text-white">
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">
                  {t('consultation.form.timeline')}
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:border-transparent text-sm md:text-base"
                  style={{ '--tw-ring-color': '#f43f5e' }}
                >
                  <option value="">{t('consultation.form.timeline.placeholder')}</option>
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
                {t('consultation.form.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm md:text-base"
                style={{ '--tw-ring-color': '#f43f5e' }}
                placeholder={t('consultation.form.message.placeholder')}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || formData.services.length === 0}
                className="disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 md:px-8 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center mx-auto min-w-[200px] text-sm md:text-base"
                style={{ 
                  background: isSubmitting || !formData.name || !formData.email || formData.services.length === 0 
                    ? 'linear-gradient(to right, #6b7280, #6b7280)' 
                    : 'linear-gradient(to right, #8b5cf6, #f43f5e)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('consultation.form.submitting')}
                  </>
                ) : (
                  <>
                    {t('consultation.form.submit')}
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              
              <p className="text-gray-400 text-sm mt-4">
                * {t('consultation.form.required')}
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 md:mt-8 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">{t('consultation.process.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>1</span>
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm md:text-base">{t('consultation.process.step1.title')}</h4>
              <p className="text-gray-300 text-xs md:text-sm">{t('consultation.process.step1.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>2</span>
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm md:text-base">{t('consultation.process.step2.title')}</h4>
              <p className="text-gray-300 text-xs md:text-sm">{t('consultation.process.step2.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                <span className="font-bold" style={{ color: '#f43f5e' }}>3</span>
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm md:text-base">{t('consultation.process.step3.title')}</h4>
              <p className="text-gray-300 text-xs md:text-sm">{t('consultation.process.step3.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
