import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Logo Placeholder using Clearbit or fallback to letter
const ProjectLogo = ({ name, url, logo }: { name: string, url: string, logo?: string }) => {
  const domain = new URL(url).hostname;
  const isComputeLabs = name === "Compute Labs";
  const isYonaNetwork = name === "Yona Network";
  const isEigenLayer = name === "EigenLayer";
  
  return (
    <div className="w-full flex items-center justify-center h-48 mb-6">
       <img 
         src={logo || `https://logo.clearbit.com/${domain}`} 
         alt={`${name} logo`}
         className={`w-auto h-auto object-contain group-hover:opacity-100 transition-all duration-300 brightness-0 ${
           isComputeLabs || isYonaNetwork || isEigenLayer ? "max-w-[200px] max-h-[100px] scale-90" : "max-w-[320px] max-h-[160px] scale-125"
         }`}
         onError={(e) => {
           // Fallback if image fails
           e.currentTarget.style.display = 'none';
           const parent = e.currentTarget.parentElement;
           if (parent) {
             const fallback = document.createElement('div');
             fallback.className = "text-2xl font-bold font-sans text-black tracking-tighter uppercase border-2 border-black p-4";
             fallback.innerText = name;
             parent.appendChild(fallback);
           }
         }}
       />
    </div>
  );
};

const projects = [
  {
    name: "Compute Labs",
    url: "https://computelabs.ai/",
    logo: "/compute-labs-logo-new.webp",
    description: "Decentralized compute infrastructure for AI training.",
  },
  {
    name: "Public AI",
    url: "https://publicai.io/",
    logo: "/public-ai-logo.svg",
    description: "Democratizing access to AI technologies globally.",
  },
  {
    name: "Sunrise Layer",
    url: "https://sunriselayer.io/",
    logo: "/sunrise-layer-logo-new.png",
    description: "Specialized Data Availability Layer for Rollups.",
  },
  {
    name: "Yona Network",
    url: "https://yona.network/",
    logo: "/yona-network-logo.webp",
    description: "Bitcoin Layer 2 scaling solution.",
  },
  {
    name: "EigenLayer",
    url: "https://www.eigenlayer.xyz/",
    logo: "/eigen-layer-logo.webp",
    description: "Restaking protocol for shared security on Ethereum.",
  },
  {
    name: "Mystiko Network",
    url: "https://mystiko.network/",
    description: "Base layer of web3 privacy and scalability.",
  },
  {
    name: "Mantra Chain",
    url: "https://www.mantrachain.io/",
    description: "Security-first RWA Layer 1 Blockchain.",
  },
  {
    name: "Binance",
    url: "https://binance.com",
    description: "The world's leading cryptocurrency exchange.",
  },
  {
    name: "Crush",
    url: "https://www.crush.xyz/",
    description: "Innovative DeFi protocol for optimized yields.",
  },
  {
    name: "Tellor",
    url: "https://tellor.io/",
    description: "Decentralized oracle protocol for blockchain data.",
  },
  {
    name: "Ferrum Network",
    url: "https://ferrum.network/",
    description: "Interoperability network connecting blockchains.",
  },
  {
    name: "THORChain",
    url: "https://thorchain.org/",
    description: "Decentralized cross-chain liquidity protocol.",
  },
  {
    name: "DAO Maker",
    url: "https://app.daomaker.com/",
    description: "Leading crypto launchpad and incubator.",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
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
              <div className="h-32 w-full flex items-center justify-center mb-6">
                <ProjectLogo name={project.name} url={project.url} logo={project.logo} />
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
