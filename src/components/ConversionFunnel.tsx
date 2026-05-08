import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Props {
  totalsBySeries: Record<string, Partial<import('../types').MetricsData>>;
}

const funnelSteps = ['traffic', 'leads_created', 'leads_qualified', 'deals_created', 'deals_won'] as const;
const stepLabels: Record<typeof funnelSteps[number], string> = {
  traffic: 'Tráfico',
  leads_created: 'Leads',
  leads_qualified: 'Calificados',
  deals_created: 'Deals',
  deals_won: 'Ganados',
};

const ConversionFunnel: React.FC<Props> = ({ totalsBySeries }) => {
  const series = Object.keys(totalsBySeries);
  const datasets = series.map((s, i) => {
    const totals = totalsBySeries[s];
    const data = funnelSteps.map(step => totals[step] || 0);
    return {
      label: `Serie ${s}`,
      data,
      backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'][i % 4] + '80',
      borderColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'][i % 4],
      borderWidth: 1,
    };
  });

  const data = {
    labels: funnelSteps.map(s => stepLabels[s]),
    datasets,
  };

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
      <h3>Embudo de conversión (acumulado)</h3>
      <Bar
        data={data}
        options={{
          indexAxis: 'y' as const,
          responsive: true,
          scales: { x: { stacked: false, beginAtZero: true }, y: { stacked: false } },
          plugins: { legend: { position: 'top' } },
        }}
      />
    </div>
  );
};

export default ConversionFunnel;