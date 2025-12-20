import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

declare module 'vanta/dist/vanta.net.min' {
  const VANTA: any;
  export default VANTA;
}

declare global {
  interface Window {
    VANTA: any;
  }
}

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (vantaEffect) return;
      
      try {
        const VANTA = await import('vanta/dist/vanta.net.min');
        
        if (vantaRef.current && !vantaEffect) {
          const effect = VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x1a8f4e,
            backgroundColor: 0xffffff,
            points: 15,
            maxDistance: 20.00,
            speed: 1,
          });
          
          setVantaEffect(effect);
        }
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={vantaRef} 
      className={`absolute inset-0 ${className}`}
    />
  );
}