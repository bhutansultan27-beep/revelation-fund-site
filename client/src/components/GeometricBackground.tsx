import { useEffect, useRef } from 'react';

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const size = Math.min(width, height) * 0.35; // Size of the shape

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1; // Very thin lines

      // Draw rotating geometric shape (Wireframe Crystal)
      ctx.beginPath();
      
      const points = [];
      const numPoints = 6; // Hexagon base
      
      // Calculate vertices
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 + time * 0.2;
        points.push({
          x: centerX + Math.cos(angle) * size,
          y: centerY + Math.sin(angle) * size
        });
      }
      
      // Center point (slightly moving)
      const centerPoint = {
        x: centerX + Math.sin(time * 0.5) * 20,
        y: centerY + Math.cos(time * 0.5) * 20
      };

      // Draw outer polygon
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Connect all points to center
      points.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(centerPoint.x, centerPoint.y);
        ctx.stroke();
      });

      // Connect alternating points (internal structure)
      for(let i = 0; i < points.length; i++) {
        const next = (i + 2) % points.length;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[next].x, points[next].y);
        ctx.stroke();
      }

      time += 0.005; // Slow rotation
      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
}
