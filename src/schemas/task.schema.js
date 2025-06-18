import {z} from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title es requerido'
    }),
    description: z.string({
        required_error: 'Description debe ser un string'
    }),
    date: z.string().datetime().optional(),
});