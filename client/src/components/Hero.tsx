import { motion } from "framer-motion";
import { FaMedium } from "react-icons/fa";
import { SiX } from "react-icons/si"; 
import logo from "@assets/d7875c16-a616-404e-a523-fbbd4ebe6785_1765556399619.jpeg";
import SpaceBackground from "./SpaceBackground";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground />
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Darker Overlay for Contrast */}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="mb-10">
            <div className="w-56 h-56 rounded-full overflow-hidden bg-black border-4 border-white/5 shadow-2xl">
               <img src={logo} alt="Revelation Fund" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Title - Clean & Sharp */}
          <h1 className="text-4xl md:text-5xl font-sans font-light text-white tracking-[0.2em] mb-4 uppercase">
            Revelation Fund
          </h1>

          {/* Social Links - Directly underneath */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <a 
              href="https://medium.com/mantra-dao/mantra-dao-entices-institutional-and-retail-investors-from-all-corners-of-the-world-fbace8222e01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <FaMedium className="text-2xl" />
            </a>
            
            <a 
              href="https://x.com/revelationfrank?s=21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <SiX className="text-2xl" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
