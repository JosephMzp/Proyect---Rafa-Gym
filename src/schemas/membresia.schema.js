import {z} from 'zod'

export const createMembresiaSchema = z.object({
    tipo: z.string({
        required_error: 'Introduzca el tipo de membresia'
    }),
    costo: z.number({
        required_error: 'Falta el costo'
    }),
    
    ingresoDiario: z.number({
        required_error: 'Tiene ingreso diario'
    }),
    asesoramiento: z.boolean({
        required_error: 'Tiene asesoramiento'
    }),
    invitadosMensuales: z.number({
        required_error: 'Invitados mensuales'
    }),
});