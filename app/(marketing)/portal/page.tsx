import Ripple from '@/components/magicui/ripple';
import { Suspense } from 'react';

export default async function PortalPage() {
    return (
        <Suspense>
            <div className="relative py-24 flex h-[500px] w-full flex-col items-center justify-center">
                <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-primary">Aucune annonce publiée</p>
                <Ripple />
            </div>
        </Suspense>
    );
}
