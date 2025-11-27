export interface MetricData {
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface RevenueData extends TimeSeriesData {
  mrr: number;
  arr: number;
  newRevenue: number;
  churnedRevenue: number;
}

export interface UserData extends TimeSeriesData {
  dau: number;
  wau: number;
  mau: number;
  newUsers: number;
  activeUsers: number;
}

export interface ChurnData extends TimeSeriesData {
  churnRate: number;
  churnedUsers: number;
  retainedUsers: number;
}

export interface FunnelStage {
  name: string;
  value: number;
  percentage: number;
  dropoff: number;
  color: string;
}

export interface ConversionFunnel {
  stages: FunnelStage[];
  totalConversion: number;
}

export type DateRange = '24h' | '7d' | '30d' | '90d' | 'custom';

export interface DateRangeFilter {
  range: DateRange;
  startDate?: Date;
  endDate?: Date;
}
