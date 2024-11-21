import React, { Suspense } from 'react';

import Motion from '@/components/motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import PriceCard from '@/components/marketing/about/pricing/price-card';
import { featureAvailability } from '@/config/plans';
import { TbCheck } from 'react-icons/tb';
import { findOnePlan } from '@/src/actions/plans.actions';
import { redirect } from 'next/navigation';

export default async function PricingPage({ params: { name } }: { params: { name: string } }) {

  const plan = await findOnePlan(name.toUpperCase());

    if(!plan){
      redirect('/pricing')
    }

    return (
        <Suspense>
            <section className="container relative px-6 isolate py-4">
                <div className="container relative w-full">
                    <Link href="/pricing" className="flex items-center gap-2 mb-4 bg-muted w-fit p-2 rounded-full shadow-md">
                        <ChevronLeft className="size-4" />
                        <p className="text-sm font-medium">{'Retour'}</p>
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_0.6fr] lg:grid-cols-[1fr_0.42fr] gap-4 md:gap-8">
                        <div className="lg:justify-self-end w-full max-w-screen-lg">
                            <div className="flex flex-col divide-y-1 divide-gray-200 dark:divide-gray-600 gap-16 mt-16">
                                <div className="flex flex-col gap-4">
                                    <Motion variant="verticalSlideIn">
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-agate font-bold">Plan {plan?.name}</h3>
                                        <p className="text-base md:text-lg mt-2 whitespace-pre-wrap">{plan.description}</p>
                                    </Motion>
                                </div>

                                <div className="flex flex-col gap-4 pt-16">
                                    <Motion variant="verticalSlideIn">
                                        <h3 className="text-2xl text-primary font-agate md:text-3xl lg:text-4xl font-semibold">{'Fonctionnalités attentues'}</h3>
                                    </Motion>
                                    <ul className="list-disc  list-inside">
                                        {Object.keys(featureAvailability[plan.name])
                                            .filter((feature) => featureAvailability[plan.name][feature] === true)
                                            .map((feature, index) => (
                                                <Motion key={index} variant="verticalSlideIn" animationParams={{ delay: 0.1 * index }}>
                                                    <li className="flex items-center gap-2 py-4 relative">
                                                        <TbCheck size={18} className="text-primary" />
                                                        <div className="text-sm md:text-lg font-medium">{feature}</div>
                                                    </li>
                                                </Motion>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 md:sticky md:top-10 self-start">
                            <div className="max-w-2xl mx-auto md:sticky md:top-0 z-[1] pt-10">
                                <Motion>
                                    <PriceCard plan={plan} />
                                </Motion>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    );
}
