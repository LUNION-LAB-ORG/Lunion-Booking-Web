import { z } from 'zod';

export const registerVerifySchema = z.object({
    token: z.string(),
});
export type _registerVerifySchema = z.infer<typeof registerVerifySchema>;

export const createProfileSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    last_name: z.string().min(2),
    first_name: z.string().min(2),
    birthdate: z.string().date(),
    phone: z.string().min(6),
    country: z.string(),
});
export type _createProfileSchema = z.infer<typeof createProfileSchema>;
