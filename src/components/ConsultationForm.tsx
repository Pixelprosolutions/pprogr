import React, { useState } from 'react';
import ConsultationFormPanel from './ConsultationFormPanel';

const ConsultationForm: React.FC = () => {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  // Function to open the panel
  const openConsultationForm = () => {
    setIsConsultationFormOpen(true);
    document.body.classList.add('consultation-form-open');
  };

  // Function to close the panel
  const closeConsultationForm = () => {
    setIsConsultationFormOpen(false);
    document.body.classList.remove('consultation-form-open');
  };

  return (
    <div>
      <button
        className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
        onClick={openConsultationForm}
      >
        Λάβετε μια Δωρεάν Συμβουλή
      </button>

      {isConsultationFormOpen && (
        <ConsultationFormPanel onClose={closeConsultationForm} />
      )}
    </div>
  );
};

export default ConsultationForm;
