import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SimpleModal from './SimpleModal';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Φόρμα υποβλήθηκε! Θα επικοινωνήσουμε μαζί σας σύντομα.');
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', business: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-6 py-32 md:py-48 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Βοηθώντας τις Τοπικές Επιχειρήσεις να <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Αναπτυχθούν στο Διαδίκτυο</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Δημιουργούμε ιστότοπους και στρατηγικές ψηφιακού μάρκετινγκ που βοηθούν τις τοπικές επιχειρήσεις να προσελκύσουν περισσότερους πελάτες και να αυξήσουν τα έσοδά τους.
            </p>
            
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
                onClick={() => setShowModal(true)}
              >
                Λάβετε μια Δωρεάν Συμβουλή
              </button>
            </div>
          </div>
        </div>
      </section>

      <SimpleModal isOpen={showModal} onClose={() => setShowModal(false)}>
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
                onClick={() => setShowModal(false)}
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
      </SimpleModal>
    </>
  );
};

export default Hero;