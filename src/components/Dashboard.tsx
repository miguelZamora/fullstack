import React from 'react';
// 1. Importar el JSON como módulo default (Vite lo transforma automáticamente)
import metricsData from '../data/metrics.json';
import { useDashboardData } from '../hooks/useDashboardData';
import KpiRow from './KpiRow';
import MainChart from './MainChart';
import ConversionFunnel from './ConversionFunnel';
import TimeMetrics from './TimeMetrics';
import type { Series } from '../types';

// 2. Extraer las series A, B, C, D con la aserción de tipo necesaria
const { A, B, C, D } = metricsData as Record<string, Series>;
const allSeries = { A, B, C, D };

// 3. Obtener las opciones de métrica directamente del metadata de la primera serie
const metricOptions = allSeries.A.metadata.metrics.map((m) => ({
  key: m.key,
  label: m.label,
}));

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
  } = useDashboardData({ allSeries });

  return (
    <div style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Sales Dashboard</h1>

      {/* Controles de fecha y series */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label>Desde: </label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label> Hasta: </label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          {Object.keys(allSeries).map((s) => (
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

      {/* Fila de KPIs con la métrica seleccionada */}
      <KpiRow
        metricKey={selectedMetric}
        label={metricOptions.find((m) => m.key === selectedMetric)?.label || ''}
        unit=""
        filteredData={filteredData}
      />

      {/* Gráfico principal diario */}
      <MainChart
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        datasets={mainChartDatasets}
        allMetrics={metricOptions}
      />

      {/* Embudo de conversión */}
      <ConversionFunnel totalsBySeries={totalsBySeries} />

      {/* Métricas de tiempo y deals envejecidos */}
      <TimeMetrics filteredData={filteredData} />
    </div>
  );
};

export default Dashboard;