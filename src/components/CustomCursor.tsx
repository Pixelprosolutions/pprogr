import React, { useState, useEffect } from 'react';

interface CustomCursorProps {
  isHovering: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isHovering }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add delay for trail effect
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      />
      <div 
        className="custom-cursor-trail"
        style={{ 
          left: `${trailPosition.x}px`, 
          top: `${trailPosition.y}px` 
        }}
      />
    </>
  );
};

export default CustomCursor;
