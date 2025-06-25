import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { getSedes, getSede, createSedes, deleteSedes, updateSedes} from "../controllers/sede.controllers.js"
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createSedeSchema} from '../schemas/sede.schema.js'

const router = Router()

router.get("/sedes", authRequired, getSedes)

router.get("/sedes/:id", authRequired, getSede)

router.post("/sedes", authRequired, validateSchema(createSedeSchema), createSedes)

router.delete("/sedes/:id", authRequired, deleteSedes)

router.put("/sedes/:id", authRequired, updateSedes)

export default router;