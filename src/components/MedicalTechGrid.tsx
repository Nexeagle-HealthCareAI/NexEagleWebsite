import { useEffect, useRef } from 'react';

const MedicalTechGrid = () => {
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

    // Enhanced medical tech pattern with neural networks and data flows
    let animationTime = 0;

    const drawAdvancedMedicalTech = () => {
      animationTime += 0.02;
      
      // Animated neural network grid
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.12)';
      ctx.lineWidth = 1;
      
      const nodeSpacing = 120;
      const nodes: Array<{x: number, y: number, pulse: number}> = [];
      
      // Create neural network nodes
      for (let x = nodeSpacing; x < canvas.width; x += nodeSpacing) {
        for (let y = nodeSpacing; y < canvas.height; y += nodeSpacing) {
          const pulse = Math.sin(animationTime * 2 + x * 0.01 + y * 0.01);
          nodes.push({x, y, pulse});
          
          // Draw pulsing node
          const nodeSize = 3 + pulse * 2;
          const opacity = 0.3 + pulse * 0.2;
          ctx.fillStyle = `rgba(20, 184, 166, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer ring
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize + 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Connect nearby nodes with animated lines
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < nodeSpacing * 1.5) {
            const connectionStrength = Math.sin(animationTime + i * 0.1) * 0.5 + 0.5;
            const opacity = (1 - distance / (nodeSpacing * 1.5)) * connectionStrength * 0.15;
            
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            
            // Data packet animation
            if (Math.random() < 0.001) {
              const progress = (animationTime * 50) % 1;
              const packetX = node.x + (otherNode.x - node.x) * progress;
              const packetY = node.y + (otherNode.y - node.y) * progress;
              
              ctx.fillStyle = 'rgba(79, 70, 229, 0.8)';
              ctx.beginPath();
              ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Advanced DNA helix with base pairs
      const drawAdvancedDNA = (startX: number, startY: number, length: number) => {
        const amplitude = 40;
        const frequency = 0.015;
        
        // Main strands with gradient
        const gradient1 = ctx.createLinearGradient(startX, startY - amplitude, startX, startY + amplitude);
        gradient1.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
        gradient1.addColorStop(1, 'rgba(20, 184, 166, 0.15)');
        
        ctx.strokeStyle = gradient1;
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(79, 70, 229, 0.3)';
        ctx.shadowBlur = 5;
        
        // First strand
        ctx.beginPath();
        for (let i = 0; i < length; i++) {
          const x = startX + i;
          const y = startY + Math.sin((i + animationTime * 50) * frequency) * amplitude;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Second strand
        ctx.beginPath();
        for (let i = 0; i < length; i++) {
          const x = startX + i;
          const y = startY + Math.sin((i + animationTime * 50) * frequency + Math.PI) * amplitude;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Animated base pairs
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < length; i += 12) {
          const phase = (i + animationTime * 30) * frequency;
          const y1 = startY + Math.sin(phase) * amplitude;
          const y2 = startY + Math.sin(phase + Math.PI) * amplitude;
          const x = startX + i;
          
          // Animate connection strength
          const connectionPhase = Math.sin(animationTime * 3 + i * 0.1);
          const opacity = 0.1 + connectionPhase * 0.1;
          ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
          
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
          
          // Base pair markers
          ctx.fillStyle = `rgba(239, 68, 68, ${opacity + 0.1})`;
          ctx.beginPath();
          ctx.arc(x, y1, 1.5, 0, Math.PI * 2);
          ctx.arc(x, y2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      // Draw multiple animated DNA helixes
      for (let x = 200; x < canvas.width; x += 500) {
        for (let y = 150; y < canvas.height; y += 350) {
          drawAdvancedDNA(x, y, 280);
        }
      }

      // Enhanced ECG waves with medical data
      const drawAdvancedECG = (startX: number, startY: number) => {
        // Background grid
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 300; i += 20) {
          ctx.beginPath();
          ctx.moveTo(startX + i, startY - 40);
          ctx.lineTo(startX + i, startY + 40);
          ctx.stroke();
        }
        
        // Animated ECG wave
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.4)';
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        const heartRate = 72; // BPM
        const timeOffset = animationTime * 100;
        
        for (let i = 0; i < 300; i++) {
          const x = startX + i;
          let y = startY;
          
          // Heart beat pattern
          const beatPhase = ((i + timeOffset) * heartRate) % 200;
          if (beatPhase < 20) {
            // P wave
            y += Math.sin(beatPhase * Math.PI / 20) * 3;
          } else if (beatPhase < 40) {
            // QRS complex
            const qrsPhase = (beatPhase - 20) / 20;
            if (qrsPhase < 0.3) y -= qrsPhase * 30;
            else if (qrsPhase < 0.5) y += (qrsPhase - 0.3) * 80;
            else if (qrsPhase < 0.8) y -= (qrsPhase - 0.5) * 50;
            else y += (qrsPhase - 0.8) * 15;
          } else if (beatPhase < 80) {
            // T wave
            const tPhase = (beatPhase - 40) / 40;
            y += Math.sin(tPhase * Math.PI) * 8;
          }
          
          // Add slight noise
          y += (Math.random() - 0.5) * 0.5;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // BPM indicator
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.font = '12px monospace';
        ctx.fillText(`${heartRate} BPM`, startX + 250, startY - 30);
      };

      // Draw animated ECG patterns
      for (let y = 250; y < canvas.height; y += 300) {
        drawAdvancedECG(80, y);
      }

      // Molecular network visualization
      const drawMolecularNetwork = (centerX: number, centerY: number) => {
        const moleculeRadius = 60;
        const atomCount = 6;
        
        for (let i = 0; i < atomCount; i++) {
          const angle = (i / atomCount) * Math.PI * 2 + animationTime;
          const x = centerX + Math.cos(angle) * moleculeRadius;
          const y = centerY + Math.sin(angle) * moleculeRadius;
          
          // Atom
          const atomPulse = Math.sin(animationTime * 3 + i) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(79, 70, 229, ${0.15 * atomPulse})`;
          ctx.beginPath();
          ctx.arc(x, y, 8 * atomPulse, 0, Math.PI * 2);
          ctx.fill();
          
          // Electron orbits
          ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * atomPulse})`;
          ctx.lineWidth = 1;
          for (let j = 0; j < 2; j++) {
            ctx.beginPath();
            ctx.arc(x, y, 15 + j * 8, 0, Math.PI * 2);
            ctx.stroke();
          }
          
          // Bonds to center
          if (i > 0) {
            const prevAngle = ((i - 1) / atomCount) * Math.PI * 2 + animationTime;
            const prevX = centerX + Math.cos(prevAngle) * moleculeRadius;
            const prevY = centerY + Math.sin(prevAngle) * moleculeRadius;
            
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.08 * atomPulse})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(prevX, prevY);
            ctx.stroke();
          }
        }
        
        // Center molecule
        ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
        ctx.fill();
      };

      // Draw molecular networks
      for (let x = 400; x < canvas.width; x += 450) {
        for (let y = 200; y < canvas.height; y += 400) {
          drawMolecularNetwork(x, y);
        }
      }

      // Data flow streams
      const drawDataStreams = () => {
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
          const streamY = (i + 1) * (canvas.height / 6);
          const phase = animationTime + i * 0.5;
          
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const wave1 = Math.sin(x * 0.01 + phase) * 20;
            const wave2 = Math.sin(x * 0.005 + phase * 1.5) * 10;
            const y = streamY + wave1 + wave2;
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Data packets
          const packetX = (animationTime * 200 + i * 100) % (canvas.width + 100);
          const packetY = streamY + Math.sin(packetX * 0.01 + phase) * 20 + Math.sin(packetX * 0.005 + phase * 1.5) * 10;
          
          ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
          ctx.beginPath();
          ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawDataStreams();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAdvancedMedicalTech();
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ background: 'transparent' }}
    />
  );
};

export default MedicalTechGrid;