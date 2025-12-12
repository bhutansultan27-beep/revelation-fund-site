import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { 
  SiBinance 
} from "react-icons/si";

// Minimal Square Icon Placeholder
const GenericIcon = ({ name }: { name: string }) => (
  <div className="w-16 h-16 bg-black flex items-center justify-center text-white font-sans text-2xl font-light">
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
    icon: <SiBinance className="text-6xl text-black" />
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
    <section id="portfolio" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-20 pl-4 md:pl-0">
          <h2 className="text-2xl font-mono text-black tracking-wide">
            Main
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gray-50 p-8 md:p-12 flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-32 flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all">
                {project.icon}
              </div>
              
              <p className="font-mono text-xs text-gray-500 leading-relaxed mb-12 flex-grow max-w-xs mx-auto">
                {project.description}
              </p>
              
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
              >
                website <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
