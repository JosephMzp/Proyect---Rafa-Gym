import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getCliente,
  getClientes,
  getClienteDni,
  createClientes,
  deleteClientes,
  updateClientes,
} from "../controllers/cliente.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClienteSchema } from "../schemas/cliente.schema.js";

const router = Router();

router.get("/clientes", authRequired, getClientes);

//router.get("/clientes/:id", authRequired, getCliente);

router.get("/clientes/buscar", authRequired, getClienteDni)

router.post(
  "/clientes",
  authRequired,
  validateSchema(createClienteSchema),
  createClientes
);

router.delete("/clientes/:id", authRequired, deleteClientes);

router.put("/clientes/:id", authRequired, updateClientes);

export default router;
