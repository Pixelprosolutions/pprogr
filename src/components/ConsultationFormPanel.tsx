import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface ConsultationFormPanelProps {
  onClose: () => void;
}

const ConsultationFormPanel: React.FC<ConsultationFormPanelProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: ''
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation Form submitted:', formData);
    alert('Η φόρμα υποβλήθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.');
    onClose();
    setFormData({ name: '', email: '', phone: '', businessName: '' });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-md w-full mx-auto shadow-2xl">
        {/* Header with navigation buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            title="Πίσω"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <h3 className="text-2xl font-bold text-white text-center flex-1">Δωρεάν Συμβουλή</h3>
          
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
            title="Κλείσιμο"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Το όνομά σας"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Τηλέφωνο"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              type="text"
              name="businessName"
              placeholder="Όνομα επιχείρησης"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Ακύρωση
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Υποβολή
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationFormPanel;