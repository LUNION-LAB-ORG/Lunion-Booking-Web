'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { processFormData } from '@/utils/formdata-zod.utilities';
import { apiClient } from '@/lib/api-client';
import { ActionResult, ErrorDefaultCode } from '@/types/index.d';
import plansEndpoint from '../endpoints/plans.endpoint';
import { Plan, ProfileSubscription } from '@/types/models';

export async function fndAllApp(): Promise<Plan[] | null> {
    // Processing
    const response = await apiClient.get(plansEndpoint.base);

    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}

export async function findOnePlan(id: string): Promise<Plan | null> {
    // Processing
    const response = await apiClient.get(plansEndpoint.base + `/${id}`);

    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data.data;
}

export async function trialPlan(id: string): Promise<ActionResult<ProfileSubscription>> {
    // Processing
    const response = await apiClient.get(plansEndpoint.trial + `/${id}`);

    if (!response.ok) {
        return {
            message: 'Une erreur est survenue',
            status: 'error',
            code: response.status,
        };
    }
    const data = await response.json();

    return {
        data: data,
        status: 'success',
    };
}

export async function subscribePlan(id: string, count: number): Promise<ActionResult<ProfileSubscription>> {
    // Processing
    const response = await apiClient.post(plansEndpoint.subscribe + `/${id}`, {
        count,
    });

    if (!response.ok) {
        return {
            message: 'Une erreur est survenue',
            status: 'error',
            code: response.status,
        };
    }

    const data = await response.json();

    return {
        data: data,
        status: 'success',
    };
}
