import { ChurnData } from '@/types/analytics';
import { generateDateRange, formatDate } from './generators';

export function generateChurnData(days: number = 30): ChurnData[] {
  const dates = generateDateRange(days);
  
  return dates.map((date, index) => {
    // Base churn rate between 1.5% and 3.5%
    const baseChurn = 2.2;
    const seasonalFactor = Math.sin(index * 0.3) * 0.5;
    const randomFactor = (Math.random() - 0.5) * 0.8;
    const churnRate = Math.max(0.5, Math.min(4.5, baseChurn + seasonalFactor + randomFactor));
    
    const totalUsers = 28000 + index * 50;
    const churnedUsers = Math.round(totalUsers * (churnRate / 100));
    const retainedUsers = totalUsers - churnedUsers;
    
    return {
      date: formatDate(date),
      value: churnRate,
      churnRate,
      churnedUsers,
      retainedUsers,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });
}

export function getChurnMetrics(data: ChurnData[]) {
  const current = data[data.length - 1];
  const previous = data[data.length - 8] || data[0];
  
  const avgChurnRate = data.slice(-7).reduce((sum, d) => sum + d.churnRate, 0) / 7;
  const prevAvgChurnRate = data.slice(-14, -7).reduce((sum, d) => sum + d.churnRate, 0) / 7;
  const churnChange = ((avgChurnRate - prevAvgChurnRate) / prevAvgChurnRate) * 100;
  
  const totalChurned = data.slice(-30).reduce((sum, d) => sum + d.churnedUsers, 0);
  const totalRetained = data.slice(-30).reduce((sum, d) => sum + d.retainedUsers, 0);
  const retentionRate = (totalRetained / (totalRetained + totalChurned)) * 100;
  
  return {
    churnRate: {
      value: avgChurnRate,
      previousValue: prevAvgChurnRate,
      change: churnChange,
      // For churn, decrease is good
      changeType: churnChange <= 0 ? 'increase' as const : 'decrease' as const,
    },
    churnedUsers: {
      value: current.churnedUsers,
      previousValue: previous.churnedUsers,
      change: ((current.churnedUsers - previous.churnedUsers) / previous.churnedUsers) * 100,
      changeType: current.churnedUsers <= previous.churnedUsers ? 'increase' as const : 'decrease' as const,
    },
    retentionRate: {
      value: retentionRate,
      previousValue: retentionRate - 0.8,
      change: 0.8,
      changeType: 'increase' as const,
    },
  };
}
