import { motion } from "framer-motion";
import { FaMedium } from "react-icons/fa";
import { SiX } from "react-icons/si"; 
import logo from "@assets/d7875c16-a616-404e-a523-fbbd4ebe6785-removebg-preview_1765559681672.png";
import VantaGlobe from "./VantaGlobe"; 

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      {/* Vanta Globe Background - positioned to the right */}
      <div className="absolute inset-0 z-0">
        <VantaGlobe />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo Only - Centered */}
          <div className="mb-8"> 
             <img src={logo} alt="Revelation Fund" className="w-64 h-auto object-contain rounded-lg" />
          </div>
          
          {/* Social Links - Minimal Icons below */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <a 
              href="https://x.com/revelationfrank?s=21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors duration-300"
            >
              <SiX className="text-xl" />
            </a>
            <a 
              href="https://medium.com/mantra-dao/mantra-dao-entices-institutional-and-retail-investors-from-all-corners-of-the-world-fbace8222e01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors duration-300"
            >
              <FaMedium className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer Copy */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="font-mono text-xs text-gray-500">
          © {new Date().getFullYear()} Revelation Fund
        </p>
      </div>
    </section>
  );
}
