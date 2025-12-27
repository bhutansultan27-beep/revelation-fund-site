import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { name: "home", href: "/" },
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
              location === link.href ? "text-black font-bold" : "text-gray-800 hover:text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
