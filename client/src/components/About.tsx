import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 bg-black relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Label Column */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-sans font-bold text-primary tracking-[0.2em] uppercase sticky top-32">
              About Us
            </h2>
          </div>

          {/* Content Column */}
          <div className="md:col-span-9 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl md:text-2xl font-sans font-light text-gray-200 leading-relaxed mb-8">
                Revelation Fund is a VC arm for a global crypto OTC desk, with a focal point towards investing in blockchain and cryptocurrencies technology.
              </p>
              
              <div className="w-20 h-px bg-primary mb-8" />
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6 font-light">
                We have been deeply established in the crypto markets since 2013, providing liquidity towards private banks & institutional investors aswell as investing in liquid cryptocurrencies and early stage funding rounds.
              </p>

              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                We aim to be incubators of the project we invest in, and aid projects with liquidity, market making, marketing, and connecting founders with our vast network.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
