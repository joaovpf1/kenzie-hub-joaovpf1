import { z } from 'zod';

export const EditModalSchema = z.object({
    title: z.string().nonempty('Nome é obrigatório'),
    status: z.string().nonempty('Status é obrigatório')
})