import express from 'express'
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import taskRoutesRoutes from './routes/tasks.routes.js'
import clienteRoutes from './routes/cliente.routes.js'
import sedeRoutes from './routes/sede.routes.js'
import asistenciaRoutes from './routes/asistencias.routes.js'
import invitadoRoutes from './routes/invitados.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRoutes)
app.use("/api",taskRoutesRoutes)
app.use("/api", clienteRoutes)
app.use("/api", sedeRoutes)
app.use('/api', asistenciaRoutes)
app.use('/api', invitadoRoutes)

export default app