import React, { useState } from 'react';
import { seriesA, seriesB, seriesC, seriesD } from '../data/mockData';
import { useDashboardData } from '../hooks/useDashboardData';
import KpiRow from './KpiRow';
import MainChart from './MainChart';
import ConversionFunnel from './ConversionFunnel';
import TimeMetrics from './TimeMetrics';

const allSeries = { A: seriesA, B: seriesB, C: seriesC, D: seriesD };

const Dashboard: React.FC = () => {
  const {
    selectedSeries,
    toggleSeries,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedMetric,
    setSelectedMetric,
    filteredData,
    mainChartDatasets,
    totalsBySeries,
    latestValues,
  } = useDashboardData({ allSeries });

  const metricOptions = [
    { key: 'traffic', label: 'Tráfico' },
    { key: 'leads_created', label: 'Leads creados' },
    { key: 'leads_qualified', label: 'Leads calificados' },
    { key: 'deals_created', label: 'Deals creados' },
    { key: 'deals_won', label: 'Deals ganados' },
    { key: 'deals_lost', label: 'Deals perdidos' },
    { key: 'avg_response_time_min', label: 'Tiempo respuesta (min)' },
    { key: 'avg_deal_cycle_days', label: 'Ciclo de venta (días)' },
    { key: 'stale_deals', label: 'Deals envejecidos' },
    { key: 'support_tickets_opened', label: 'Tickets abiertos' },
    { key: 'support_avg_resolution_hours', label: 'Resolución soporte (h)' },
  ];

  return (
    <div style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Sales Dashboard</h1>
      {/* Controles */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label>Desde: </label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <label> Hasta: </label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div>
          {Object.keys(allSeries).map(s => (
            <button
              key={s}
              onClick={() => toggleSeries(s)}
              style={{
                marginRight: '0.5rem',
                padding: '0.3rem 0.8rem',
                background: selectedSeries.includes(s) ? '#36A2EB' : '#eee',
                color: selectedSeries.includes(s) ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Serie {s}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row con la métrica principal */}
      <KpiRow metricKey={selectedMetric} label={metricOptions.find(m => m.key === selectedMetric)?.label || ''} unit="" filteredData={filteredData} />

      <MainChart
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        datasets={mainChartDatasets}
        allMetrics={metricOptions}
      />

      <ConversionFunnel totalsBySeries={totalsBySeries} />

      <TimeMetrics filteredData={filteredData} />
    </div>
  );
};

export default Dashboard;