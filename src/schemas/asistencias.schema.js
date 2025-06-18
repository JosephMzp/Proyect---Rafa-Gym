import {z} from 'zod'

export const createAsistenciaSchema = z.object({
    fechaIngreso: z.string().datetime().optional(),
});