import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DateRangeTabs } from '../DateRangePicker';
import { SkeletonChart } from '../SkeletonCard';
import { generateRevenueData } from '@/lib/mock-data/revenue';
import { formatCurrency } from '@/lib/utils/formatters';
import { DateRange } from '@/types/analytics';
import { useTheme } from '@/hooks/useTheme';

interface RevenueChartProps {
  isLoading?: boolean;
}

export function RevenueChart({ isLoading = false }: RevenueChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const { isDark } = useTheme();

  const data = useMemo(() => {
    const days = dateRange === '24h' ? 1 : dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
    return generateRevenueData(days);
  }, [dateRange]);

  if (isLoading) {
    return <SkeletonChart />;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-3 shadow-lg"
        >
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">MRR</span>
              <span className="text-sm font-mono font-medium text-chart-1">
                {formatCurrency(payload[0]?.value || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">New Revenue</span>
              <span className="text-sm font-mono font-medium text-success">
                {formatCurrency(payload[0]?.payload?.newRevenue || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Churned</span>
              <span className="text-sm font-mono font-medium text-destructive">
                {formatCurrency(payload[0]?.payload?.churnedRevenue || 0)}
              </span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue</h3>
          <p className="text-sm text-muted-foreground">Monthly recurring revenue over time</p>
        </div>
        <DateRangeTabs value={dateRange} onChange={setDateRange} />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? 'hsl(217 33% 17%)' : 'hsl(214 32% 91%)'}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value, true)}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
