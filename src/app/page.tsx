import Navbar from "@/components/navbar/navbar";
import Hero from "@/sections/hero/hero";
import Features from "@/sections/features/features";
import HowItWorks from "@/sections/how-it-works/how-it-works";
import Pricing from "@/sections/pricing/pricing";
import Solutions from "@/sections/solutions/solutions";
import Plan from "@/sections/pricing/plan";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Solutions />
      <Plan />
    </main>
  );
}
