import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create animated flowing mesh
    const geometry = new THREE.IcosahedronGeometry(30, 6);
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const originalPositions = positions.array.slice() as any;

    const material = new THREE.MeshPhongMaterial({
      color: 0x1a8f4e,
      emissive: 0x0d4d29,
      wireframe: false,
      shininess: 100,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(50, 50, 50);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x1a8f4e, 0.5);
    light2.position.set(-50, -50, 50);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationTime = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      animationTime += 0.01;

      // Deform geometry
      const pos = positions.array as Float32Array;
      for (let i = 0; i < originalPositions.length; i++) {
        const original = originalPositions[i];
        const wave1 = Math.sin(original / 20 + animationTime) * 3;
        const wave2 = Math.cos(original / 15 + animationTime * 0.7) * 2;
        pos[i] = original + wave1 + wave2;
      }
      positions.needsUpdate = true;

      // Rotate and follow mouse
      mesh.rotation.x += 0.0005;
      mesh.rotation.y += 0.001;
      
      // Mouse influence
      mesh.rotation.x += (mouseRef.current.y - 0.5) * 0.3;
      mesh.rotation.y += (mouseRef.current.x - 0.5) * 0.3;

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
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
}
