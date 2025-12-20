import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const hideIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
          
          // Function to remove the center sphere mesh
          const removeCenterSphere = () => {
            if (effect.scene) {
              const objectsToRemove: THREE.Object3D[] = [];
              
              effect.scene.traverse((object: any) => {
                // Look for the sphere geometry that creates the dot
                if (object.isMesh && object.geometry) {
                  const geom = object.geometry;
                  
                  // The center sphere is typically an IcosahedronGeometry
                  // or has vertex count around 12-42 for a simple sphere
                  if (
                    geom.type === 'IcosahedronGeometry' ||
                    (geom.attributes.position && 
                     geom.attributes.position.count < 100 &&
                     object.position.length() < 1)
                  ) {
                    objectsToRemove.push(object);
                  }
                }
              });
              
              // Remove all identified center sphere meshes
              objectsToRemove.forEach(obj => {
                if (obj.parent) {
                  obj.parent.remove(obj);
                }
              });
            }
          };
          
          // Remove on first render
          setTimeout(removeCenterSphere, 50);
          
          // Keep removing it periodically in case it regenerates
          if (hideIntervalRef.current) {
            clearInterval(hideIntervalRef.current);
          }
          hideIntervalRef.current = setInterval(removeCenterSphere, 200);
          
          setVantaEffect(effect);
        }
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    loadVanta();

    return () => {
      if (hideIntervalRef.current) {
        clearInterval(hideIntervalRef.current);
      }
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
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
