import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-foreground overflow-x-hidden">
      <Navbar />
      <Portfolio />
    </main>
  );
}
