'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { signOut as signOutAuth, unstable_update } from '@/auth';
import { registerVerifySchema, createProfileSchema } from '@/src/schemas/auth.schema';
import { processFormData } from '@/utils/formdata-zod.utilities';
import { TrimPhoneNumber } from '@/utils/trim-phone-number';
import { apiClient } from '@/lib/api-client';
import { signIn } from '@/auth';
import { ActionResult, ErrorDefaultCode } from '@/types/index.d';
import usersEndpoints from '@/src/endpoints/users.endpoint';

/**
 * Gère le processus de connexion initial.
 * @param prevState - L'état précédent.
 * @param formData - Les données du formulaire.
 * @returns Un objet contenant les données, le message et les erreurs.
 */
export async function register(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    // Processing form data
    const { success, data: formdata } = processFormData(createProfileSchema, formData, {}, prevState);

    if (!success) {
        prevState.message = 'Email invalide';

        return prevState;
    }

    // Processing
    const response = await apiClient.post(usersEndpoints.register, {
        email: formdata.email,
    });

    if (!response.ok) {
        prevState.message = "Erreur lors de l'envoie de l'email.";
        prevState.status = 'error';
        prevState.code = response.status;

        return prevState;
    }

    cookies().set('email_otp', formdata.email);

    redirect('/auth?step=2');
}

/**
 * Renvoie l'e-mail OTP si le cookie correspondant existe.
 * @throws {Error} Si une erreur survient lors de l'envoi de l'e-mail.
 */
export async function resendEmail(): Promise<void> {
    // Processing
    const hasCookie = cookies().has('email_otp');

    if (hasCookie) {
        const email = cookies().get('email_otp')?.value;

        const response = await apiClient.post(usersEndpoints.register, {
            email,
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
}

/**
 * Vérifie le code OTP saisi par l'utilisateur.
 * @param prevState - L'état précédent.
 * @param formData - Les données du formulaire.
 * @returns Un objet contenant les données, le message et les erreurs.
 */
export async function registerVerify(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    // Processing form data
    const { success, data: formdata } = processFormData(
        registerVerifySchema,
        formData,
        {
            transformations: {
                token: (value: string) => value.toString().replace(/\s/g, ''),
            },
        },
        prevState,
    );

    if (!success) {
        prevState.message = 'Code OTP invalide';
        return prevState;
    }

    // Processing

    const hasCookie = cookies().has('email_otp');

    if (hasCookie) {
        const email = cookies().get('email_otp')?.value;

        const response: any = await signIn('credentials', {
            email,
            token: formdata.token,
            redirect: false,
        });

        if (response === null) {
            prevState.message = 'Problème de validation du code. Veuillez reprendre la connexion.';
            prevState.status = 'error';
            prevState.code = ErrorDefaultCode.exception;

            return prevState;
        }

        prevState.message = 'success';
        return prevState;
    }

    prevState.message = 'Veuillez reprendre le processus de connexion';
    prevState.status = 'error';
    prevState.code = ErrorDefaultCode.exception;

    return prevState;
}

/**
 * Finalise le processus d'inscription en mettant à jour les informations du profil.
 * @param prevState - L'état précédent.
 * @param formData - Les données du formulaire.
 * @returns Un objet contenant les données, le message et les erreurs.
 */
export async function createProfile(prevState: any, formData: FormData): Promise<ActionResult<any>> {
    // Processing form data
    const { success, data: formdata } = processFormData(
        createProfileSchema,
        formData,
        {
            useDynamicValidation: true,
            excludeFields: ['phoneCountry'],
            transformations: {
                phone: (value) => '+' + TrimPhoneNumber(value as string),
            },
        },
        prevState,
    );

    if (!success) {
        prevState.message = 'Informations invalides';
        return prevState;
    }

    // Processing
    const response = await apiClient.post(usersEndpoints.createProfile, formdata);

    if (!response.ok) {
        prevState.message = 'Désolé, une erreur est survenue';

        prevState.status = 'error';
        prevState.code = response.status;

        return prevState;
    }

    const data = await response.json();

    const name = data.first_name.split(' ')[0] + ' ' + data.last_name.split(' ')[0];

    await unstable_update({
        user: {
            name,
            isProfileCompleted: true,
        },
    });

    redirect('/');
}

/**
 * Déconnecte l'utilisateur actuel.
 */
export async function signOut(): Promise<void> {
    await signOutAuth();
    revalidatePath('/', 'layout');
    redirect('/');
}

/**
 * Récupère le profil de l'utilisateur actuellement connecté.
 * @returns Le profil de l'utilisateur.
 */
export async function getUserProfile(): Promise<any> {
    const response = await apiClient.get(usersEndpoints.profile);
    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return data.data;
}

/**
 * Met à jour les informations du profil de l'utilisateur.
 * @param prevState - L'état précédent.
 * @param formData - Les données du formulaire.
 * @returns Un objet contenant les données mises à jour, le message et les erreurs.
 */
export async function updateProfile(prevState: any, formData: FormData, id: string): Promise<ActionResult<any>> {
    // Processing form data
    const {
        success,
        data: formdata,
        errors,
    } = processFormData(createProfileSchema, formData, {
        useDynamicValidation: true,
        excludeFields: ['phoneCountry', 'id'],
        transformations: {
            phone: (value) => TrimPhoneNumber(value as string),
        },
    });

    if (!success) {
        prevState.errors = errors;
        prevState.message = 'Informations invalides';
        prevState.status = 'error';
        prevState.code = 400;

        return prevState;
    }

    // Processing
    const response = await apiClient.post(`/profile/update/${id}`, formdata);

    if (!response.ok) {
        prevState.message = 'Désolé, une erreur est survenue';

        prevState.status = 'error';
        prevState.code = response.status;

        return prevState;
    }

    prevState.data = await response.json();
    prevState.errors = {};
    prevState.message = 'success';

    return prevState;
}
