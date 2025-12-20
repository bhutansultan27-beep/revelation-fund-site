import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

type EffectType = 'rings' | 'topology' | 'waves' | 'halo';

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [effectType, setEffectType] = useState<EffectType>('rings');
  const effectRefValue = useRef<any>(null);

  useEffect(() => {
    const loadVanta = async () => {
      // Destroy previous effect
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
        let VANTA: any;
        const baseConfig: any = {
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
        };

        switch (effectType) {
          case 'rings':
            VANTA = await import('vanta/dist/vanta.rings.min') as any;
            break;
          case 'topology':
            VANTA = await import('vanta/dist/vanta.topology.min') as any;
            break;
          case 'waves':
            VANTA = await import('vanta/dist/vanta.waves.min') as any;
            baseConfig.waveHeight = 20;
            baseConfig.waveSpeed = 0.5;
            break;
          case 'halo':
            VANTA = await import('vanta/dist/vanta.halo.min') as any;
            break;
          default:
            VANTA = await import('vanta/dist/vanta.rings.min') as any;
        }

        const effect = VANTA.default(baseConfig);
        effectRefValue.current = effect;
      } catch (error) {
        console.error(`Failed to load ${effectType} effect:`, error);
      }
    };

    loadVanta();
  }, [effectType]);

  return (
    <>
      <div 
        ref={vantaRef} 
        className={`absolute inset-0 pointer-events-none ${className}`}
      />
      <div className="fixed bottom-4 left-4 flex gap-2 z-50 flex-wrap pointer-events-auto">
        {(['rings', 'topology', 'waves', 'halo'] as const).map((effect) => (
          <button
            key={effect}
            onClick={() => setEffectType(effect)}
            className={`px-3 py-1 text-sm rounded transition whitespace-nowrap cursor-pointer ${
              effectType === effect
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
            }`}
          >
            {effect.charAt(0).toUpperCase() + effect.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
}
