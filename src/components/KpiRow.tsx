import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
  metricKey: string;
  label: string;
  unit: string;
  filteredData: Record<string, import('../types').DayData[]>;
}

const KpiRow: React.FC<Props> = ({ metricKey, label, unit, filteredData }) => {
  // Para cada serie, obtenemos los últimos n días (30) para sparkline y el último valor.
  const colors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'];
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      {Object.entries(filteredData).map(([series, days], idx) => {
        if (days.length === 0) return null;
        const last = days[days.length - 1].metrics;
        const value = (last as any)[metricKey];
        const sparkData = days.slice(-30).map(d => (d.metrics as any)[metricKey]);

        const chartData = {
          labels: sparkData.map((_, i) => i),
          datasets: [{
            data: sparkData,
            borderColor: colors[idx],
            backgroundColor: colors[idx] + '30',
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 1.5,
          }],
        };

        return (
          <div key={series} style={{ flex: '1 1 200px', background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>{label} · {series}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {typeof value === 'number' ? (value % 1 === 0 ? value.toLocaleString() : value.toFixed(1)) : value} <span style={{ fontSize: '0.8rem', color: '#888' }}>{unit}</span>
            </div>
            <div style={{ height: '40px', marginTop: '0.5rem' }}>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiRow;