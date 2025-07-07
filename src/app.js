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
import membresiaRoutes from './routes/membresia.routes.js'
import pagosRoutes from './routes/pagos.routes.js'
import reportesRoutes from './routes/reportes.routes.js'

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://proyecto-rafa-gym.onrender.com'
];

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen ${origin} no permitido por CORS`));
    }
  },
  credentials: true,
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
app.use('/api', membresiaRoutes)
app.use('/api', pagosRoutes)
app.use('/api', reportesRoutes)

export default app