import {z} from 'zod'

export const createPagoSchema = z.object({
    fechaInicio: z.string({
         required_error: 'La fecha de inicio es obligatoria',
    }).datetime().optional(),
    fechaPago: z.string({
         required_error: 'La fecha de inicio es obligatoria',
    }).datetime().optional(),
    monto: z.number({
        required_error: 'Introduzca el monto a pagar'
    }),
    metodoPago: z.string({
        required_error: 'Falta el metodo de pago'
    }),
});