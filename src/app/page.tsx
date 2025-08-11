import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import HowToSection from "./_components/how-to-section";
import ImploreSection from "./_components/implore-section";
import { Navbar } from "./_components/navbar";
import PlansSection from "./_components/plan-section";
import SolutionSection from "./_components/solution-section";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />

      <HeroSection />

      <SolutionSection />

      <HowToSection />

      <PlansSection />

      <ImploreSection />

      <Footer />
    </main>
  );
}
