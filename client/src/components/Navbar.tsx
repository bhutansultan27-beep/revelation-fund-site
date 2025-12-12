import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "about", href: "/about" },
    { name: "portfolio", href: "/portfolio" },
  ];

  return (
    <nav className="fixed top-0 right-0 z-50 p-8 md:p-12">
      <div className="flex items-center space-x-8">
        {/* Desktop Menu - Typewriter style text */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a 
                className={`text-base font-mono transition-colors ${
                  location === link.href ? "text-black font-bold" : "text-gray-800 hover:text-black"
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 right-8 bg-white shadow-xl border border-gray-100 p-6 rounded-none w-48 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                   <a 
                    className={`text-right text-base font-mono hover:text-black ${
                      location === link.href ? "text-black font-bold" : "text-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
