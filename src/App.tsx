import { useState, useEffect, useRef } from 'react';
import PixelBackground from './components/PixelBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TetrisPage from './pages/TetrisPage';

function App() {
  const [_, setMousePosition] = useState({ x: 0, y: 0 });
  const [headerTransform, setHeaderTransform] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'tetris'>('home');
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate subtle header movement based on mouse position
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      
      setHeaderTransform(`translate(${moveX}px, ${moveY}px)`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sectionsRef.current = Array.from(sections) as HTMLElement[];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.8;
      
      sectionsRef.current.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (scrollPosition > sectionTop) {
          section.classList.add('visible');
        }
      });
    };
    
    // Add fade-in class to all sections
    sectionsRef.current.forEach(section => {
      section.classList.add('fade-in');
    });
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle navigation
  const navigateToTetris = () => setCurrentPage('tetris');
  const navigateToHome = () => setCurrentPage('home');

  // Make navigation functions available globally
  useEffect(() => {
    (window as any).navigateToTetris = navigateToTetris;
    (window as any).navigateToHome = navigateToHome;
  }, []);

  return (
    <div className="relative min-h-screen">
      <PixelBackground />
      <div 
        className="relative z-10"
        style={{ transform: headerTransform, transition: 'transform 0.5s ease-out' }}
      >
        {currentPage === 'home' ? (
          <>
            <Header />
            <HomePage />
            <Footer />
          </>
        ) : (
          <TetrisPage />
        )}
      </div>
    </div>
  );
}

export default App;
