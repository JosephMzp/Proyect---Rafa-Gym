import {z} from 'zod'

export const createClienteSchema = z.object({
    dni: z.number({
        required_error: 'DNI es requerido'
    }).min(8, { message: "DNI necesita 8 caracteres" }),
    nombre: z.string({
        required_error: 'Nombre es requerido'
    }),
    apellidos: z.string({
        required_error: 'Apellido es requerido'
    }),
    telefono: z.number({
        required_error: 'Telefono es requerido'
    }).min(9, { message: "Telefono necesita 9 caracteres" }),
    email: z
    .string({
        required_error: 'Email es necesario'
    })
    .email({
      message: "Email no valido",
    }),
    fechaRegistro: z.string().datetime().optional(),
    vencimientoMembresia: z.string().datetime().optional(),
});