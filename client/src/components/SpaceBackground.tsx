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

    let time = 0;

    interface Wave {
      amplitude: number;
      frequency: number;
      speed: number;
      yOffset: number;
      color: string;
      thickness: number;
    }

    const waves: Wave[] = [
      { amplitude: 80, frequency: 0.008, speed: 0.015, yOffset: 0.3, color: 'rgba(74, 222, 128, 0.15)', thickness: 120 },
      { amplitude: 60, frequency: 0.012, speed: 0.02, yOffset: 0.4, color: 'rgba(34, 197, 94, 0.1)', thickness: 100 },
      { amplitude: 100, frequency: 0.006, speed: 0.01, yOffset: 0.5, color: 'rgba(20, 83, 45, 0.2)', thickness: 150 },
      { amplitude: 50, frequency: 0.015, speed: 0.025, yOffset: 0.6, color: 'rgba(74, 222, 128, 0.08)', thickness: 80 },
      { amplitude: 70, frequency: 0.01, speed: 0.018, yOffset: 0.7, color: 'rgba(22, 163, 74, 0.12)', thickness: 110 },
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const y = height * wave.yOffset + 
                    Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                    Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, height * wave.yOffset - wave.amplitude, 0, height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.02;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const pulseOpacity = particle.opacity * (0.5 + Math.sin(particle.pulse) * 0.5);
        
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glow.addColorStop(0, `rgba(74, 222, 128, ${pulseOpacity})`);
        glow.addColorStop(1, 'rgba(74, 222, 128, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 1;
      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 bg-black"
    />
  );
}
