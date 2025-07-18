import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ConsultationFormPanelProps {
  onClose: () => void;
}

const ConsultationFormPanel: React.FC<ConsultationFormPanelProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
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
    // Ensure date comparison ignores time part
    today.setHours(0, 0, 0, 0); 
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0); // Ignore time part for comparison
      const isPastDate = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      calendarDays.push(
        <button
          key={day}
          className={`w-10 h-10 rounded-md flex items-center justify-center ${
            isPastDate || isWeekend ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-black/50 hover:bg-white/10 text-white cursor-pointer'
          } ${isSelected ? 'bg-blue-500' : ''}`}
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
            className={`px-4 py-2 rounded-md text-white ${
              selectedTime === time ? 'bg-blue-500' : 'bg-black/50 hover:bg-white/10'
            } transition-colors`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header with title, back button and language selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div
              className="mr-3"
              onMouseEnter={() => setIsArrowHovered(true)}
              onMouseLeave={() => setIsArrowHovered(false)}
            >
              <button
                onClick={onClose}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isArrowHovered
                    ? 'bg-white text-black shadow-lg shadow-white/20 transform scale-110'
                    : 'bg-black/30 text-white border border-white/20 backdrop-blur-sm'
                }`}
                aria-label="Go back"
              >
                <ArrowLeft className={`h-4 w-4 transition-transform duration-300 ${isArrowHovered ? 'transform -translate-x-0.5' : ''}`} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white">Δωρεάν Συμβουλή</h2>
          </div>
          <select
            className="bg-black/50 border border-white/20 text-white rounded-md px-3 py-1 text-sm"
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
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'el' ? 'Βήμα 1: Προσωπικές Πληροφορίες' : 'Step 1: Personal Information'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'el' ? 'Παρακαλούμε δώστε τα βασικά στοιχεία επικοινωνίας σας.' : 'Please provide your basic contact information.'}
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === 'el' ? 'Το Όνομά σας' : 'Your Name'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                placeholder={language === 'el' ? 'Το Email σας' : 'Your Email'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                placeholder={language === 'el' ? 'Το Τηλέφωνό σας' : 'Your Phone'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center w-full"
              onClick={nextStep}
            >
              Επόμενο <ArrowRight className="h-4 w-4 inline-block ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'el' ? 'Βήμα 2: Στοιχεία Επιχείρησης' : 'Step 2: Business Details'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'el' ? 'Πείτε μας για την επιχείρησή σας.' : 'Tell us about your business.'}
            </p>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ukBusiness"
                checked={isUKBusiness}
                onChange={() => setIsUKBusiness(!isUKBusiness)}
                className="mr-2"
              />
              <label htmlFor="ukBusiness" className="text-white">
                {language === 'el' ? 'Επιχείρηση στο Ηνωμένο Βασίλειο' : 'UK-based business'}
              </label>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === 'el' ? 'Όνομα Επιχείρησης' : 'Business Name'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="text"
                placeholder={language === 'el' ? 'Τύπος Επιχείρησης' : 'Business Type'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="url"
                placeholder={language === 'el' ? 'URL Ιστότοπου' : 'Website URL'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {isUKBusiness && (
                <input
                  type="text"
                  placeholder={language === 'el' ? 'Αριθμός Εταιρείας (UK)' : 'Company Number (UK)'}
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              )}
              <textarea
                placeholder={language === 'el' ? 'Επιχειρηματικοί Στόχοι' : 'Business Goals'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                rows={3}
              />
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center"
                onClick={nextStep}
              >
                Επόμενο <ArrowRight className="h-4 w-4 inline-block ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Βήμα 3: Ημερολόγιο και Χρονοθυρίδα</h3>
            <p className="text-gray-300 mb-4">Επιλέξτε μια ημερομηνία και ώρα για τη συμβουλή σας.</p>
            {renderCalendar()}
            {renderTimeSlots()}
            <div className="flex justify-between mt-6 gap-4">
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center"
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
              >
                Επόμενο <ArrowRight className="h-4 w-4 inline-block ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'el' ? 'Βήμα 4: Επιβεβαίωση' : 'Step 4: Confirmation'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'el'
                ? 'Ελέγξτε τις πληροφορίες σας και επιβεβαιώστε την κράτησή σας.'
                : 'Review your information and confirm your booking.'}
            </p>
            <div className="bg-black/50 border border-white/10 rounded-md p-4 space-y-2 text-white mb-6">
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
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors flex items-center"
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

        {/* Success Animation */}
        {isSubmitted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Επιτυχία!</h3>
              <p className="text-gray-300">Η κράτησή σας επιβεβαιώθηκε</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationFormPanel;