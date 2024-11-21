import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            token: string;
            refreshToken: string;
            isProfileCompleted: boolean;
        };
        error?: 'RefreshAccessTokenError' | null;
    }

    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
        refreshToken: string;
        isProfileCompleted: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name: string;
        email: string;
        token: string;
        refreshToken: string;
        isProfileCompleted: boolean;
        expiresAt: number;
        error?: 'RefreshAccessTokenError' | null;
    }
}
