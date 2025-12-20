import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRefValue = useRef<any>(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (effectRefValue.current) {
        try {
          effectRefValue.current.destroy();
        } catch (e) {
          console.error('Error destroying effect:', e);
        }
        effectRefValue.current = null;
      }

      if (!vantaRef.current) return;

      try {
        const VANTA = await import('vanta/dist/vanta.rings.min') as any;
        
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
          color: 0x00d4ff,
          backgroundColor: 0xffffff,
        });

        effectRefValue.current = effect;
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className={`absolute inset-0 ${className}`}
    />
  );
}
