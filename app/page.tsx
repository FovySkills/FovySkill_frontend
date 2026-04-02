import { NetworkBackground } from "../components/NetworkBackground";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Trust } from "../components/Trust";
import { BentoGrid } from "../components/BentoGrid";
import { Narrative } from "../components/Narrative";
import { Team } from "../components/Team";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen font-sans w-full overflow-x-hidden pt-12 bg-white">
      <NetworkBackground />
      <Navbar />
      <Hero />
      <Trust />
      <BentoGrid />
      <Narrative />
      <Team />
      <ContactCTA />
      <Footer />
    </main>
  );
}
