import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().nonempty("E-mail é obrigatorio"),
    password: z.string().nonempty("Senha é obrigatória")
});