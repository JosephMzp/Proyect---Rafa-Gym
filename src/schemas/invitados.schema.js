import {z} from 'zod'

export const createInvitadoSchema = z.object({
    dni: z.number({
        required_error: 'DNI es requerido'
    }),
    nombre: z.string({
        required_error: 'Nombre es necesario'
    }),
    fechaVisita: z.string().datetime().optional(),
});