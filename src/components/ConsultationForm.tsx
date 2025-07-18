import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ConsultationFormProps {
  onClose: () => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Φόρμα υποβλήθηκε! Θα επικοινωνήσουμε μαζί σας σύντομα.');
    onClose();
    setFormData({ name: '', email: '', phone: '', business: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
      style={{ zIndex: 10000 }}
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="pt-4">
          <h3 className="text-xl font-bold text-white mb-4">Δωρεάν Συμβουλή</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Όνομα"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Τηλέφωνο"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="business"
              placeholder="Επιχείρηση"
              value={formData.business}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
            />
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Ακύρωση
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              >
                Υποβολή
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;