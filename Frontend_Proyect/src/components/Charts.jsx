import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  LineChart,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ReactApexChart from "react-apexcharts";

export function GraficoLineasMes({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pagos" barSize={20} fill="#38bdf8" name="Pagos" />
        <Line
          type="monotone"
          dataKey="asistencias"
          stroke="#f59e0b"
          name="Asistencias"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function LineasDiariasChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="5 5" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#38bdf8"
          strokeWidth={2}
          name="Asistencias"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const COLORS = ["#38bdf8", "#f59e0b", "#a855f7", "#10b981", "#ef4444"];

export function PieChartCategory({ data, nameKey, valueKey }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          label
          outerRadius={80}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Heatmap({
  series,
  xaxisCategories,
  isDatetime,
  yaxisCategories,
}) {
  const options = {
    chart: { type: "heatmap", toolbar: { show: false } },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.6,
        radius: 4,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: 0, to: 2, color: "#D2E8FF", name: "Bajo" },
            { from: 3, to: 5, color: "#7FB1FF", name: "Medio" },
            { from: 6, to: 10, color: "#0052CC", name: "Alto" },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    grid: {
      row: { colors: ["transparent", "rgba(255,255,255,0.05)"] },
      column: { colors: ["transparent", "rgba(255,255,255,0.05)"] },
    },
    tooltip: { theme: "dark" },
    xaxis: {
      ...(isDatetime
        ? {
            type: "datetime",
            labels: {
              formatter: (_v, t, o) =>
                o.dateFormatter(new Date(t)).format("HH:mm"),
              rotate: -45,
              style: { colors: "#E5E7EB", fontSize: "12px" },
            },
          }
        : {
            categories: xaxisCategories,
            labels: {
              rotate: -45,
              style: { colors: "#E5E7EB", fontSize: "12px" },
            },
          }),
    },
    yaxis: {
      labels: {
        style: { colors: "#E5E7EB", fontSize: "12px" },
      },
      reversed: true, // Si quieres invertir el orden (hora de madrugada abajo)
      categories: yaxisCategories, // <-- tu lista ordenada
    },
    legend: {
      show: true,
      position: "top",
      labels: { colors: "#E5E7EB", fontSize: "12px" },
    },
    theme: { mode: "dark", palette: "palette1" },
  };

  return (
    <div className="p-4 bg-zinc-700 rounded-lg shadow-lg">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={300}
      />
    </div>
  );
}
