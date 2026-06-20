import { useEffect, useRef, useState } from 'react';

const AdvancedMedicalParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

    interface AdvancedParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'virus' | 'antibody' | 'cell' | 'protein' | 'neuron' | 'data';
      color: string;
      rotation: number;
      rotationSpeed: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
      magneticForce: number;
      oscillation: number;
      phase: number;
    }

    const particles: AdvancedParticle[] = [];
    const particleCount = 35;

    // Initialize advanced particles
    for (let i = 0; i < particleCount; i++) {
      const types: AdvancedParticle['type'][] = ['virus', 'antibody', 'cell', 'protein', 'neuron', 'data'];
      const colors = [
        'rgba(239, 68, 68, 0.4)',   // Red - virus/danger
        'rgba(34, 197, 94, 0.4)',   // Green - healthy/antibody
        'rgba(79, 70, 229, 0.4)',   // Purple - neural/brain
        'rgba(20, 184, 166, 0.4)',  // Teal - medical tech
        'rgba(249, 115, 22, 0.4)',  // Orange - protein
        'rgba(168, 85, 247, 0.4)'   // Violet - data
      ];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.6 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        trail: [],
        magneticForce: Math.random() * 0.0001 + 0.00005,
        oscillation: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
      });
    }

    const drawAdvancedParticle = (particle: AdvancedParticle, time: number) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const size = particle.size + Math.sin(time * particle.oscillation + particle.phase) * 2;
      
      switch (particle.type) {
        case 'virus':
          // Spiky virus structure
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.4', '0.6');
          ctx.lineWidth = 1.5;
          
          // Main body
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          
          // Spikes
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const spikeLength = size * 0.3 + Math.sin(time * 3 + i) * 3;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
            ctx.lineTo(Math.cos(angle) * spikeLength, Math.sin(angle) * spikeLength);
            ctx.stroke();
            
            // Spike tip
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * spikeLength, Math.sin(angle) * spikeLength, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'antibody':
          // Y-shaped antibody
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          
          // Main stem
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.3);
          ctx.lineTo(0, size * 0.4);
          ctx.stroke();
          
          // Arms
          ctx.beginPath();
          ctx.moveTo(0, -size * 0.1);
          ctx.lineTo(-size * 0.3, -size * 0.4);
          ctx.moveTo(0, -size * 0.1);
          ctx.lineTo(size * 0.3, -size * 0.4);
          ctx.stroke();
          
          // Binding sites
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(-size * 0.3, -size * 0.4, size * 0.08, 0, Math.PI * 2);
          ctx.arc(size * 0.3, -size * 0.4, size * 0.08, 0, Math.PI * 2);
          ctx.arc(0, size * 0.4, size * 0.08, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'cell':
          // Cell with membrane and organelles
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color.replace('0.4', '0.15');
          ctx.lineWidth = 2;
          
          // Cell membrane (irregular circle)
          ctx.beginPath();
          for (let i = 0; i <= 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const radius = size * 0.4 + Math.sin(angle * 3 + time) * size * 0.1;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          // Nucleus
          ctx.fillStyle = particle.color.replace('0.4', '0.6');
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
          ctx.fill();
          
          // Organelles
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + time * 0.5;
            const x = Math.cos(angle) * size * 0.25;
            const y = Math.sin(angle) * size * 0.25;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.05, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'neuron':
          // Neuron with dendrites
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Cell body
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
          ctx.fill();
          
          // Dendrites
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const length = size * 0.4 + Math.sin(time * 2 + i) * size * 0.1;
            
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.2, Math.sin(angle) * size * 0.2);
            
            // Branching dendrite
            for (let j = 1; j <= 3; j++) {
              const branchAngle = angle + (Math.sin(time + i + j) * 0.3);
              const x = Math.cos(branchAngle) * length * (j / 3);
              const y = Math.sin(branchAngle) * length * (j / 3);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
          
          // Synapses
          ctx.fillStyle = particle.color.replace('0.4', '0.8');
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + time;
            const x = Math.cos(angle) * size * 0.35;
            const y = Math.sin(angle) * size * 0.35;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'data':
          // Data packet with flowing information
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.4', '0.8');
          ctx.lineWidth = 1;
          
          // Main cube
          const cubeSize = size * 0.3;
          ctx.fillRect(-cubeSize, -cubeSize, cubeSize * 2, cubeSize * 2);
          ctx.strokeRect(-cubeSize, -cubeSize, cubeSize * 2, cubeSize * 2);
          
          // Data streams
          ctx.lineWidth = 2;
          for (let i = 0; i < 3; i++) {
            const y = -cubeSize + (i + 1) * (cubeSize * 2 / 4);
            const flow = (time * 5 + i) % 1;
            const x = -cubeSize + flow * cubeSize * 2;
            
            ctx.strokeStyle = particle.color.replace('0.4', '0.8');
            ctx.beginPath();
            ctx.moveTo(-cubeSize, y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          
          // Data points
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + time * 2;
            const radius = size * 0.5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            ctx.fillStyle = particle.color.replace('0.4', '0.6');
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
      }
      
      ctx.restore();
      
      // Draw particle trail
      ctx.globalAlpha = 0.3;
      particle.trail.forEach((point, index) => {
        if (point.opacity > 0) {
          ctx.fillStyle = particle.color.replace('0.4', (point.opacity * 0.1).toString());
          ctx.beginPath();
          ctx.arc(point.x, point.y, (particle.size * 0.1) * point.opacity, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };

    let animationTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.016;
      
      particles.forEach(particle => {
        // Add current position to trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: 1 });
        if (particle.trail.length > 15) {
          particle.trail.shift();
        }
        
        // Fade trail
        particle.trail.forEach(point => {
          point.opacity *= 0.95;
        });
        
        // Magnetic attraction to mouse
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 200) {
          const force = particle.magneticForce * (200 - distance);
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        
        // Apply oscillation
        particle.vx += Math.sin(animationTime * particle.oscillation + particle.phase) * 0.01;
        particle.vy += Math.cos(animationTime * particle.oscillation + particle.phase) * 0.01;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Boundary behavior - gentle bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // Pulse opacity
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        drawAdvancedParticle(particle, animationTime);
      });
      
      // Particle interactions
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw connection lines for nearby particles
          if (distance < 150 && distance > 0) {
            const opacity = (1 - distance / 150) * 0.1;
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
          
          // Collision avoidance
          if (distance < particle.size + otherParticle.size && distance > 0) {
            const overlap = particle.size + otherParticle.size - distance;
            const separationX = (dx / distance) * overlap * 0.01;
            const separationY = (dy / distance) * overlap * 0.01;
            
            particle.vx += separationX;
            particle.vy += separationY;
            otherParticle.vx -= separationX;
            otherParticle.vy -= separationY;
          }
        });
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      style={{ background: 'transparent' }}
    />
  );
};

export default AdvancedMedicalParticles;