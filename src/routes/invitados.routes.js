import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import {createInvitados, getInvitados, getInvitado, deleteInvitado, updateInvitado} from "../controllers/invitados.controllers.js"
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createInvitadoSchema} from '../schemas/invitados.schema.js'

const router = Router()

router.get("/invitados", authRequired, getInvitados)

router.get("/invitados/:id", authRequired, getInvitado)

router.post("/clientes/:idCliente/invitados", authRequired, validateSchema(createInvitadoSchema), createInvitados)

router.delete("/invitados/:id", authRequired, deleteInvitado)

router.put("/invitados/:id", authRequired, updateInvitado)

export default router;