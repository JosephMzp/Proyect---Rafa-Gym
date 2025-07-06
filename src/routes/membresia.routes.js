import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { getMembresias,getMembresia,createMembresias,updateMembresia,deleteMembresia } from "../controllers/membresia.controllers.js"
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createMembresiaSchema} from '../schemas/membresia.schema.js'

const router = Router()

router.get("/membresias", authRequired, getMembresias)

router.get("/membresias/:id", authRequired, getMembresia)

router.post("/membresias", authRequired, validateSchema(createMembresiaSchema), createMembresias)

router.delete("/membresias/:id", authRequired, deleteMembresia)

router.put("/membresias/:id", authRequired, updateMembresia)

export default router;