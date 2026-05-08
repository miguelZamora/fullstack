import { Series, DayData, MetricsData } from '../types';
import { addDays, format } from 'date-fns';

const generateDay = (date: string, base: number, noise: number): MetricsData => {
  const r = (b: number, n: number) => Math.max(0, Math.round(b + (Math.random() - 0.5) * n));
  return {
    traffic: r(base * 10, noise * 10),
    leads_created: r(base, noise),
    leads_qualified: r(base * 0.6, noise * 0.5),
    deals_created: r(base * 0.3, noise * 0.3),
    deals_won: r(base * 0.15, noise * 0.2),
    deals_lost: r(base * 0.1, noise * 0.15),
    avg_response_time_min: Math.max(1, Math.round(30 + Math.random() * 20)),
    avg_deal_cycle_days: Math.round(15 + Math.random() * 20),
    stale_deals: r(base * 0.05, noise * 0.05),
    support_tickets_opened: r(base * 0.8, noise * 0.8),
    support_avg_resolution_hours: Math.round(4 + Math.random() * 12),
  };
};

const generateSeries = (seriesId: string): Series => {
  const start = new Date(2025, 3, 26); // 2025-04-26
  const days: DayData[] = [];
  let base = 100; // Base de leads, variará suavemente
  for (let i = 0; i < 365; i++) {
    const date = format(addDays(start, i), 'yyyy-MM-dd');
    // Simulamos tendencia semanal y algo de estacionalidad
    const dayOfWeek = (i + 5) % 7; // Lunes=0
    const weeklyFactor = dayOfWeek === 5 || dayOfWeek === 6 ? 0.7 : 1; // Fin de semana baja
    const trend = 1 + Math.sin(i / 30) * 0.2; // Ciclo mensual
    const currentBase = base * weeklyFactor * trend;
    const dayData = generateDay(date, currentBase, currentBase * 0.3);
    days.push({ date, metrics: dayData });
    // Tendencia a largo plazo
    base += Math.random() * 0.2 - 0.1;
    base = Math.max(50, base);
  }
  return {
    metadata: {
      start_date: '2025-04-26',
      end_date: '2026-04-25',
      days: 365,
      metrics: [
        { key: 'traffic', label: 'Daily visits', unit: 'visits', direction: 'higher_is_better', description: 'Unique visits to the public marketing site.' },
        // ... copia el resto de la lista de métricas
      ],
    },
    days,
  };
};

export const seriesA: Series = generateSeries('A');
export const seriesB: Series = generateSeries('B');
export const seriesC: Series = generateSeries('C');
export const seriesD: Series = generateSeries('D');