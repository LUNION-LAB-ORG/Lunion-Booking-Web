import AuthHeader from '@/components/layouts/auth-header';

interface MarketingLayoutProps {
    children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <>
            <main className="min-h-screen relative mx-auto w-full max-w-screen-2xl">
                <AuthHeader />
                {children}
            </main>
        </>
    );
}
