import { z } from "zod";
import { email } from "zod/v4";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username es requerido",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Password es requerido",
    })
    .min(6, { message: "Password necesita 6 caracteres" }),
  rol: z.string({
    required_error: "Rol es requerido",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email no valido",
    }),
  password: z
    .string({
      required_error: "Password es requerida",
    })
    .min(6, { message: "Password necesita 6 caracteres" }),
});
