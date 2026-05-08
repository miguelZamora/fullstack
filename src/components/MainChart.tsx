import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface Props {
  selectedMetric: string;
  setSelectedMetric: (m: string) => void;
  datasets: any[];
  allMetrics: { key: string; label: string }[];
}

const MainChart: React.FC<Props> = ({ selectedMetric, setSelectedMetric, datasets, allMetrics }) => {
  const data: ChartData<'line'> = {
    datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'month', displayFormats: { month: 'MMM yy' } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: allMetrics.find(m => m.key === selectedMetric)?.label },
      },
    },
    plugins: {
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}` } },
      legend: { position: 'top' },
    },
  };

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Evolución diaria</h3>
        <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)} style={{ padding: '0.3rem' }}>
          {allMetrics.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
        </select>
      </div>
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MainChart;