import React, { useState } from 'react';
import ConsultationFormPanel from './ConsultationFormPanel';

const ConsultationForm: React.FC = () => {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  // Function to open the panel
  const openConsultationForm = () => {
    setIsConsultationFormOpen(true);
  };

  // Function to close the panel
  const closeConsultationForm = () => {
    setIsConsultationFormOpen(false);
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
