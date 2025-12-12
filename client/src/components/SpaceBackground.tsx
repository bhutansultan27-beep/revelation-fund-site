import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Particles/Stars
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const starCount = 200;

    // Nebula clouds (simulated with large glowing particles)
    const nebulas: { x: number; y: number; radius: number; color: string; vx: number; vy: number }[] = [];
    
    // Initialize Stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    // Initialize Nebula Clouds - matching the green theme
    const colors = [
      'rgba(20, 80, 40, 0.15)', // Dark Green
      'rgba(74, 222, 128, 0.05)', // Bright Green (very transparent)
      'rgba(10, 30, 20, 0.2)',  // Very Dark Green
    ];

    for (let i = 0; i < 6; i++) {
      nebulas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background
      // ctx.fillStyle = '#050505'; // Very dark bg
      // ctx.fillRect(0, 0, width, height);

      // Draw Nebulas
      nebulas.forEach(nebula => {
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        // Bounce off edges (softly)
        if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius;
        if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = height + nebula.radius;
        if (nebula.y > height + nebula.radius) nebula.y = -nebula.radius;

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Stars
      ctx.fillStyle = '#FFFFFF';
      stars.forEach(star => {
        star.y -= star.speed; // Move up
        
        // Reset if out of bounds
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 bg-black"
    />
  );
}
