export interface MetricsData {
  traffic: number;
  leads_created: number;
  leads_qualified: number;
  deals_created: number;
  deals_won: number;
  deals_lost: number;
  avg_response_time_min: number;
  avg_deal_cycle_days: number;
  stale_deals: number;
  support_tickets_opened: number;
  support_avg_resolution_hours: number;
}

export interface DayData {
  date: string;
  metrics: MetricsData;
}

export interface Series {
  metadata: {
    start_date: string;
    end_date: string;
    days: number;
    metrics: { key: string; label: string; unit: string; direction: string; description: string }[];
  };
  days: DayData[];
}