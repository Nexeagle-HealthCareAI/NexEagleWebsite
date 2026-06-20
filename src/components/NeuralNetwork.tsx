import { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
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

    interface NeuralNode {
      x: number;
      y: number;
      radius: number;
      connections: number[];
      activation: number;
      targetActivation: number;
      layer: number;
      type: 'input' | 'hidden' | 'output';
      pulse: number;
    }

    const nodes: NeuralNode[] = [];
    const layers = 5;
    const nodesPerLayer = [6, 8, 10, 8, 4]; // Input -> Hidden layers -> Output
    let nodeId = 0;

    // Create neural network structure
    for (let layer = 0; layer < layers; layer++) {
      const layerX = (canvas.width / (layers + 1)) * (layer + 1);
      const nodeCount = nodesPerLayer[layer];
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeY = (canvas.height / (nodeCount + 1)) * (i + 1);
        
        nodes.push({
          x: layerX,
          y: nodeY,
          radius: 12 + Math.random() * 8,
          connections: [],
          activation: Math.random(),
          targetActivation: Math.random(),
          layer,
          type: layer === 0 ? 'input' : layer === layers - 1 ? 'output' : 'hidden',
          pulse: Math.random() * Math.PI * 2
        });
        
        nodeId++;
      }
    }

    // Create connections between adjacent layers
    let currentIndex = 0;
    for (let layer = 0; layer < layers - 1; layer++) {
      const currentLayerSize = nodesPerLayer[layer];
      const nextLayerSize = nodesPerLayer[layer + 1];
      
      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          // Connect to random subset of next layer nodes
          if (Math.random() < 0.7) { // 70% connection probability
            nodes[currentIndex + i].connections.push(currentIndex + currentLayerSize + j);
          }
        }
      }
      currentIndex += currentLayerSize;
    }

    let animationTime = 0;

    const drawNeuralNetwork = () => {
      animationTime += 0.02;
      
      // Update node activations with smooth transitions
      nodes.forEach((node, index) => {
        // Randomly change target activation
        if (Math.random() < 0.005) {
          node.targetActivation = Math.random();
        }
        
        // Smooth activation transition
        node.activation += (node.targetActivation - node.activation) * 0.02;
        node.pulse += 0.1;
        
        // Input layer gets random activations more frequently
        if (node.type === 'input' && Math.random() < 0.01) {
          node.targetActivation = Math.random();
        }
      });

      // Draw connections with data flow animation
      nodes.forEach((node, nodeIndex) => {
        node.connections.forEach(connectionIndex => {
          const targetNode = nodes[connectionIndex];
          if (!targetNode) return;
          
          const weight = 0.3 + node.activation * 0.7;
          const opacity = weight * 0.4;
          
          // Connection line
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
          ctx.lineWidth = 1 + weight * 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
          
          // Data flow animation
          if (node.activation > 0.6) {
            const flowProgress = (animationTime * 2 + nodeIndex * 0.1) % 1;
            const flowX = node.x + (targetNode.x - node.x) * flowProgress;
            const flowY = node.y + (targetNode.y - node.y) * flowProgress;
            
            ctx.fillStyle = `rgba(20, 184, 166, ${weight * 0.8})`;
            ctx.beginPath();
            ctx.arc(flowX, flowY, 2 + weight * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Glowing trail
            ctx.shadowColor = 'rgba(20, 184, 166, 0.5)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.2;
        const nodeRadius = node.radius * pulseScale;
        
        // Node glow based on activation
        if (node.activation > 0.3) {
          ctx.shadowColor = node.type === 'input' ? 'rgba(34, 197, 94, 0.6)' : 
                           node.type === 'output' ? 'rgba(239, 68, 68, 0.6)' : 
                           'rgba(79, 70, 229, 0.6)';
          ctx.shadowBlur = 8 + node.activation * 12;
        }
        
        // Node color based on type and activation
        const baseColor = node.type === 'input' ? 'rgba(34, 197, 94, ' :
                         node.type === 'output' ? 'rgba(239, 68, 68, ' :
                         'rgba(79, 70, 229, ';
        
        const opacity = 0.3 + node.activation * 0.7;
        ctx.fillStyle = baseColor + opacity + ')';
        
        // Main node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.fillStyle = baseColor + (opacity + 0.3) + ')';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Activation ring
        if (node.activation > 0.5) {
          ctx.strokeStyle = baseColor + '0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius + 4, 0, Math.PI * 2 * node.activation);
          ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
        
        // Node label for input/output
        if (node.type === 'input' || node.type === 'output') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          const label = node.type === 'input' ? 'IN' : 'OUT';
          ctx.fillText(label, node.x, node.y + 3);
        }
      });

      // Draw layer labels
      ctx.fillStyle = 'rgba(156, 163, 175, 0.6)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      for (let layer = 0; layer < layers; layer++) {
        const layerX = (canvas.width / (layers + 1)) * (layer + 1);
        const label = layer === 0 ? 'Input Layer' :
                     layer === layers - 1 ? 'Output Layer' :
                     `Hidden ${layer}`;
        ctx.fillText(label, layerX, 30);
      }

      // Performance metrics
      ctx.fillStyle = 'rgba(20, 184, 166, 0.7)';
      ctx.font = '14px monospace';
      ctx.textAlign = 'left';
      
      const avgActivation = nodes.reduce((sum, node) => sum + node.activation, 0) / nodes.length;
      const networkLoad = Math.round(avgActivation * 100);
      
      ctx.fillText(`Network Load: ${networkLoad}%`, 20, canvas.height - 60);
      ctx.fillText(`Active Nodes: ${nodes.filter(n => n.activation > 0.5).length}/${nodes.length}`, 20, canvas.height - 40);
      ctx.fillText(`Processing Rate: ${Math.round(animationTime * 10) % 100} Hz`, 20, canvas.height - 20);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNeuralNetwork();
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
      className="fixed inset-0 pointer-events-none z-0 opacity-25"
      style={{ background: 'transparent' }}
    />
  );
};

export default NeuralNetwork;