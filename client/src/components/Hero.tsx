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
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_30px_rgba(74,222,128,0.15)] mx-auto mb-8 bg-black">
             <img src={logo} alt="Revelation Fund" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white tracking-tighter mb-4">
            REVELATION <span className="text-primary">FUND</span>
          </h1>
          
          <p className="text-lg md:text-xl font-rajdhani text-gray-400 tracking-wide max-w-2xl mx-auto mb-10">
            LIQUIDITY • INCUBATION • BLOCKCHAIN
          </p>

          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://medium.com/mantra-dao/mantra-dao-entices-institutional-and-retail-investors-from-all-corners-of-the-world-fbace8222e01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <FaMedium className="text-xl text-white group-hover:text-black transition-colors" />
            </a>
            
            <a 
              href="https://x.com/revelationfrank?s=21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <SiX className="text-lg text-white group-hover:text-black transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
