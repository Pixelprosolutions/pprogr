import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const PromoVideo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoId = '_kkKVJxvf_0';

  const openVideo = () => {
    setIsOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setIsOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2">Δείτε τη Δουλειά μας σε Δράση</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4">
            Παρακολουθήστε πώς βοηθάμε τις τοπικές επιχειρήσεις να μεταμορφώσουν την ψηφιακή τους παρουσία και να αυξήσουν την πελατειακή τους βάση.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden group border border-white/10">
          {/* Video Thumbnail with Play Button */}
          <div 
            className="relative aspect-video cursor-pointer"
            onClick={openVideo}
          >
            {/* Black overlay with 65% transparency */}
            <div className="absolute inset-0 bg-black/65 z-10"></div>
            
            {/* YouTube Thumbnail */}
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
              alt="Promotional Video Thumbnail" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white" />
              </div>
            </div>
            
            {/* Gradient Overlay - on top of black overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20"></div>
          </div>
        </div>

        {/* Video Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <button 
                onClick={closeVideo}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              
              {/* YouTube Embed */}
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-white/10">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="PixelPro Solutions Προωθητικό Βίντεο"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoVideo;
