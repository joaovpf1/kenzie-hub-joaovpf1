import { z } from 'zod';

export const CreateModalSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    status: z.string().nonempty('Este campo é obrigatório'),
})