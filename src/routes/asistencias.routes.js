import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { getAsistencias, getAsistencia, createAsistencias, deleteAsistencia, updateAsistencia} from "../controllers/asistencias.controllers.js"
import {validateSchema} from '../middlewares/validator.middleware.js'
import {createAsistenciaSchema} from '../schemas/asistencias.schema.js'

const router = Router()

router.get("/asistencias", authRequired, getAsistencias)

router.get("/asistencias/:id", authRequired, getAsistencia)

router.post("/asistencias", authRequired, validateSchema(createAsistenciaSchema), createAsistencias)

router.delete("/asistencias/:id", authRequired, deleteAsistencia)

router.put("/asistencias/:id", authRequired, updateAsistencia)

export default router;