import ClientHeader from '@/components/layouts/client-header';
import { SiteBanner } from '@/components/marketing/about/site-banner';
import { SiteFooter } from '@/components/marketing/about/site-footer';
import { getUserProfile } from '@/src/actions/auth.actions';

interface MarketingLayoutProps {
    children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
    const profile = await getUserProfile();

    return (
        <div className="relative mx-auto w-full max-w-screen-2xl">
            <SiteBanner />
            <ClientHeader profile={profile} />
            <main className="min-h-[60vh] w-full">{children}</main>
            <SiteFooter />
        </div>
    );
}
