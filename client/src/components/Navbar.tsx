import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { name: "about", href: "/about" },
    { name: "portfolio", href: "/portfolio" },
  ];

  return (
    <nav className="fixed top-0 right-0 z-50 p-8 md:p-12">
      <div className="flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className={`text-base font-mono transition-colors cursor-pointer ${
              location === link.href ? "text-black dark:text-white font-bold" : "text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
