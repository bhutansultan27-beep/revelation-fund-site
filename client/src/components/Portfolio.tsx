import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { 
  SiBinance 
} from "react-icons/si";

// Placeholder component for missing icons - Minimalist Style
const GenericIcon = ({ name }: { name: string }) => (
  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white font-sans text-sm">
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
    icon: <SiBinance className="text-3xl text-[#F0B90B]" />
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
    <section id="portfolio" className="py-32 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Label Column */}
          <div className="md:col-span-3">
             <h2 className="text-sm font-sans font-bold text-primary tracking-[0.2em] uppercase sticky top-32">
              Portfolio
            </h2>
          </div>

          {/* Grid Column */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
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
                  className="group block border-b border-white/10 pb-8 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-white/80 group-hover:text-white transition-colors">
                      {project.icon}
                    </div>
                    <ArrowUpRight className="text-white/20 group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                  </div>
                  
                  <h4 className="text-lg font-sans font-medium text-white mb-2 tracking-wide">
                    {project.name}
                  </h4>
                  
                  <p className="text-gray-500 font-sans text-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
