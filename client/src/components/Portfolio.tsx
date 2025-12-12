import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { 
  SiBinance 
} from "react-icons/si";

// Placeholder component for missing icons
const GenericIcon = ({ name }: { name: string }) => (
  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary font-bold text-xl border border-white/10">
    {name.charAt(0)}
  </div>
);

const projects = [
  {
    name: "Compute Labs",
    url: "https://computelabs.ai/",
    description: "Decentralized compute infrastructure for AI training.",
    icon: <GenericIcon name="C" />
  },
  {
    name: "Form AI",
    url: "https://www.formai.us/",
    description: "Next-generation artificial intelligence framework.",
    icon: <GenericIcon name="F" />
  },
  {
    name: "Public AI",
    url: "https://publicai.io/",
    description: "Democratizing access to AI technologies globally.",
    icon: <GenericIcon name="P" />
  },
  {
    name: "Sunrise Layer",
    url: "https://sunriselayer.io/",
    description: "Specialized Data Availability Layer for Rollups.",
    icon: <GenericIcon name="S" />
  },
  {
    name: "Yona Network",
    url: "https://yona.network/",
    description: "Bitcoin Layer 2 scaling solution.",
    icon: <GenericIcon name="Y" />
  },
  {
    name: "EigenLayer",
    url: "https://www.eigenlayer.xyz/",
    description: "Restaking protocol for shared security on Ethereum.",
    icon: <GenericIcon name="E" />
  },
  {
    name: "Mystiko Network",
    url: "https://mystiko.network/",
    description: "Base layer of web3 privacy and scalability.",
    icon: <GenericIcon name="M" />
  },
  {
    name: "Mantra Chain",
    url: "https://www.mantrachain.io/",
    description: "Security-first RWA Layer 1 Blockchain.",
    icon: <GenericIcon name="M" />
  },
  {
    name: "Binance",
    url: "https://binance.com",
    description: "The world's leading cryptocurrency exchange.",
    icon: <SiBinance className="text-4xl text-[#F0B90B]" />
  },
  {
    name: "Crush",
    url: "https://www.crush.xyz/",
    description: "Innovative DeFi protocol for optimized yields.",
    icon: <GenericIcon name="C" />
  },
  {
    name: "Tellor",
    url: "https://tellor.io/",
    description: "Decentralized oracle protocol for blockchain data.",
    icon: <GenericIcon name="T" />
  },
  {
    name: "Ferrum Network",
    url: "https://ferrum.network/",
    description: "Interoperability network connecting blockchains.",
    icon: <GenericIcon name="F" />
  },
  {
    name: "THORChain",
    url: "https://thorchain.org/",
    description: "Decentralized cross-chain liquidity protocol.",
    icon: <GenericIcon name="T" />
  },
  {
    name: "DAO Maker",
    url: "https://app.daomaker.com/",
    description: "Leading crypto launchpad and incubator.",
    icon: <GenericIcon name="D" />
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-rajdhani font-bold text-primary tracking-[0.2em] uppercase mb-4">Our Investments</h2>
          <h3 className="text-3xl md:text-5xl font-orbitron font-bold text-white">
            Portfolio
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group glass-panel p-8 rounded-xl hover:border-primary/50 transition-all duration-300 flex flex-col items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="text-primary" size={20} />
              </div>
              
              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {project.icon}
              </div>
              
              <h4 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h4>
              
              <p className="text-gray-400 font-sans text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="text-xs font-rajdhani font-bold text-primary/70 uppercase tracking-widest mt-auto">
                Visit Website
              </div>
              
              {/* Hover Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
