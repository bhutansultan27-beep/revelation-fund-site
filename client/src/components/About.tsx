import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-rajdhani font-bold text-primary tracking-[0.2em] uppercase mb-4">Who We Are</h2>
            <h3 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6">
              Catalysts for <span className="text-gray-500">Decentralized</span> Future
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-gray-300 font-sans leading-relaxed text-lg"
            >
              <p>
                Revelation Fund is a VC arm for a global crypto OTC desk, with a focal point towards investing in blockchain and cryptocurrencies technology.
              </p>
              <p>
                We have been deeply established in the crypto markets since 2013, providing liquidity towards private banks & institutional investors aswell as investing in liquid cryptocurrencies and early stage funding rounds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-8 rounded-2xl relative"
            >
              <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
              
              <p className="text-white font-rajdhani text-xl leading-relaxed italic">
                "We aim to be incubators of the project we invest in, and aid projects with liquidity, market making, marketing, and connecting founders with our vast network."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
