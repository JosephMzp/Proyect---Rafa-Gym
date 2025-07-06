import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { getPagos, getPago, createPagos, deletePago, updatePago} from "../controllers/pagos.controllers.js"
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createPagoSchema} from '../schemas/pagos.schema.js'

const router = Router()

router.get("/pagos", authRequired, getPagos)

router.get("/pagos/:id", authRequired, getPago)

router.post("/pagos", authRequired, validateSchema(createPagoSchema), createPagos)

router.delete("/pagos/:id", authRequired, deletePago)

router.put("/pagos/:id", authRequired, updatePago)

export default router;