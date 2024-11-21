import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import usersEndpoints from '@/src/endpoints/users.endpoint';

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    providers: [
        Credentials({
            name: 'Register',
            credentials: {
                token: { label: 'OTP', type: 'text' },
                email: { label: 'Email', type: 'email' },
            },
            async authorize(credentials) {
                if (!credentials?.token || !credentials?.email) return null;
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${usersEndpoints.registerVerify}`, {
                        method: 'POST',
                        body: JSON.stringify({ email: credentials.email, token: credentials.token }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const data = await res.json();

                    if (res.ok && data) {
                        const name = data.profile ? data.profile.first_name.split(' ')[0] + ' ' + data.profile.last_name.split(' ')[0] : '';

                        return { email: credentials.email, name, token: data.token, refreshToken: data.refreshToken, isProfileCompleted: !!data.profile } as User;
                    }
                } catch (error) {
                    return null;
                }

                return null;
            },
        }),
        GoogleProvider({
            authorization: { params: { access_type: 'offline', prompt: 'consent', scope: 'email profile' } },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${usersEndpoints.registerGoogle}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: user.email,
                            avatarUrl: user.image,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to authenticate with backend');
                    }
                    const data = await response.json();
                    user.token = data.token as string;
                    user.refreshToken = data.refreshToken as string;
                    user.isProfileCompleted = !!data.profile;

                    return true;
                } catch (error) {
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user, account, trigger, session }) {
            if (account && user) {
                // Première connexion
                return {
                    ...token,
                    token: user.token as string,
                    refreshToken: user.refreshToken as string,
                    isProfileCompleted: user.isProfileCompleted??false,
                    expiresAt: Date.now() + 3600 * 1000, // Supposons que le token expire dans 1 heure
                    error: null,
                };
            }

            if (trigger === 'update' && session) {
                return { ...token, ...session.user, error: null };
            }

            // Vérifier si le token a expiré
            if (Date.now() < (token.expiresAt as number)) {
                return token;
            }

            // Le token a expiré, essayons de le rafraîchir
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${usersEndpoints.refreshToken}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token.refreshToken}`, 'Content-Type': 'application/json' },
                });

                if (response.status === 401) {
                    return {
                        ...token,
                        error: 'RefreshAccessTokenError',
                    };
                }

                const refreshedTokens = await response.json();

                return {
                    ...token,
                    token: refreshedTokens.token.token,
                    expiresAt: Date.now() + 3600 * 1000, // Mettre à jour l'expiration
                    error: null,
                };
            } catch (error) {
                return {
                    ...token,
                    error: 'RefreshAccessTokenError',
                };
            }
        },
        async session({ session, token }) {
            session.user.token = token.token as string;
            session.user.refreshToken = token.refreshToken as string;
            session.user.isProfileCompleted = token.isProfileCompleted as boolean ?? false;
            session.error = token.error as 'RefreshAccessTokenError' | undefined;

            return session;
        },
    },
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
});
