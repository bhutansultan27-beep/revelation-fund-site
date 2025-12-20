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
        const VANTA = await import('vanta/dist/vanta.globe.min') as any;
        
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
          color: 0x22c55e,
          color2: 0x16a34a,
          backgroundColor: 0xffffff,
          size: 1,
          points: 0,
          maxDistance: 20.00,
          dotSize: 0,
        });

        // Remove the center sphere mesh
        const removeSphere = () => {
          if (effect.scene) {
            const toRemove: THREE.Object3D[] = [];
            effect.scene.traverse((obj: any) => {
              if (obj.isMesh && obj.geometry?.type === 'IcosahedronGeometry') {
                toRemove.push(obj);
              }
            });
            toRemove.forEach(obj => {
              if (obj.parent) obj.parent.remove(obj);
            });
          }
        };

        setTimeout(removeSphere, 100);
        const interval = setInterval(removeSphere, 500);
        const originalDestroy = effect.destroy.bind(effect);
        effect.destroy = () => {
          clearInterval(interval);
          originalDestroy();
        };

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
