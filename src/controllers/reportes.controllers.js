import Pago from "../models/pagos.model.js";
import Asistencia from "../models/asistencias.model.js";
import Membresia from "../models/membresia.model.js";
import Cliente from "../models/cliente.model.js";

export const pagosYAsistenciasPorMes = async (req, res) => {
  try {
    const pagos = await Pago.aggregate([
      {
        $group: {
          _id: {
            year: { $year: { date: "$fechaInicio", timezone: "-0500" } },
            month: { $month: { date: "$fechaInicio", timezone: "-0500" } },
          },
          pagos: { $sum: 1 },
        },
      },
    ]);

    const asistencias = await Asistencia.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$fechaIngreso" },
            month: { $month: "$fechaIngreso" },
          },
          asistencias: { $sum: 1 },
        },
      },
    ]);

    const meses = {};
    pagos.forEach((p) => {
      const key = `${p._id.year}-${p._id.month}`;
      meses[key] = { pagos: p.pagos, asistencias: 0, mes: p._id.month };
    });
    asistencias.forEach((a) => {
      const key = `${a._id.year}-${a._id.month}`;
      if (!meses[key])
        meses[key] = { pagos: 0, asistencias: a.asistencias, mes: a._id.month };
      else meses[key].asistencias = a.asistencias;
    });

    const monthNames = [
      "",
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const resultado = Object.values(meses)
      .map((m) => ({
        mes: monthNames[m.mes],
        pagos: m.pagos,
        asistencias: m.asistencias,
      }))
      .sort((a, b) => monthNames.indexOf(a.mes) - monthNames.indexOf(b.mes));

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generando reporte mensual" });
  }
};

export const asistenciasDia = async (req, res) => {
  try {
    const asistencias = await Asistencia.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$fechaIngreso",
              timezone: "-05:00",
            },
          },
          total: { $sum: 1 },
        },
      },
      {
        $project: { dia: "$_id", total: 1, _id: 0 },
      },
      { $sort: { dia: 1 } },
    ]);
    res.json(asistencias);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error generando reporte de asistencias diarias" });
  }
};

export const distribucionMembresias = async (req, res) => {
  try {
    // Agrupa pagos por idMembresia y cuenta cuántos hay de cada uno
    const datos = await Pago.aggregate([
      {
        $group: {
          _id: "$idMembresia",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = [];
    for (const item of datos) {
      const memb = await Membresia.findById(item._id).lean();
      result.push({ tipo: memb?.tipo || "Desconocido", count: item.count });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error generando distribución de membresías" });
  }
};

export const distribucionMetodosPago = async (req, res) => {
  try {
    const datos = await Pago.aggregate([
      {
        $group: {
          _id: "$metodoPago",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          metodo: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    const result = datos.map((item) => ({
      metodoPago: item.metodo,
      count: item.count,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error generando distribución de métodos de pago" });
  }
};

export const heatmapAsistencia = async (req, res) => {
  try {
    const datos = await Asistencia.aggregate([
      {
        $group: {
          _id: {
            diaSemana: { $dayOfWeek: "$fechaIngreso" },
            hora: { $hour: "$fechaIngreso" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          diaSemana: "$_id.diaSemana",
          hora: "$_id.hora",
          count: 1,
        },
      },
    ]);

    // Inicializar estructura de salida agrupada por hora
    const seriesMap = {};
    datos.forEach((d) => {
      const hora = `${String(d.hora).padStart(2, "0")}:00`;
      if (!seriesMap[hora]) seriesMap[hora] = Array(7).fill(0);
      // Mongo: diaSemana 1 = Domingo, 7 = Sábado
      seriesMap[hora][d.diaSemana - 1] = d.count;
    });

    const series = Object.entries(seriesMap).map(([hora, data]) => ({
      name: hora,
      data,
    }));

    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generando heatmap de asistencias" });
  }
};

export const countClientesActivos = async (req, res) => {
  const count = await Cliente.countDocuments();
  res.json({ count });
};

export const countPagosEsteMes = async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const count = await Pago.countDocuments({ fechaPago: { $gte: start } });
  res.json({ count });
};

export const countAsistenciasHoy = async (req, res) => {
  const ahora = new Date();
  const inicioHoy = new Date(ahora.setHours(0, 0, 0, 0));

  const count = await Asistencia.countDocuments({
    fechaIngreso: { $gte: inicioHoy },
  });

  res.json({ count });
};
