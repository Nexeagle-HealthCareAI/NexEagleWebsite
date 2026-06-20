import { useEffect, useRef } from 'react';

const MedicalParticles = () => {
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

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'cross' | 'pill' | 'heart' | 'dna' | 'atom';
      color: string;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 25;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const types: Particle['type'][] = ['cross', 'pill', 'heart', 'dna', 'atom'];
      const colors = [
        'rgba(20, 184, 166, 0.3)', // Teal
        'rgba(79, 70, 229, 0.3)',  // Purple
        'rgba(239, 68, 68, 0.3)',  // Red
        'rgba(34, 197, 94, 0.3)',  // Green
        'rgba(249, 115, 22, 0.3)'  // Orange
      ];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 15 + 8,
        opacity: Math.random() * 0.5 + 0.1,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const size = particle.size;
      
      switch (particle.type) {
        case 'cross':
          // Medical cross
          ctx.fillStyle = particle.color;
          ctx.fillRect(-size/6, -size/2, size/3, size);
          ctx.fillRect(-size/2, -size/6, size, size/3);
          break;
          
        case 'pill':
          // Pill capsule
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.roundRect(-size/2, -size/3, size, size * 2/3, size/3);
          ctx.fill();
          break;
          
        case 'heart':
          // Heart shape
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          const heartSize = size * 0.4;
          ctx.moveTo(0, heartSize * 0.3);
          ctx.bezierCurveTo(-heartSize, -heartSize * 0.5, -heartSize * 0.5, -heartSize, 0, -heartSize * 0.3);
          ctx.bezierCurveTo(heartSize * 0.5, -heartSize, heartSize, -heartSize * 0.5, 0, heartSize * 0.3);
          ctx.fill();
          break;
          
        case 'dna':
          // DNA symbol
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 4;
            const x = Math.sin(angle) * size * 0.3;
            const y = (i - 10) * size * 0.05;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'atom':
          // Atom symbol
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1.5;
          // Nucleus
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
          ctx.fill();
          // Electron orbits
          for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI * 2) / 3);
            ctx.beginPath();
            ctx.ellipse(0, 0, size * 0.4, size * 0.2, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Pulse opacity
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.05, Math.min(0.4, particle.opacity));
        
        drawParticle(particle);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

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

export default MedicalParticles;