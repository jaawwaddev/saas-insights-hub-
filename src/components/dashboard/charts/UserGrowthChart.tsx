import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DateRangeTabs } from '../DateRangePicker';
import { SkeletonChart } from '../SkeletonCard';
import { generateUserData } from '@/lib/mock-data/users';
import { formatNumber } from '@/lib/utils/formatters';
import { DateRange } from '@/types/analytics';
import { useTheme } from '@/hooks/useTheme';

interface UserGrowthChartProps {
  isLoading?: boolean;
}

export function UserGrowthChart({ isLoading = false }: UserGrowthChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const { isDark } = useTheme();

  const data = useMemo(() => {
    const days = dateRange === '24h' ? 1 : dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
    return generateUserData(days);
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
            {payload.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-mono font-medium">
                  {formatNumber(item.value)}
                </span>
              </div>
            ))}
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
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
          <p className="text-sm text-muted-foreground">Daily, weekly, and monthly active users</p>
        </div>
        <DateRangeTabs value={dateRange} onChange={setDateRange} />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => formatNumber(value)}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Line
              type="monotone"
              dataKey="dau"
              name="DAU"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="wau"
              name="WAU"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              animationDuration={1000}
              animationBegin={200}
            />
            <Line
              type="monotone"
              dataKey="mau"
              name="MAU"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              animationDuration={1000}
              animationBegin={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
