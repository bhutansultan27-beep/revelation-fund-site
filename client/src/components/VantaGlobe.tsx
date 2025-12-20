import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaGlobeProps {
  className?: string;
}

// Idea 1: Floating crystalline shards
const CrystalBackground = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 50);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const shards: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const geom = new THREE.TetrahedronGeometry(Math.random() * 3 + 1, 3);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1a8f4e,
      emissive: 0x0d4d29,
      shininess: 100,
      wireframe: false,
    });
    const shard = new THREE.Mesh(geom, mat);
    shard.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80
    );
    shard.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    );
    scene.add(shard);
    shards.push(shard);
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    shards.forEach((shard) => {
      shard.position.add(shard.userData.velocity);
      shard.rotation.x += 0.01;
      shard.rotation.y += 0.01;

      if (Math.abs(shard.position.x) > 50) shard.userData.velocity.x *= -1;
      if (Math.abs(shard.position.y) > 50) shard.userData.velocity.y *= -1;
      if (Math.abs(shard.position.z) > 50) shard.userData.velocity.z *= -1;

      const dx = mouseX * 30 - shard.position.x;
      const dy = mouseY * 30 - shard.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 30) {
        shard.userData.velocity.x += (dx / dist) * 0.02;
        shard.userData.velocity.y += (dy / dist) * 0.02;
      }
    });
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  return { scene, renderer, onResize };
};

// Idea 2: Orbiting rings with glow
const OrbitingRingsBackground = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light = new THREE.DirectionalLight(0x1a8f4e, 0.8);
  light.position.set(40, 40, 40);
  scene.add(light);

  const rings: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const geom = new THREE.TorusGeometry(20 + i * 10, 2, 16, 100);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1a8f4e,
      emissive: 0x0d4d29,
      shininess: 100,
    });
    const ring = new THREE.Mesh(geom, mat);
    ring.userData.speed = (Math.random() + 0.5) * 0.01 * (i % 2 === 0 ? 1 : -1);
    scene.add(ring);
    rings.push(ring);
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    rings.forEach((ring, i) => {
      ring.rotation.z += ring.userData.speed;
      ring.rotation.x += mouseY * 0.001;
      ring.rotation.y += mouseX * 0.001;
    });
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  return { scene, renderer, onResize };
};

// Idea 3: Spiraling tunnel
const SpiralTunnelBackground = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 0;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const particles: THREE.Mesh[] = [];
  for (let i = 0; i < 100; i++) {
    const geom = new THREE.SphereGeometry(0.5, 8, 8);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1a8f4e,
      emissive: 0x0d4d29,
    });
    const particle = new THREE.Mesh(geom, mat);
    particle.userData.angle = Math.random() * Math.PI * 2;
    particle.userData.depth = Math.random() * 500 - 250;
    particles.push(particle);
    scene.add(particle);
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  let time = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;

    particles.forEach((p, i) => {
      const angle = p.userData.angle + time * 0.02;
      const radius = 30 + (i % 10) * 5;
      p.position.x = Math.cos(angle) * radius + mouseX * 30;
      p.position.y = Math.sin(angle) * radius + mouseY * 30;
      p.position.z = p.userData.depth + time * 2;

      if (p.position.z > 500) p.userData.depth = -500;
    });

    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  return { scene, renderer, onResize };
};

// Idea 4: Blob/organic morph
const BlobBackground = (container: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 50);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const geom = new THREE.IcosahedronGeometry(25, 6);
  const originalPos = (geom.getAttribute('position') as THREE.BufferAttribute).array.slice();
  const mat = new THREE.MeshPhongMaterial({
    color: 0x1a8f4e,
    emissive: 0x0d4d29,
    shininess: 80,
  });
  const blob = new THREE.Mesh(geom, mat);
  scene.add(blob);

  let time = 0;
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;

    const pos = geom.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < originalPos.length; i++) {
      const orig = (originalPos as any)[i];
      const wave = Math.sin(i / 10 + time) * Math.cos(time * 0.5) * 5;
      arr[i] = orig + wave;
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();

    blob.rotation.x += 0.001 + mouseY * 0.001;
    blob.rotation.y += 0.002 + mouseX * 0.001;

    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  return { scene, renderer, onResize };
};

export default function VantaGlobe({ className = '' }: VantaGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundType, setBackgroundType] = useState<'crystal' | 'rings' | 'spiral' | 'blob'>('rings');
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.width = '100%';
    tempDiv.style.height = '100%';
    tempDiv.style.inset = '0';
    containerRef.current.appendChild(tempDiv);

    let effect;
    switch (backgroundType) {
      case 'crystal':
        effect = CrystalBackground(tempDiv);
        break;
      case 'rings':
        effect = OrbitingRingsBackground(tempDiv);
        break;
      case 'spiral':
        effect = SpiralTunnelBackground(tempDiv);
        break;
      case 'blob':
        effect = BlobBackground(tempDiv);
        break;
    }

    effectRef.current = effect;

    const handleResize = () => effect.onResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tempDiv.parentNode) {
        tempDiv.parentNode.removeChild(tempDiv);
      }
      if (effect.renderer) {
        effect.renderer.dispose();
      }
    };
  }, [backgroundType]);

  return (
    <>
      <div ref={containerRef} className={`absolute inset-0 ${className}`} />
      <div className="absolute bottom-4 left-4 flex gap-2 z-50">
        <button
          onClick={() => setBackgroundType('crystal')}
          className={`px-3 py-1 text-sm rounded ${
            backgroundType === 'crystal'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 border border-green-600'
          }`}
        >
          Crystal
        </button>
        <button
          onClick={() => setBackgroundType('rings')}
          className={`px-3 py-1 text-sm rounded ${
            backgroundType === 'rings'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 border border-green-600'
          }`}
        >
          Rings
        </button>
        <button
          onClick={() => setBackgroundType('spiral')}
          className={`px-3 py-1 text-sm rounded ${
            backgroundType === 'spiral'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 border border-green-600'
          }`}
        >
          Spiral
        </button>
        <button
          onClick={() => setBackgroundType('blob')}
          className={`px-3 py-1 text-sm rounded ${
            backgroundType === 'blob'
              ? 'bg-green-600 text-white'
              : 'bg-white text-green-600 border border-green-600'
          }`}
        >
          Blob
        </button>
      </div>
    </>
  );
}
