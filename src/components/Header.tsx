import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);


  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Render the interactive logo
  const renderLogo = () => {
    const logoPixels = [];
    const logoSize = 15; // Size of each pixel
    const logoGap = 1; // Gap between pixels

    // Define the logo pattern - 1 means pixel, 0 means no pixel
    const logoPattern = [
      // 3x3 grid
      [1, 1, 1],  // Top row
      [1, 0, 1],  // Middle row (center missing)
      [1, 1, 1],  // Bottom row
      [1, 0, 0]   // Bottom extension (only left pixel)
    ];

    // Get logo container's position once
    const logoRect = logoRef.current?.getBoundingClientRect();


    // Create logo pixels
    let pixelId = 0;
    for (let row = 0; row < logoPattern.length; row++) {
      for (let col = 0; col < logoPattern[row].length; col++) {
        if (logoPattern[row][col] === 1) {
          // Calculate base position relative to the logo container's top-left
          const baseX = col * (logoSize + logoGap);
          const baseY = row * (logoSize + logoGap);

          // Calculate pixel's absolute center position
          const pixelCenterX = (logoRect?.left || 0) + baseX + logoSize / 2;
          const pixelCenterY = (logoRect?.top || 0) + baseY + logoSize / 2;

          // Calculate distance and direction from mouse to pixel center
          const dx = mousePosition.x - pixelCenterX;
          const dy = mousePosition.y - pixelCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Interaction range for repulsion

          // Calculate displacement based on hover state and mouse proximity
          let translateX = 0;
          let translateY = 0;
          let scale = 1;
          let rotation = 0;

          if (isHovering && distance < maxDistance && distance > 0) {
            // Magnetic Repulsion Effect
            const repulsionForce = (1 - distance / maxDistance) * 20; // Adjust force multiplier (20) as needed
            // Move pixel *away* from the mouse
            translateX = (-dx / distance) * repulsionForce;
            translateY = (-dy / distance) * repulsionForce;

            // Optional: Add subtle scale/rotation based on distance or position
            scale = 1 + (1 - distance / maxDistance) * 0.1; // Subtle scale
            // rotation = (dx / maxDistance) * 5; // Subtle rotation
          }

          // Add delay based on position for wave effect (optional)
          const delay = (row + col) * 0.03; // Slightly faster delay

          logoPixels.push(
            <div
              key={`logo-${pixelId++}`}
              className="logo-pixel bg-white absolute"
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                left: `${baseX}px`, // Use base position relative to container
                top: `${baseY}px`,  // Use base position relative to container
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                transition: `transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s,
                            background-color 0.2s ease ${delay}s,
                            boxShadow 0.2s ease ${delay}s`, // Faster transition
                boxShadow: isHovering ? '0 0 8px 1px rgba(255, 255, 255, 0.2)' : 'none', // Slightly reduced glow
                zIndex: isHovering ? 10 : 'auto'
              }}
            />
          );
        }
      }
    }

    return logoPixels;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home">
            <div
              ref={logoRef}
              className="relative h-[60px] w-[45px] logo-container interactive cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {renderLogo()}
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-4 xl:space-x-8">
          <a 
            href="#home" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Αρχική
          </a>
          <a 
            href="#services" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Υπηρεσίες
          </a>
          <a 
            href="#about" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Σχετικά
          </a>
          <a 
            href="#projects" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Έργα
          </a>
          <a 
            href="#pricing" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Τιμές
          </a>
          <a 
            href="#contact" 
            className="text-white hover:text-gray-300 transition-colors glow-on-hover text-sm xl:text-base whitespace-nowrap"
          >
            Επικοινωνία
          </a>
          <a 
            href="#contact" 
            className="bg-white text-black py-2 px-3 xl:px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 glow-on-hover text-sm xl:text-base whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              (window as any).navigateToConsultation?.();
            }}
          >
            Δωρεάν Συμβουλευτική
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white interactive"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/90 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Αρχική
              </a>
              <a 
                href="#services" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Υπηρεσίες
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Σχετικά
              </a>
              <a 
                href="#projects" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Έργα
              </a>
              <a 
                href="#pricing" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Τιμές
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Επικοινωνία
              </a>
              <a 
                href="#consultation" 
                className="bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  (window as any).navigateToConsultation?.();
                }}
              >
                Δωρεάν Συμβουλευτική
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;