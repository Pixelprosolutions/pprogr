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
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-lg z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Centered glass card */}
      <div
        className="w-full max-w-md max-h-[90vh] bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg m-4 p-8"
        ref={(el) => el?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      >
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
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                placeholder={language === 'el' ? 'Το Email σας' : 'Your Email'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                placeholder={language === 'el' ? 'Το Τηλέφωνό σας' : 'Your Phone'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
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
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="text"
                placeholder={language === 'el' ? 'Τύπος Επιχείρησης' : 'Business Type'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="url"
                placeholder={language === 'el' ? 'URL Ιστότοπου' : 'Website URL'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {isUKBusiness && (
                <input
                  type="text"
                  placeholder={language === 'el' ? 'Αριθμός Εταιρείας (UK)' : 'Company Number (UK)'}
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              )}
              <textarea
                placeholder={language === 'el' ? 'Επιχειρηματικοί Στόχοι' : 'Business Goals'}
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                rows={3}
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
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
            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Πίσω
              </button>
              <button
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center glow-on-hover interactive"
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime} // Disable if date or time not selected
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
            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors glow-on-hover interactive"
                onClick={prevStep}
              >
                <ArrowLeft className="h-4 w-4 inline-block mr-2" /> Back
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-black font-medium rounded-md hover:bg-green-700 transition-colors flex items-center justify-center glow-on-hover interactive"
                // Add actual booking logic here
                onClick={() => {
                  console.log("Booking Confirmed!");
                  setIsSubmitted(true);
                  setTimeout(() => {
                    onClose();
                  }, 2000); // Close after 2 seconds
                }}
              >
                Επιβεβαίωση Κράτησης
              </button>
            </div>
          </div>
        )}

        {/* Success Animation */}
        {isSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[10000]">
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationFormPanel;
