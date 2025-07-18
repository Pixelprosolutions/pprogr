import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

interface ConsultationFormPanelProps {
  onClose: () => void;
}

const ConsultationFormPanel: React.FC<ConsultationFormPanelProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [language, setLanguage] = useState<'el'|'en'>('el');
  const [isUKBusiness, setIsUKBusiness] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const renderCalendar = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0);
      const isPastDate = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      calendarDays.push(
        <button
          key={day}
          className={`w-10 h-10 rounded-md flex items-center justify-center text-sm ${
            isPastDate || isWeekend 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : isSelected 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-600 hover:bg-gray-500 text-white cursor-pointer'
          }`}
          onClick={() => !isPastDate && !isWeekend && handleDateSelect(date)}
          disabled={isPastDate || isWeekend}
        >
          {day}
        </button>
      );
    }

    return <div className="grid grid-cols-7 gap-2">{calendarDays}</div>;
  };

  const renderTimeSlots = () => {
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];

    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {timeSlots.map(time => (
          <button
            key={time}
            className={`px-4 py-2 rounded-md text-white text-sm ${
              selectedTime === time ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
            } transition-colors`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={onClose} />
        <div className="relative bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Επιτυχία!</h3>
          <p className="text-gray-600">Η κράτησή σας επιβεβαιώθηκε</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Δωρεάν Συμβουλή</h2>
          </div>
          <select
            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md px-3 py-1 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'el'|'en')}
          >
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'el' ? 'Βήμα 1: Προσωπικές Πληροφορίες' : 'Step 1: Personal Information'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'el' ? 'Παρακαλούμε δώστε τα βασικά στοιχεία επικοινωνίας σας.' : 'Please provide your basic contact information.'}
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === 'el' ? 'Το Όνομά σας' : 'Your Name'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder={language === 'el' ? 'Το Email σας' : 'Your Email'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder={language === 'el' ? 'Το Τηλέφωνό σας' : 'Your Phone'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={nextStep}
            >
              Επόμενο <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'el' ? 'Βήμα 2: Στοιχεία Επιχείρησης' : 'Step 2: Business Details'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'el' ? 'Πείτε μας για την επιχείρησή σας.' : 'Tell us about your business.'}
            </p>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ukBusiness"
                checked={isUKBusiness}
                onChange={() => setIsUKBusiness(!isUKBusiness)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="ukBusiness" className="text-gray-900">
                {language === 'el' ? 'Επιχείρηση στο Ηνωμένο Βασίλειο' : 'UK-based business'}
              </label>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === 'el' ? 'Όνομα Επιχείρησης' : 'Business Name'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder={language === 'el' ? 'Τύπος Επιχείρησης' : 'Business Type'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder={language === 'el' ? 'URL Ιστότοπου' : 'Website URL'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {isUKBusiness && (
                <input
                  type="text"
                  placeholder={language === 'el' ? 'Αριθμός Εταιρείας (UK)' : 'Company Number (UK)'}
                  className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              <textarea
                placeholder={language === 'el' ? 'Επιχειρηματικοί Στόχοι' : 'Business Goals'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center"
                onClick={nextStep}
              >
                Επόμενο <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Βήμα 3: Ημερολόγιο και Χρονοθυρίδα</h3>
            <p className="text-gray-600 mb-4">Επιλέξτε μια ημερομηνία και ώρα για τη συμβουλή σας.</p>
            {renderCalendar()}
            {renderTimeSlots()}
            <div className="flex justify-between mt-6 gap-4">
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center"
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
              >
                Επόμενο <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'el' ? 'Βήμα 4: Επιβεβαίωση' : 'Step 4: Confirmation'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'el'
                ? 'Ελέγξτε τις πληροφορίες σας και επιβεβαιώστε την κράτησή σας.'
                : 'Review your information and confirm your booking.'}
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2 text-gray-900 mb-6">
              <p><strong>{language === 'el' ? 'Όνομα' : 'Name'}:</strong> [Όνομα Χρήστη]</p>
              <p><strong>Email:</strong> [Email Χρήστη]</p>
              <p><strong>{language === 'el' ? 'Τηλέφωνο' : 'Phone'}:</strong> [Τηλέφωνο Χρήστη]</p>
              <p><strong>{language === 'el' ? 'Επιχείρηση' : 'Business'}:</strong> [Όνομα Επιχείρησης]</p>
              {isUKBusiness && (
                <p><strong>{language === 'el' ? 'Αριθμός Εταιρείας (UK)' : 'UK Company Number'}:</strong> [Company Number]</p>
              )}
              <p><strong>{language === 'el' ? 'Ημερομηνία' : 'Date'}:</strong> {selectedDate?.toLocaleDateString()}</p>
              <p><strong>{language === 'el' ? 'Ώρα' : 'Time'}:</strong> {selectedTime}</p>
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
                onClick={() => {
                  console.log("Booking Confirmed!");
                  setIsSubmitted(true);
                  setTimeout(() => {
                    onClose();
                  }, 2000);
                }}
              >
                Επιβεβαίωση Κράτησης
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationFormPanel;