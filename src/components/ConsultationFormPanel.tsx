import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 max-w-md w-full mx-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Δωρεάν Συμβουλή</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Το όνομά σας"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Τηλέφωνο"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="text"
            name="businessName"
            placeholder="Όνομα επιχείρησης"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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
    </div>
  );
};

export default ConsultationFormPanel;