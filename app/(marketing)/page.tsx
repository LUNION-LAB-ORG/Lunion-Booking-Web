import { Suspense } from "react";

import ClientSection from "@/components/marketing/about/client-section";
import CallToActionSection from "@/components/marketing/about/cta-section";
import HeroSection from "@/components/marketing/about/hero-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import PricingSection from "@/components/marketing/about/pricing/pricing-section";


export default async function Home() {

  return (
    <Suspense>
      <HeroSection />
      {/* <ClientSection /> */}
      {/* <SphereMask /> */}
      <PricingSection details={false} />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10 h-96"
        color={"#ffffff"}
        ease={70}
        quantity={50}
        size={0.05}
        staticity={40}
      />
    </Suspense>
  );
}
