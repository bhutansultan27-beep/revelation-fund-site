import { motion } from "framer-motion";
import { FaMedium } from "react-icons/fa";
import { SiX } from "react-icons/si"; 
import logo from "@assets/d7875c16-a616-404e-a523-fbbd4ebe6785-removebg-preview_1765559681672.png";
import VantaGlobe from "./VantaGlobe";
import { useState, useEffect } from "react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Calculate rotation based on mouse position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateY = (e.clientX - centerX) / centerX * 240; // Max 240 degrees (left/right)
      const rotateX = (centerY - e.clientY) / centerY * 240; // Max 240 degrees (up/down)
      
      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ transform: 'scaleX(-1)' }}>
        <VantaGlobe />
      </div>

      {/* White cover box positioned below M link - static, doesn't rotate */}
      <div 
        className="absolute left-1/2 z-20 w-96 h-96 bg-white rounded-full transform -translate-x-1/2"
        style={{
          top: 'calc(50% + 120px)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div 
            className="mb-8"
            animate={{ 
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={{ 
              rotateX: { duration: 0.3, ease: "easeOut" },
              rotateY: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ 
              perspective: 1200,
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={logo} 
              alt="Revelation Fund" 
              className="w-64 h-auto object-contain rounded-lg"
            />
          </motion.div>
          <motion.div 
            className="flex gap-6 mt-4"
            animate={{ 
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={{ 
              rotateX: { duration: 0.3, ease: "easeOut" },
              rotateY: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ 
              perspective: 1200,
              transformStyle: 'preserve-3d'
            }}
          >
            <a 
              href="https://x.com/revelationfrank?s=21" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:text-gray-600 inline-flex items-center justify-center"
              style={{
                filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
              }}
            >
              <SiX className="text-xl" />
            </a>
            <a 
              href="https://medium.com/mantra-dao/mantra-dao-entices-institutional-and-retail-investors-from-all-corners-of-the-world-fbace8222e01" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:text-gray-600 inline-flex items-center justify-center"
              style={{
                filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
              }}
            >
              <FaMedium className="text-2xl" />
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
