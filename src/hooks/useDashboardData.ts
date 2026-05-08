import { useState, useMemo } from 'react';
import type { Series, DayData, MetricsData } from '../types';
import { parseISO, isWithinInterval } from 'date-fns';

interface UseDashboardDataProps {
  allSeries: Record<string, Series>;
}

export const useDashboardData = ({ allSeries }: UseDashboardDataProps) => {
  const [startDate, setStartDate] = useState<string>('2025-04-26');
  const [endDate, setEndDate] = useState<string>('2026-04-25');
  const [selectedSeries, setSelectedSeries] = useState<string[]>(['A', 'B', 'C', 'D']);
  const [selectedMetric, setSelectedMetric] = useState<string>('traffic');

  const toggleSeries = (s: string) => {
    setSelectedSeries(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  // Filtrar días por rango
  const filteredData = useMemo(() => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const result: Record<string, DayData[]> = {};
    for (const [key, series] of Object.entries(allSeries)) {
      if (selectedSeries.includes(key)) {
        result[key] = series.days.filter(day => {
          const d = parseISO(day.date);
          return isWithinInterval(d, { start, end });
        });
      }
    }
    return result;
  }, [allSeries, selectedSeries, startDate, endDate]);

  // Datos para el gráfico principal (una métrica)
  const mainChartDatasets = useMemo(() => {
    const datasets = [];
    let colorIndex = 0;
    const colors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'];
    for (const [series, days] of Object.entries(filteredData)) {
      datasets.push({
        label: `Serie ${series}`,
        data: days.map(d => ({
          x: d.date,
          y: d.metrics[selectedMetric as keyof MetricsData] as number,
        })),
        borderColor: colors[colorIndex % colors.length],
        backgroundColor: colors[colorIndex % colors.length] + '20',
        tension: 0.1,
        pointRadius: 0,
        fill: false,
      });
      colorIndex++;
    }
    return datasets;
  }, [filteredData, selectedMetric]);

  // Totales para KPIs y funnel
  const totalsBySeries = useMemo(() => {
    const result: Record<string, Partial<MetricsData>> = {};
    for (const [series, days] of Object.entries(filteredData)) {
      const total: any = {};
      for (const day of days) {
        for (const [k, v] of Object.entries(day.metrics)) {
          total[k] = (total[k] || 0) + v;
        }
      }
      result[series] = total;
    }
    return result;
  }, [filteredData]);

  // Últimos valores para KPIs individuales
  const latestValues = useMemo(() => {
    const result: Record<string, MetricsData> = {};
    for (const [series, days] of Object.entries(filteredData)) {
      if (days.length > 0) {
        result[series] = days[days.length - 1].metrics;
      }
    }
    return result;
  }, [filteredData]);

  return {
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
  };
};