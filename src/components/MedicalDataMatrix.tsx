import { useEffect, useRef } from 'react';

const MedicalDataMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Medical data matrix effect
    const medicalChars = [
      'BPM', 'ECG', 'DNA', 'RNA', 'HIV', 'CBC', 'MRI', 'CT', 'AI',
      '💊', '🩺', '⚕️', '+', '₊', '∞', 'μ', 'α', 'β', 'γ', 'Δ',
      '120', '80', '98.6', '37.0', 'O2', 'H2O', 'CO2', 'pH',
      'A', 'B', 'AB', 'O', 'Rh+', 'Rh-',
      'mg', 'ml', 'cc', 'IU', 'mcg'
    ];
    
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const charTypes: string[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height / fontSize;
      charTypes[i] = medicalChars[Math.floor(Math.random() * medicalChars.length)];
    }

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Cycle through different medical terms
        if (Math.random() < 0.05) {
          charTypes[i] = medicalChars[Math.floor(Math.random() * medicalChars.length)];
        }
        
        const text = charTypes[i];
        
        // Different colors for different types of medical data
        if (text.includes('BPM') || text.includes('ECG')) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.6)'; // Red for vitals
        } else if (text.includes('DNA') || text.includes('RNA')) {
          ctx.fillStyle = 'rgba(79, 70, 229, 0.6)'; // Purple for genetics
        } else if (text.includes('💊') || text.includes('🩺') || text.includes('⚕️')) {
          ctx.fillStyle = 'rgba(20, 184, 166, 0.8)'; // Teal for medical symbols
        } else if (/\d/.test(text)) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.6)'; // Green for numbers/measurements
        } else {
          ctx.fillStyle = 'rgba(156, 163, 175, 0.5)'; // Gray for other text
        }
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
          charTypes[i] = medicalChars[Math.floor(Math.random() * medicalChars.length)];
        }
        
        drops[i] += 0.5;
      }
    };

    const interval = setInterval(draw, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-15"
      style={{ background: 'transparent' }}
    />
  );
};

export default MedicalDataMatrix;