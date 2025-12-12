import { motion } from "framer-motion";
import GeometricBackground from "./GeometricBackground";

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-white relative flex items-center justify-center py-24">
      {/* Background - Reusing geometric shape but faded */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <GeometricBackground />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Logo Mark for About */}
          <div className="md:w-1/4">
             {/* Empty or logo mark could go here */}
          </div>

          <div className="md:w-3/4 space-y-8 font-mono text-sm md:text-base text-gray-800 leading-loose">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Revelation Fund is a VC arm for a global crypto OTC desk, with a focal point towards investing in blockchain and cryptocurrencies technology.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We have been deeply established in the crypto markets since 2013, providing liquidity towards private banks & institutional investors aswell as investing in liquid cryptocurrencies and early stage funding rounds.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We aim to be incubators of the project we invest in, and aid projects with liquidity, market making, marketing, and connecting founders with our vast network.
            </motion.p>
          </div>
        </div>
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
