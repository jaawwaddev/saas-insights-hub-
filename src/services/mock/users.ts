import { UserData } from '@/types/analytics';
import { generateTrendData, generateDateRange, formatDate } from './generators';

export function generateUserData(days: number = 30): UserData[] {
  const dates = generateDateRange(days);
  const dauTrend = generateTrendData(days, 4500, 0.025, 0.15, true);
  const wauTrend = generateTrendData(days, 12000, 0.02, 0.1, false);
  const mauTrend = generateTrendData(days, 28000, 0.018, 0.05, false);
  
  return dates.map((date, index) => {
    const dau = dauTrend[index];
    const wau = wauTrend[index];
    const mau = mauTrend[index];
    const newUsers = Math.round(dau * (0.08 + Math.random() * 0.04));
    const activeUsers = dau;
    
    return {
      date: formatDate(date),
      value: dau,
      dau,
      wau,
      mau,
      newUsers,
      activeUsers,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });
}

export function getUserMetrics(data: UserData[]) {
  const current = data[data.length - 1];
  const previous = data[data.length - 8] || data[0];
  
  const dauChange = ((current.dau - previous.dau) / previous.dau) * 100;
  const wauChange = ((current.wau - previous.wau) / previous.wau) * 100;
  const mauChange = ((current.mau - previous.mau) / previous.mau) * 100;
  
  const totalNewUsers = data.slice(-7).reduce((sum, d) => sum + d.newUsers, 0);
  const previousNewUsers = data.slice(-14, -7).reduce((sum, d) => sum + d.newUsers, 0);
  const newUsersChange = ((totalNewUsers - previousNewUsers) / previousNewUsers) * 100;
  
  return {
    dau: {
      value: current.dau,
      previousValue: previous.dau,
      change: dauChange,
      changeType: dauChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
    wau: {
      value: current.wau,
      previousValue: previous.wau,
      change: wauChange,
      changeType: wauChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
    mau: {
      value: current.mau,
      previousValue: previous.mau,
      change: mauChange,
      changeType: mauChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
    newUsers: {
      value: totalNewUsers,
      previousValue: previousNewUsers,
      change: newUsersChange,
      changeType: newUsersChange >= 0 ? 'increase' as const : 'decrease' as const,
    },
  };
}

export function generateCohortData() {
  const cohorts = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
  const retentionRates = [100, 72, 58, 48, 42, 38, 35, 33];
  
  return cohorts.map((name, index) => ({
    name,
    retention: retentionRates[index],
    users: Math.round(1000 * (retentionRates[index] / 100)),
  }));
}
