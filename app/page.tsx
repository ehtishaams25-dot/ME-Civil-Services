import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Categories } from "@/components/sections/Categories";
import { Combined } from "@/components/sections/Combined";
import { Contact } from "@/components/sections/Contact";
import { Decorative } from "@/components/sections/Decorative";
import { Execution } from "@/components/sections/Execution";
import { Exterior } from "@/components/sections/Exterior";
import { Intro } from "@/components/sections/Intro";
import { MetalWood } from "@/components/sections/MetalWood";
import { Painting } from "@/components/sections/Painting";
import { Plumbing } from "@/components/sections/Plumbing";
import { Protective } from "@/components/sections/Protective";
import { Quality } from "@/components/sections/Quality";
import { Reasons } from "@/components/sections/Reasons";
import { Repair } from "@/components/sections/Repair";
import { SurfacePrep } from "@/components/sections/SurfacePrep";
import { SystemSection } from "@/components/sections/SystemSection";
import { WaterSystems } from "@/components/sections/WaterSystems";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import { localBusinessJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data uses only supplied business information.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Intro />
        <ServicesIndex />
        <Plumbing />
        <WaterSystems />
        <Repair />
        <Painting />
        <Exterior />
        <SurfacePrep />
        <Decorative />
        <MetalWood />
        <Protective />
        <Combined />
        <SystemSection />
        <Execution />
        <Categories />
        <Reasons />
        <Quality />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
