import { HeroSection } from "@/components/sections/HeroSection";
import { ConquistasSection } from "@/components/sections/ConquistasSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ExpectativaSection } from "@/components/sections/ExpectativaSection";
import { DicionarioSection } from "@/components/sections/DicionarioSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ConquistasSection />
      <StatsSection />
      <ExpectativaSection />
      <DicionarioSection />
      <TimelineSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
