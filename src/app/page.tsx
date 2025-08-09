import HeroSection from "./_components/hero-section";
import HowToSection from "./_components/how-to-section";
import { Navbar } from "./_components/navbar";
import SolutionSection from "./_components/solution-section";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SolutionSection />
      <HowToSection />
    </main>
  );
}
