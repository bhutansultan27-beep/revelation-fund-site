import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 40, 80);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create wavy terrain grid
    const gridSize = 100;
    const segments = 40;
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const originalPositions = new Float32Array(positionAttribute.array);

    const material = new THREE.MeshPhongMaterial({
      color: 0x1a8f4e,
      emissive: 0x0d4d29,
      wireframe: false,
      flatShading: true,
      shininess: 60,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.3;
    scene.add(mesh);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(40, 60, 40);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x1a8f4e, 0.6);
    light2.position.set(-40, 30, -40);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    let time = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < originalPositions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];

        // Base wave from time
        const wave1 = Math.sin(x * 0.08 + time) * Math.cos(y * 0.08 + time) * 5;
        const wave2 = Math.sin((x + y) * 0.05 + time * 0.7) * 4;

        // Mouse influence - ripple from mouse position
        const mouseX = mouseRef.current.x * 50;
        const mouseY = mouseRef.current.y * 30;
        const distToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
        const mouseInfluence = Math.sin(distToMouse * 0.1 - time * 2) / (1 + distToMouse * 0.05) * 6;

        positions[i + 2] = wave1 + wave2 + mouseInfluence;
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Slight rotation
      mesh.rotation.z += 0.0001;

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
