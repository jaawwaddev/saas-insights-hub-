import { ConversionFunnel, FunnelStage } from '@/types/analytics';

export function generateFunnelData(): ConversionFunnel {
  const stages: FunnelStage[] = [
    {
      name: 'Visitors',
      value: 50000,
      percentage: 100,
      dropoff: 0,
      color: 'hsl(var(--chart-1))',
    },
    {
      name: 'Signups',
      value: 12500,
      percentage: 25,
      dropoff: 75,
      color: 'hsl(var(--chart-2))',
    },
    {
      name: 'Activated',
      value: 6250,
      percentage: 12.5,
      dropoff: 50,
      color: 'hsl(var(--chart-3))',
    },
    {
      name: 'Qualified',
      value: 2500,
      percentage: 5,
      dropoff: 60,
      color: 'hsl(var(--chart-4))',
    },
    {
      name: 'Converted',
      value: 875,
      percentage: 1.75,
      dropoff: 65,
      color: 'hsl(var(--chart-5))',
    },
  ];

  const totalConversion = (stages[stages.length - 1].value / stages[0].value) * 100;

  return {
    stages,
    totalConversion,
  };
}

export function getFunnelMetrics(funnel: ConversionFunnel) {
  return {
    totalConversion: {
      value: funnel.totalConversion,
      previousValue: funnel.totalConversion * 0.94,
      change: 6.4,
      changeType: 'increase' as const,
    },
    signupRate: {
      value: funnel.stages[1].percentage,
      previousValue: 23.5,
      change: 6.4,
      changeType: 'increase' as const,
    },
    activationRate: {
      value: (funnel.stages[2].value / funnel.stages[1].value) * 100,
      previousValue: 48,
      change: 4.2,
      changeType: 'increase' as const,
    },
    qualificationRate: {
      value: (funnel.stages[3].value / funnel.stages[2].value) * 100,
      previousValue: 38,
      change: 5.3,
      changeType: 'increase' as const,
    },
    conversionRate: {
      value: (funnel.stages[4].value / funnel.stages[3].value) * 100,
      previousValue: 32,
      change: 9.4,
      changeType: 'increase' as const,
    },
  };
}
