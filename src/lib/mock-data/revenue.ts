import { RevenueData } from '@/types/analytics';
import { generateTrendData, generateDateRange, formatDate } from './generators';

export function generateRevenueData(days: number = 30): RevenueData[] {
  const dates = generateDateRange(days);
  const mrrTrend = generateTrendData(days, 125000, 0.03, 0.08, true);
  
  return dates.map((date, index) => {
    const mrr = mrrTrend[index];
    const arr = mrr * 12;
    const newRevenue = Math.round(mrr * (0.05 + Math.random() * 0.03));
    const churnedRevenue = Math.round(mrr * (0.01 + Math.random() * 0.015));
    
    return {
      date: formatDate(date),
      value: mrr,
      mrr,
      arr,
      newRevenue,
      churnedRevenue,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });
}

export function getRevenueMetrics(data: RevenueData[]) {
  const current = data[data.length - 1];
  const previous = data[data.length - 8] || data[0]; // Compare to week ago
  
  const mrrChange = ((current.mrr - previous.mrr) / previous.mrr) * 100;
  const arrChange = ((current.arr - previous.arr) / previous.arr) * 100;
  
  const totalNewRevenue = data.slice(-7).reduce((sum, d) => sum + d.newRevenue, 0);
  const totalChurned = data.slice(-7).reduce((sum, d) => sum + d.churnedRevenue, 0);
  const netRevenue = totalNewRevenue - totalChurned;
  
  // Calculate LTV (simplified: MRR * average customer lifetime in months)
  const avgCustomerLifetime = 24; // months
  const avgMrr = current.mrr / 2500; // Assume 2500 customers
  const ltv = avgMrr * avgCustomerLifetime;
  
  return {
    mrr: {
      value: current.mrr,
      previousValue: previous.mrr,
      change: mrrChange,
      changeType: mrrChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
    arr: {
      value: current.arr,
      previousValue: previous.arr,
      change: arrChange,
      changeType: arrChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
    newRevenue: {
      value: totalNewRevenue,
      previousValue: totalNewRevenue * 0.92,
      change: 8.7,
      changeType: 'increase' as const,
    },
    churnedRevenue: {
      value: totalChurned,
      previousValue: totalChurned * 1.1,
      change: -9.1,
      changeType: 'decrease' as const,
    },
    netRevenue: {
      value: netRevenue,
      previousValue: netRevenue * 0.88,
      change: 13.6,
      changeType: 'increase' as const,
    },
    ltv: {
      value: ltv,
      previousValue: ltv * 0.97,
      change: 3.1,
      changeType: 'increase' as const,
    },
  };
}
