import React from 'react';
import { Bar } from 'react-chartjs-2';
import { DayData } from '../types';

interface Props {
  filteredData: Record<string, DayData[]>;
}

const TimeMetrics: React.FC<Props> = ({ filteredData }) => {
  // Promedio en el período para respuesta y ciclo
  const avgResponse = Object.fromEntries(
    Object.entries(filteredData).map(([series, days]) => {
      const avg = days.reduce((acc, d) => acc + d.metrics.avg_response_time_min, 0) / (days.length || 1);
      return [series, avg];
    })
  );
  const avgCycle = Object.fromEntries(
    Object.entries(filteredData).map(([series, days]) => {
      const avg = days.reduce((acc, d) => acc + d.metrics.avg_deal_cycle_days, 0) / (days.length || 1);
      return [series, avg];
    })
  );

  const staleTotal = Object.fromEntries(
    Object.entries(filteredData).map(([series, days]) => {
      const sum = days.reduce((acc, d) => acc + d.metrics.stale_deals, 0);
      return [series, sum];
    })
  );

  const series = Object.keys(filteredData);
  const colors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'];

  const responseData = {
    labels: series.map(s => `Serie ${s}`),
    datasets: [{
      label: 'Tiempo de respuesta (min)',
      data: series.map(s => avgResponse[s]),
      backgroundColor: colors,
    }],
  };

  const cycleData = {
    labels: series.map(s => `Serie ${s}`),
    datasets: [{
      label: 'Ciclo de venta (días)',
      data: series.map(s => avgCycle[s]),
      backgroundColor: colors,
    }],
  };

  const staleData = {
    labels: series.map(s => `Serie ${s}`),
    datasets: [{
      label: 'Deals envejecidos acumulados',
      data: series.map(s => staleTotal[s]),
      backgroundColor: colors,
    }],
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4>Tiempo de respuesta promedio</h4>
        <Bar data={responseData} options={{ responsive: true }} />
      </div>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4>Ciclo de venta promedio</h4>
        <Bar data={cycleData} options={{ responsive: true }} />
      </div>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4>Deals envejecidos (total período)</h4>
        <Bar data={staleData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TimeMetrics;