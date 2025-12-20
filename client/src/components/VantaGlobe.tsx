import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

declare module 'vanta/dist/vanta.globe.min' {
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
        const VANTA = await import('vanta/dist/vanta.globe.min');
        
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
            color2: 0x0d4d29,
            backgroundColor: 0xffffff,
            size: 1,
            points: 0,
            maxDistance: 20.00,
            dotSize: 0,
          });
          
          // Remove the globe mesh from the scene after effect initializes
          setTimeout(() => {
            if (effect.scene) {
              effect.scene.traverse((object: any) => {
                // Remove globe geometry (typically a sphere mesh)
                if (object.geometry && object.geometry.type === 'IcosahedronGeometry') {
                  effect.scene.remove(object);
                }
              });
            }
          }, 100);
          
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