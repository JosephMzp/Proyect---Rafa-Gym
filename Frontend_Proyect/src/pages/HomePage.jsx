import { Link } from "react-router-dom";
import {
  GraficoLineasMes,
  LineasDiariasChart,
  PieChartCategory,
  Heatmap
} from '../components/Charts.jsx';
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import portada from "../assets/images/portada1.jpg";

function HomePage() {
  const [stats, setStats] = useState({ clientes: 0, pagos: 0, asistencias: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          r1, r2, r3
        ] = await Promise.all([
          axiosInstance.get("/reportes/clientes-activos"),
          axiosInstance.get("/reportes/pagos-mes/count"),
          axiosInstance.get("/reportes/asistencias-hoy"),
        ]);
        setStats({ 
        clientes: r1.data.count, 
        pagos: r2.data.count, 
        asistencias: r3.data.count 
      });
      } catch (err) {
        console.error("Error trayendo reportes:", err);
      }
    }
    fetchData();
  }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero */}
      <header
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${portada})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gestiona tu Gimnasio con Facilidad</h1>
          <p className="text-xl text-gray-300 mb-6">Control total de membresías, pagos y asistencia</p>
          <Link
            to="/register"
            className="bg-sky-500 hover:bg-sky-600 transform hover:scale-105 transition rounded-md px-6 py-3 font-medium"
          >
            Empieza ahora
          </Link>
        </div>
      </header>

      {/* Cómo funciona */}
      <section className="py-12 bg-gray-800">
        <h2 className="text-2xl text-center font-semibold mb-8">Funciones</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {[
            { icon: "👤", title: "Registrar cliente", desc: "Guarda datos y membresía." },
            { icon: "💳", title: "Gestión de pagos", desc: "Registra monto, método y fecha." },
            { icon: "📅", title: "Control de asistencia", desc: "Registra entrada diaria." },
            { icon: "📈", title: "Ver reportes", desc: "Estadísticas y gráficos actualizados." },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="text-4xl">{step.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    )
}

export default HomePage