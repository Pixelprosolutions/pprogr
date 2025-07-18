import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Η φόρμα υποβλήθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.');
    setShowConsultationForm(false);
    setFormData({ name: '', email: '', phone: '', businessName: '' });
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-32 md:py-48 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-3xl space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Βοηθώντας τις Τοπικές Επιχειρήσεις να <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Αναπτυχθούν στο Διαδίκτυο</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Δημιουργούμε ιστότοπους και στρατηγικές ψηφιακού μάρκετινγκ που βοηθούν τις τοπικές επιχειρήσεις να προσελκύσουν περισσότερους πελάτες και να αυξήσουν τα έσοδά τους.
          </p>
          
          {!showConsultationForm ? (
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
              onClick={() => navigate('/how-we-work')}
            >
              Δείτε Πώς Μπορούμε να Βοηθήσουμε
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
              onClick={() => setShowConsultationForm(true)}
            >
              Λάβετε μια Δωρεάν Συμβουλή
            </button>
          </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Δωρεάν Συμβουλή</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Το όνομά σας"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="tel"
                  placeholder="Τηλέφωνο"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  type="text"
                  placeholder="Όνομα επιχείρησης"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConsultationForm(false)}
                    className="flex-1 px-4 py-3 bg-transparent border border-white/50 text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Υποβολή
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
