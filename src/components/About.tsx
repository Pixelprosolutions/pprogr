import React, { useState } from 'react';
import { Users, Award, Clock, Star, Target, HeartHandshake, ShieldCheck } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
}

interface AboutProps {
  isHomepage?: boolean;
}

const About: React.FC<AboutProps> = ({ isHomepage = false }) => {

  const testimonials = [
    {
      quote: "Εξαιρετική δουλειά! Το site μας έχει αυξηθεί κατά 300% τις επισκέψεις.",
      author: "Μαρία Παπαδοπούλου",
      title: "CEO, Fashion Boutique (Ελλάδα)"
    },
    {
      quote: "Professional approach and fast delivery. The Greek localization was perfect!",
      author: "James Wilson",
      title: "CTO, TechSolutions (UK)"
    },
    {
      quote: "Μας βοήθησαν να φτάσουμε σε νέες αγορές με το SEO strategy τους.",
      author: "Ελένη Ιωάννου",
      title: "Founder, Travel Agency (Κύπρος)"
    }
  ];

  const values = [
    {
      title: "Καινοτομία",
      description: "Αναζητούμε συνεχώς νέες τεχνολογίες και προσεγγίσεις",
      icon: <ShieldCheck className="w-8 h-8" />
    },
    {
      title: "Αξιοπιστία",
      description: "Τηρούμε τις δεσμεύσεις μας και παραδίδουμε εγκαίρως",
      icon: <HeartHandshake className="w-8 h-8" />
    },
    {
      title: "Ποιότητα",
      description: "Δεν συμβιβαζόμαστε με τίποτα λιγότερο από το τέλειο",
      icon: <Award className="w-8 h-8" />
    }
  ];

  const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => {
    return (
      <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-2 hover:shadow-accent-500/10">
        <div className="mb-4 text-white">{icon}</div>
        <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
        <p className="text-gray-300/80 text-xl">{label}</p>
      </div>
    );
  };

  const Testimonial: React.FC<TestimonialProps> = ({ quote, author, title }) => {
    return (
      <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-2 hover:shadow-accent-500/10">
        <div className="text-yellow-400 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="inline w-5 h-5" fill="currentColor" />
          ))}
        </div>
        <p className="text-gray-300/80 text-xl mb-4 italic">"{quote}"</p>
        <div className="text-white">
          <p className="font-bold">{author}</p>
          <p className="text-gray-400">{title}</p>
        </div>
      </div>
    );
  };

  const ValueCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => {
    return (
      <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-2 hover:shadow-accent-500/10">
        <div className="mb-4 text-accent-500">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300/80 text-xl">{description}</p>
      </div>
    );
  };

  return (
    <>
      <div className={isHomepage ? "py-20" : "pt-32 pb-20"}>
        <div className="container mx-auto px-4 mb-20">
          {!isHomepage && (
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Η Αποστολή Μας
                </h2>
                <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                  Να δημιουργούμε εμπειρίες που εμπνέουν και να αναπτύσσουμε λύσεις που μεταμορφώνουν.
                  Με έδρα το Ηνωμένο Βασίλειο, προσφέρουμε υπηρεσίες σε ελληνικές και διεθνείς επιχειρήσεις,
                  συνδυάζοντας τεχνολογική προηγμένότητα με πολιτισμική ευαισθησία.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  value="10+"
                  label="Χρόνια Εμπειρίας"
                  icon={<Clock className="w-8 h-8" />}
                />
                <StatCard
                  value="50+"
                  label="Ευχαριστημένοι Πελάτες"
                  icon={<Users className="w-8 h-8" />}
                />
                <StatCard
                  value="100%"
                  label="Ικανοποίηση"
                  icon={<Award className="w-8 h-8" />}
                />
              </div>
            </section>
          )}

          {!isHomepage && (
            <section className="mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
                Οι Αξίες Μας
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <ValueCard
                    key={index}
                    title={value.title}
                    description={value.description}
                    icon={value.icon}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
              {isHomepage ? 'Σχετικά με Εμάς' : 'Η Ιστορία Μας'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed mb-8">
                {isHomepage 
                  ? 'Είμαστε μια δημιουργική ομάδα ειδικών που αγαπάμε την τεχνολογία και την καινοτομία. Με έδρα το Λονδίνο, προσφέρουμε εξειδικευμένες υπηρεσίες για ελληνικές επιχειρήσεις με πλήρη γλωσσική υποστήριξη.'
                  : 'Ιδρυθείσα το 2023, η PixelPro ξεκίνησε ως μια μικρή ομάδα ενθουσιωδών επαγγελματιών. Σήμερα έχουμε μετατραπεί σε έναν αξιόπιστο συνεργάτη για εκατοντάδες επιχειρήσεις στην Ελλάδα και διεθνώς.'}
              </p>
              <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed">
                {isHomepage
                  ? 'Με πάνω από 50 ολοκληρωμένα projects σε 8 χώρες και εκατοντάδες ευχαριστημένους πελάτες, προσφέρουμε υπηρεσίες με πλήρη ελληνική γλωσσική υποστήριξη.'
                  : 'Με πάνω από 50 custom εφαρμογές και ιστοτόπους για ελληνικές και διεθνείς επιχειρήσεις, έχουμε βοηθήσει στην ψηφιακή τους μεταμόρφωση με πλήρη γλωσσική υποστήριξη.'}
              </p>
            </div>
          </section>

          {!isHomepage && (
            <section className="mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
                Μαρτυρίες Πελατών
              </h2>
              <p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto text-center mb-12">
                Μην εμπιστευτείτε μόνο τα λόγια μας. Δείτε τι έχουν να πουν οι πελάτες μας για τη συνεργασία τους μαζί μας.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Testimonial
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    title={testimonial.title}
                  />
                ))}
              </div>
              <div className="text-center mt-16">
                <button
                  onClick={() => (window as any).navigateToConsultation?.()}
                  className="bg-accent-500 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-accent/20"
                >
                  Δωρεάν Συμβουλευτική
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
