import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create interactive particles
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const velocity = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocity[i] = (Math.random() - 0.5) * 0.3;
      velocity[i + 1] = (Math.random() - 0.5) * 0.3;
      velocity[i + 2] = (Math.random() - 0.5) * 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x1a8f4e,
      size: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < particleCount; i += 5) {
      for (let j = i + 5; j < particleCount; j += 5) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 30) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0d4d29,
      transparent: true,
      opacity: 0.3,
      linewidth: 1,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (particles && particlesRef.current) {
        const posAttr = geometry.getAttribute('position');
        const pos = posAttr.array as Float32Array;

        // Update particle positions
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          
          // Add velocity
          pos[idx] += velocity[idx];
          pos[idx + 1] += velocity[idx + 1];
          pos[idx + 2] += velocity[idx + 2];

          // Mouse attraction
          const dx = mouseRef.current.x * 30 - pos[idx];
          const dy = mouseRef.current.y * 30 - pos[idx + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40) {
            const force = (40 - dist) / 40 * 0.02;
            velocity[idx] += (dx / dist) * force;
            velocity[idx + 1] += (dy / dist) * force;
          }

          // Damping
          velocity[idx] *= 0.98;
          velocity[idx + 1] *= 0.98;
          velocity[idx + 2] *= 0.98;

          // Bounds
          if (pos[idx] > 50) pos[idx] = -50;
          if (pos[idx] < -50) pos[idx] = 50;
          if (pos[idx + 1] > 50) pos[idx + 1] = -50;
          if (pos[idx + 1] < -50) pos[idx + 1] = 50;
          if (pos[idx + 2] > 50) pos[idx + 2] = -50;
          if (pos[idx + 2] < -50) pos[idx + 2] = 50;
        }

        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
}
