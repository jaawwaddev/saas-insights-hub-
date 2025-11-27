import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Users } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart';
import { generateRevenueData, getRevenueMetrics } from '@/lib/mock-data/revenue';
import { formatCurrency } from '@/lib/utils/formatters';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { DateRangeTabs } from '@/components/dashboard/DateRangePicker';
import { DateRange } from '@/types/analytics';

export default function RevenuePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const { isDark } = useTheme();

  const revenueData = useMemo(() => {
    const days = dateRange === '24h' ? 1 : dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
    return generateRevenueData(days);
  }, [dateRange]);
  
  const revenueMetrics = getRevenueMetrics(revenueData);

  // Generate forecast data
  const forecastData = useMemo(() => {
    const lastValue = revenueData[revenueData.length - 1]?.mrr || 125000;
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
      actual: i < 6 ? lastValue * (0.85 + i * 0.03) : null,
      forecast: lastValue * (0.85 + i * 0.035 + Math.random() * 0.02),
    }));
  }, [revenueData]);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar isCollapsed={false} onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Revenue Analytics"
          subtitle="Track your recurring revenue, growth, and financial health."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="MRR"
              metric={revenueMetrics.mrr}
              format="currency"
              icon={<DollarSign className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="ARR"
              metric={revenueMetrics.arr}
              format="currency"
              icon={<TrendingUp className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="New Revenue"
              metric={revenueMetrics.newRevenue}
              format="currency"
              icon={<CreditCard className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="Customer LTV"
              metric={revenueMetrics.ltv}
              format="currency"
              icon={<Users className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* Main Revenue Chart */}
          <RevenueChart />

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* New vs Churned Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Revenue Flow</h3>
                  <p className="text-sm text-muted-foreground">New vs churned revenue</p>
                </div>
                <DateRangeTabs value={dateRange} onChange={setDateRange} />
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => formatCurrency(value, true)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar
                      dataKey="newRevenue"
                      name="New Revenue"
                      fill="hsl(var(--success))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="churnedRevenue"
                      name="Churned Revenue"
                      fill="hsl(var(--destructive))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Revenue Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">Revenue Forecast</h3>
                <p className="text-sm text-muted-foreground">12-month projection</p>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? 'hsl(217 33% 17%)' : 'hsl(214 32% 91%)'}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => formatCurrency(value, true)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      name="Actual"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      fill="none"
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      name="Forecast"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#forecastGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
