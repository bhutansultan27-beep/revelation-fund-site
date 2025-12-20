import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

type EffectType = 'rings' | 'topology' | 'waves' | 'halo' | 'dots';

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
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
      }

      if (!vantaRef.current) return;

      try {
        let VANTA: any;
        const config: any = {
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
            config.waveHeight = 20;
            config.waveSpeed = 0.5;
            break;
          case 'halo':
            VANTA = await import('vanta/dist/vanta.halo.min') as any;
            break;
          case 'dots':
            VANTA = await import('vanta/dist/vanta.dots.min') as any;
            config.color2 = 0x0066ff;
            config.particleSize = 4;
            config.particleCount = 4;
            break;
          default:
            VANTA = await import('vanta/dist/vanta.rings.min') as any;
        }

        const effect = VANTA.default(config);
        effectRefValue.current = effect;
        setVantaEffect(effect);
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
        className={`absolute inset-0 ${className}`}
      />
      <div className="absolute bottom-4 left-4 flex gap-2 z-50 flex-wrap max-w-xs">
        <button
          onClick={() => setEffectType('rings')}
          className={`px-3 py-1 text-sm rounded transition ${
            effectType === 'rings'
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
          }`}
        >
          Rings
        </button>
        <button
          onClick={() => setEffectType('topology')}
          className={`px-3 py-1 text-sm rounded transition ${
            effectType === 'topology'
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
          }`}
        >
          Topology
        </button>
        <button
          onClick={() => setEffectType('waves')}
          className={`px-3 py-1 text-sm rounded transition ${
            effectType === 'waves'
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
          }`}
        >
          Waves
        </button>
        <button
          onClick={() => setEffectType('halo')}
          className={`px-3 py-1 text-sm rounded transition ${
            effectType === 'halo'
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
          }`}
        >
          Halo
        </button>
        <button
          onClick={() => setEffectType('dots')}
          className={`px-3 py-1 text-sm rounded transition ${
            effectType === 'dots'
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50'
          }`}
        >
          Dots
        </button>
      </div>
    </>
  );
}
