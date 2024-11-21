import React, { Suspense } from 'react';
import PricingSection from "@/components/marketing/about/pricing/pricing-section";

export default async function PricingPage() {
    return (
        <Suspense>
          <PricingSection details={true}/>
        </Suspense>
    );
}
