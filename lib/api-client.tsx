import { auth, unstable_update } from '@/auth';
import usersEndpoints from '@/src/endpoints/users.endpoint';
import { redirect } from 'next/navigation';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async getSession() {
        let session;

        if (typeof window === 'undefined') {
            session = await auth();
        } else {
            const { getSession } = await import('next-auth/react');

            session = await getSession();
        }
        return session;
    }

    private async getHeaders() {
        const session = await this.getSession();

        return {
            Authorization: session?.user?.token ? `Bearer ${session.user.token}` : '',
            'Content-Type': 'application/json',
        };
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            // tentative de rafraîchir le token
            const session = await this.getSession();
            if (session && response.status === 401) {
                const responseRefreshToken = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${usersEndpoints.refreshToken}`, {
                    method: 'GET',
                    headers: { Authorization: session?.user?.refreshToken ? `Bearer ${session.user.refreshToken}` : '', 'Content-Type': 'application/json' },
                });

                if (!responseRefreshToken.ok && responseRefreshToken.status === 401) {
                    await unstable_update({
                        error: null,
                    });
                
                    redirect('/auth/signout');
                } else {
                    const data = await responseRefreshToken.json();

                    await unstable_update({
                        user: {
                            token: data?.token?.token,
                        },
                        error: null,
                    });
                }
            }
            const errorBody = await response.json().catch(() => ({}));

            const responseError = {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            };

            return responseError;
        }

        return response;
    }

    async fetch(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = await this.getHeaders();

        const response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers },
        });

        return this.handleResponse(response);
    }

    async get(endpoint: string) {
        return this.fetch(endpoint);
    }

    async post(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch(endpoint: string, data: any) {
        return this.fetch(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint: string) {
        return this.fetch(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '');
