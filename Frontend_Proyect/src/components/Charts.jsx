import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar, Line, 
    LineChart,  CartesianGrid, PieChart, Pie, Cell  } from 'recharts';
import ReactApexChart from 'react-apexcharts';

export function GraficoLineasMes({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pagos" barSize={20} fill="#38bdf8" name="Pagos" />
        <Line type="monotone" dataKey="asistencias" stroke="#f59e0b" name="Asistencias" />
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
        <Line type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={2} name="Asistencias" />
      </LineChart>
    </ResponsiveContainer>
  );
}

const COLORS = ['#38bdf8','#f59e0b','#a855f7','#10b981','#ef4444'];

export function PieChartCategory({ data, nameKey, valueKey }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} label outerRadius={80}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Heatmap({ series, xaxisCategories }) {
  const options = {
    chart: { type: 'heatmap' },
    xaxis: { categories: xaxisCategories },
    plotOptions: {
      heatmap: { shadeIntensity: 0.5, radius: 4 }
    },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' }
  };

  return (
    <div className=" p-4 rounded">
      <ReactApexChart options={options} series={series} type="heatmap" height={250} />
    </div>
  );
}