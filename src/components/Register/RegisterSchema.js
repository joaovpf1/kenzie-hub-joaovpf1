import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().nonempty('E-mail é obrigatorio').email('Forneça um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatória').min(8, 'É necessário pelo menos oito caracteres.')
        .regex(/(?=.*?[A-Z])/, 'É necessário pelo menos uma letra maiúscula')
        .regex(/(?=.*?[a-z])/, 'É necessário pelo menos uma letra minúscula')
        .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número.'),
    confirmPassword: z.string().nonempty('É necessário confirmar a senha'),
    bio: z.string().nonempty('As informações são obrigatórias'),
    contact: z.string().nonempty('Contato obrigatório.'),
    module: z.string().nonempty(),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não correspondem.',
    path: ['confirmPassword'],
});