import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import { pagosYAsistenciasPorMes, asistenciasDia, distribucionMembresias, distribucionMetodosPago,
     countClientesActivos, countPagosEsteMes, countAsistenciasHoy
} from "../controllers/reportes.controllers.js"

const router = Router()

router.get("/reportes/pagos-mes", authRequired, pagosYAsistenciasPorMes)

router.get("/reportes/asistencias-dia", authRequired, asistenciasDia);

router.get("/reportes/membresias", authRequired, distribucionMembresias);

router.get("/reportes/metodos-pago", authRequired, distribucionMetodosPago);

router.get("/reportes/clientes-activos", authRequired, countClientesActivos);
router.get("/reportes/pagos-mes/count", authRequired, countPagosEsteMes);
router.get("/reportes/asistencias-hoy", authRequired, countAsistenciasHoy);

export default router;