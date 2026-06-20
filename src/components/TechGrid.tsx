import { useEffect, useRef } from 'react';

const TechGrid = () => {
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

    // Circuit board pattern
    const drawCircuitPattern = () => {
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.1)';
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Add circuit nodes
        for (let x = 50; x < canvas.width; x += 150) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(20, 184, 166, 0.3)';
          ctx.fill();
        }
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Add connecting lines
      for (let y = 50; y < canvas.height; y += 200) {
        for (let x = 100; x < canvas.width; x += 200) {
          ctx.beginPath();
          ctx.moveTo(x - 25, y);
          ctx.lineTo(x + 25, y);
          ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
          ctx.stroke();
        }
      }
    };

    drawCircuitPattern();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};

export default TechGrid;