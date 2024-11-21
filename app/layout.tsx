import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito, Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: {
        template: '%s | LUNION-BOOKING - Real estate portal and real estate management platform',
        default: 'LUNION-BOOKING - Real estate portal and real estate management platform',
    },
};

const nunito = Lato({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="light">
            <body className={nunito.variable}>
                <SessionProvider>
                    <ProviderComponent>{children}</ProviderComponent>
                </SessionProvider>
            </body>
        </html>
    );
}
