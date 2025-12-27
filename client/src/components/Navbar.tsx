import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "portfolio", href: "/portfolio" },
  ];

  const homeLink = navLinks[0];
  const otherLinks = navLinks.slice(1);

  return (
    <nav className="p-8 md:p-12 flex justify-between items-center">
      <Link 
        href={homeLink.href}
        className={`text-base font-mono transition-colors cursor-pointer ${
          location === homeLink.href ? "text-black font-bold" : "text-gray-800 hover:text-black"
        }`}
      >
        {homeLink.name}
      </Link>
      
      <div className="flex items-center space-x-6">
        {otherLinks.map((link) => (
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
