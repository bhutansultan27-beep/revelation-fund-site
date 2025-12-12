import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      
      <footer className="py-8 bg-black border-t border-white/5 text-center">
        <p className="text-gray-500 font-rajdhani text-sm">
          © {new Date().getFullYear()} Revelation Fund. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
