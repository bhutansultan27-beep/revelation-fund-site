import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-foreground overflow-x-hidden">
      <Link href="/" className="fixed top-0 left-0 z-50 p-8 md:p-12 text-base font-mono text-gray-800 hover:text-black transition-colors cursor-pointer">
        Home
      </Link>
      <Navbar />
      <About />
    </main>
  );
}
