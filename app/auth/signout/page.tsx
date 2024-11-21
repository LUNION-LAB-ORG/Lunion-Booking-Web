'use client';

import Loading from '@/components/layouts/loading';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOutPage() {
    useEffect(() => {
        const performSignOut = async () => {
            await signOut({ redirectTo: '/auth' });
        };
        performSignOut();
    }, []);

    return <Loading />;
}
