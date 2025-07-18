import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PixelBackground from './components/PixelBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import FAQPage from './pages/FAQPage';

function App() {
  const [_, setMousePosition] = useState({ x: 0, y: 0 });
  const [headerTransform, setHeaderTransform] = useState('');
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
  
  return (
    <Router>
      <div className="relative min-h-screen">
        <PixelBackground />
        <div 
          className="relative z-10"
          style={{ transform: headerTransform, transition: 'transform 0.5s ease-out' }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
