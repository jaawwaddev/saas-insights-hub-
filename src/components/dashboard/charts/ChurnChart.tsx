import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { DateRangeTabs } from '../DateRangePicker';
import { SkeletonChart } from '../SkeletonCard';
import { generateChurnData } from '@/lib/mock-data/churn';
import { DateRange } from '@/types/analytics';
import { useTheme } from '@/hooks/useTheme';

interface ChurnChartProps {
  isLoading?: boolean;
}

export function ChurnChart({ isLoading = false }: ChurnChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const { isDark } = useTheme();

  const data = useMemo(() => {
    const days = dateRange === '24h' ? 1 : dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
    return generateChurnData(days);
  }, [dateRange]);

  if (isLoading) {
    return <SkeletonChart />;
  }

  const avgChurnRate = data.reduce((sum, d) => sum + d.churnRate, 0) / data.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-3 shadow-lg"
        >
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Churn Rate</span>
              <span className="text-sm font-mono font-medium text-destructive">
                {item.churnRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Churned Users</span>
              <span className="text-sm font-mono font-medium">
                {item.churnedUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Retained</span>
              <span className="text-sm font-mono font-medium text-success">
                {item.retainedUsers.toLocaleString()}
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
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Churn Rate</h3>
          <p className="text-sm text-muted-foreground">
            Average: <span className="font-mono text-destructive">{avgChurnRate.toFixed(2)}%</span>
          </p>
        </div>
        <DateRangeTabs value={dateRange} onChange={setDateRange} />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}%`}
              dx={-10}
              domain={[0, 5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="churnRate"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.churnRate > avgChurnRate
                      ? 'hsl(var(--destructive))'
                      : 'hsl(var(--chart-4))'
                  }
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
