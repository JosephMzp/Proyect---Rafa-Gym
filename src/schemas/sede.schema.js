import {z} from 'zod'

export const createSedeSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre es requerido'
    }),
    direccion: z.string({
        required_error: 'Direccion es requerida'
    }),
});