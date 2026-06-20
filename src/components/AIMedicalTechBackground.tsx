import { useEffect, useRef, useState } from 'react';

const AIMedicalTechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(true);

    interface AIMedicalParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'neural' | 'dna' | 'data' | 'medical' | 'ai' | 'tech' | 'virus' | 'cell' | 'protein' | 'circuit';
      color: string;
      rotation: number;
      rotationSpeed: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
      magneticForce: number;
      oscillation: number;
      phase: number;
      pulsePhase: number;
      connections: number[];
    }

    const particles: AIMedicalParticle[] = [];
    const particleCount = 45;

    // Initialize particles with diverse medical and tech elements
    for (let i = 0; i < particleCount; i++) {
      const types: AIMedicalParticle['type'][] = [
        'neural', 'dna', 'data', 'medical', 'ai', 'tech', 
        'virus', 'cell', 'protein', 'circuit'
      ];
      
      const colors = [
        'rgba(20, 184, 166, 0.6)',   // Teal - medical tech
        'rgba(79, 70, 229, 0.6)',    // Purple - neural/AI
        'rgba(239, 68, 68, 0.5)',    // Red - medical emergency
        'rgba(34, 197, 94, 0.6)',    // Green - healthy/positive
        'rgba(249, 115, 22, 0.5)',   // Orange - protein/energy
        'rgba(168, 85, 247, 0.6)',   // Violet - data/tech
        'rgba(59, 130, 246, 0.5)',   // Blue - technology
        'rgba(236, 72, 153, 0.5)'    // Pink - AI/neural
      ];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 25 + 8,
        opacity: Math.random() * 0.7 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        trail: [],
        magneticForce: Math.random() * 0.0002 + 0.0001,
        oscillation: Math.random() * 3 + 1,
        phase: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    const drawAIMedicalParticle = (particle: AIMedicalParticle, time: number) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const pulseSize = Math.sin(time * 2 + particle.pulsePhase) * 3;
      const size = particle.size + pulseSize;
      
      switch (particle.type) {
        case 'neural':
          // Neural network node with connections
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.6', '0.8');
          ctx.lineWidth = 2;
          
          // Main node
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Neural connections
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + time * 0.5;
            const length = size * 0.6 + Math.sin(time * 3 + i) * size * 0.2;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
            ctx.stroke();
            
            // Connection nodes
            ctx.fillStyle = particle.color.replace('0.6', '0.4');
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * length, Math.sin(angle) * length, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'dna':
          // DNA double helix
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 3;
          
          // Double helix strands
          for (let i = 0; i < 20; i++) {
            const y = (i - 10) * size * 0.05;
            const x1 = Math.sin((i / 20) * Math.PI * 4 + time) * size * 0.3;
            const x2 = Math.sin((i / 20) * Math.PI * 4 + time + Math.PI) * size * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            
            // Base pairs
            if (i % 3 === 0) {
              ctx.strokeStyle = particle.color.replace('0.6', '0.8');
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x1, y);
              ctx.lineTo(x2, y);
              ctx.stroke();
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 3;
            }
          }
          break;
          
        case 'data':
          // Data flow visualization
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.6', '0.8');
          ctx.lineWidth = 2;
          
          // Data packets
          for (let i = 0; i < 4; i++) {
            const y = -size * 0.4 + i * size * 0.3;
            const flow = (time * 3 + i) % 1;
            const x = -size * 0.4 + flow * size * 0.8;
            
            ctx.fillRect(x, y, size * 0.2, size * 0.15);
            ctx.strokeRect(x, y, size * 0.2, size * 0.15);
          }
          
          // Data streams
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            const y = -size * 0.3 + i * size * 0.3;
            const flow = (time * 4 + i) % 1;
            const x = -size * 0.4 + flow * size * 0.8;
            
            ctx.beginPath();
            ctx.moveTo(-size * 0.4, y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          break;
          
        case 'medical':
          // Medical cross with heartbeat
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.6', '0.8');
          ctx.lineWidth = 3;
          
          // Cross
          ctx.fillRect(-size/8, -size/2, size/4, size);
          ctx.fillRect(-size/2, -size/8, size, size/4);
          
          // Heartbeat line
          ctx.strokeStyle = particle.color.replace('0.6', '0.9');
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i < 20; i++) {
            const x = -size * 0.6 + (i / 20) * size * 1.2;
            const heartbeat = Math.sin((i / 20) * Math.PI * 6 + time * 4) * size * 0.1;
            const y = heartbeat;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'ai':
          // AI brain with circuits
          ctx.fillStyle = particle.color.replace('0.6', '0.3');
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Brain outline
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Neural pathways
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const length = size * 0.3 + Math.sin(time * 2 + i) * size * 0.1;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
            ctx.stroke();
          }
          
          // AI processing nodes
          ctx.fillStyle = particle.color;
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2 + time;
            const x = Math.cos(angle) * size * 0.25;
            const y = Math.sin(angle) * size * 0.25;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'tech':
          // Circuit board pattern
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Circuit lines
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const length = size * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
            ctx.stroke();
            
            // Circuit nodes
            ctx.fillStyle = particle.color.replace('0.6', '0.8');
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * length, Math.sin(angle) * length, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Central processor
          ctx.fillStyle = particle.color;
          ctx.fillRect(-size * 0.15, -size * 0.15, size * 0.3, size * 0.3);
          break;
          
        case 'virus':
          // Virus structure with spikes
          ctx.fillStyle = particle.color;
          ctx.strokeStyle = particle.color.replace('0.5', '0.7');
          ctx.lineWidth = 2;
          
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
          }
          break;
          
        case 'cell':
          // Cell with membrane and organelles
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color.replace('0.6', '0.2');
          ctx.lineWidth = 2;
          
          // Cell membrane
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
          ctx.fillStyle = particle.color.replace('0.6', '0.8');
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'protein':
          // Protein folding structure
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          
          // Protein chain
          ctx.beginPath();
          for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2 + time * 0.5;
            const radius = size * 0.3 + Math.sin(angle * 2) * size * 0.1;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Amino acid nodes
          ctx.fillStyle = particle.color.replace('0.5', '0.7');
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 + time * 0.5;
            const radius = size * 0.3 + Math.sin(angle * 2) * size * 0.1;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'circuit':
          // Electronic circuit pattern
          ctx.strokeStyle = particle.color;
          ctx.fillStyle = particle.color;
          ctx.lineWidth = 2;
          
          // Circuit board
          ctx.strokeRect(-size * 0.4, -size * 0.4, size * 0.8, size * 0.8);
          
          // Circuit traces
          for (let i = 0; i < 4; i++) {
            const startX = -size * 0.4 + i * size * 0.3;
            const endX = startX + size * 0.2;
            const y = -size * 0.3 + Math.sin(time + i) * size * 0.1;
            
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
          }
          
          // Components
          ctx.fillRect(-size * 0.2, -size * 0.2, size * 0.1, size * 0.1);
          ctx.fillRect(size * 0.1, size * 0.1, size * 0.1, size * 0.1);
          break;
      }
      
      ctx.restore();
      
      // Draw particle trail
      ctx.globalAlpha = 0.4;
      particle.trail.forEach((point, index) => {
        if (point.opacity > 0) {
          ctx.fillStyle = particle.color.replace('0.6', (point.opacity * 0.2).toString());
          ctx.beginPath();
          ctx.arc(point.x, point.y, (particle.size * 0.15) * point.opacity, 0, Math.PI * 2);
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
        if (particle.trail.length > 20) {
          particle.trail.shift();
        }
        
        // Fade trail
        particle.trail.forEach(point => {
          point.opacity *= 0.92;
        });
        
        // Magnetic attraction to mouse
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 250) {
          const force = particle.magneticForce * (250 - distance);
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        
        // Apply oscillation
        particle.vx += Math.sin(animationTime * particle.oscillation + particle.phase) * 0.015;
        particle.vy += Math.cos(animationTime * particle.oscillation + particle.phase) * 0.015;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Apply damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Boundary behavior - gentle bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.7;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.7;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // Pulse opacity
        particle.opacity += (Math.random() - 0.5) * 0.03;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        drawAIMedicalParticle(particle, animationTime);
      });
      
      // Particle interactions and connections
      particles.forEach((particle, i) => {
        particle.connections = [];
        particles.slice(i + 1).forEach((otherParticle, j) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw connection lines for nearby particles
          if (distance < 200 && distance > 0) {
            const opacity = (1 - distance / 200) * 0.15;
            const connectionColor = particle.type === otherParticle.type 
              ? particle.color 
              : 'rgba(20, 184, 166, 0.3)';
            
            ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            
            particle.connections.push(i + j + 1);
          }
          
          // Collision avoidance
          if (distance < particle.size + otherParticle.size && distance > 0) {
            const overlap = particle.size + otherParticle.size - distance;
            const separationX = (dx / distance) * overlap * 0.02;
            const separationY = (dy / distance) * overlap * 0.02;
            
            particle.vx += separationX;
            particle.vy += separationY;
            otherParticle.vx -= separationX;
            otherParticle.vy -= separationY;
          }
        });
      });
      
      // Draw data flow effects
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 5; i++) {
        const x = (animationTime * 50 + i * 200) % (canvas.width + 100) - 50;
        const y = canvas.height * 0.2 + Math.sin(animationTime + i) * canvas.height * 0.1;
        
        ctx.fillStyle = `rgba(20, 184, 166, ${0.2 + Math.sin(animationTime * 2 + i) * 0.1})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      
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
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        isVisible ? 'opacity-70' : 'opacity-0'
      }`}
      style={{ background: 'transparent' }}
    />
  );
};

export default AIMedicalTechBackground;
