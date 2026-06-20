import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient orbs that follow mouse */}
      <div 
        className="absolute w-96 h-96 bg-medical-accent/10 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="absolute w-80 h-80 bg-accent/8 rounded-full blur-3xl transition-all duration-1500 ease-out animate-pulse"
        style={{
          left: `${(1 - mousePosition.x) * 100}%`,
          top: `${(1 - mousePosition.y) * 100}%`,
          transform: 'translate(-50%, -50%)',
          animationDelay: '0.5s',
        }}
      />
      
      {/* Static floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-medical-accent rounded-full animate-ping opacity-60" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-medical-accent/30 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-accent/40 rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-medical-accent to-transparent animate-pulse"
            style={{ 
              top: `${i * 10}%`,
              left: '0',
              right: '0',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse"
            style={{ 
              left: `${i * 10}%`,
              top: '0',
              bottom: '0',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;