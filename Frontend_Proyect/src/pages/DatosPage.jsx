import { Link } from "react-router-dom";
import {
  GraficoLineasMes,
  LineasDiariasChart,
  PieChartCategory,
  Heatmap
} from '../components/Charts.jsx';
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function DatosPage() {
  const [pagosPorMes, setPagosPorMes] = useState([]);
  const [asistenciasDiarias, setAsistenciasDiarias] = useState([]);
  const [distMembresias, setDistMembresias] = useState([]);
  const [distMetodos, setDistMetodos] = useState([]);
  const [heatmapSeries, setHeatmapSeries] = useState([]);
  const [stats, setStats] = useState({ clientes: 0, pagos: 0, asistencias: 0 });
  const heatmapDays = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          res1, res2, res3, res4, res5, r1, r2, r3
        ] = await Promise.all([
          axiosInstance.get("/reportes/pagos-mes"),
          axiosInstance.get("/reportes/asistencias-dia"),
          axiosInstance.get("/reportes/membresias"),
          axiosInstance.get("/reportes/metodos-pago"),
          axiosInstance.get("/reportes/heatmap-asistencia"),
          axiosInstance.get("/reportes/clientes-activos"),
          axiosInstance.get("/reportes/pagos-mes/count"),
          axiosInstance.get("/reportes/asistencias-hoy"),
        ]);
        setPagosPorMes(res1.data);
        setAsistenciasDiarias(res2.data);
        setDistMembresias(res3.data);
        setDistMetodos(res4.data);
        setHeatmapSeries(res5.data);
        setStats({ 
        clientes: r1.data.count, 
        pagos: r2.data.count, 
        asistencias: r3.data.count 
      });
      } catch (err) {
        console.error("Error trayendo reportes:", err);
        if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Mensaje:", err.response.data?.message);
      }
      }
    }
    fetchData();
  }, []);

    return (
        <div className=" text-white min-h-screen">

      {/* Stats rápidos */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {[
            { label: "Clientes activos", value: stats.clientes },
            { label: "Pagos este mes", value: stats.pagos },
            { label: "Asistencias hoy", value: stats.asistencias },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              <h2 className="text-sm text-gray-400">{stat.label}</h2>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Charts rápidos */}
      <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4">Pagos y Asistencias por Mes</h2>
        <GraficoLineasMes data={pagosPorMes} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Asistencias Diarias</h2>
        <LineasDiariasChart data={asistenciasDiarias} />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Distribución de Membresías</h2>
          <PieChartCategory data={distMembresias} nameKey="tipo" valueKey="count" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Métodos de Pago</h2>
          <PieChartCategory data={distMetodos} nameKey="metodoPago" valueKey="count" />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Asistencia por Hora y Día</h2>
        <Heatmap series={heatmapSeries} xaxisCategories={heatmapDays} />
      </section>
    </div>

      {/* Cómo funciona */}
      <section className="py-12">
        <h2 className="text-2xl text-center font-semibold mb-8">Cómo Funciona</h2>
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

export default DatosPage