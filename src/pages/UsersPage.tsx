import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Activity, Clock } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { UserGrowthChart } from '@/components/dashboard/charts/UserGrowthChart';
import { generateUserData, getUserMetrics, generateCohortData } from '@/lib/mock-data/users';
import { formatNumber } from '@/lib/utils/formatters';
import { useTheme } from '@/hooks/useTheme';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function UsersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  const userData = useMemo(() => generateUserData(30), []);
  const userMetrics = getUserMetrics(userData);
  const cohortData = useMemo(() => generateCohortData(), []);

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
          title="User Analytics"
          subtitle="Monitor user growth, activity, and engagement metrics."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Daily Active Users"
              metric={userMetrics.dau}
              format="number"
              icon={<Users className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="Weekly Active Users"
              metric={userMetrics.wau}
              format="number"
              icon={<Activity className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="Monthly Active Users"
              metric={userMetrics.mau}
              format="number"
              icon={<Clock className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="New Users (7d)"
              metric={userMetrics.newUsers}
              format="number"
              icon={<UserPlus className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* User Growth Chart */}
          <UserGrowthChart />

          {/* Cohort Retention */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">Cohort Retention</h3>
                <p className="text-sm text-muted-foreground">User retention by week</p>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cohortData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? 'hsl(217 33% 17%)' : 'hsl(214 32% 91%)'}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Retention']}
                    />
                    <Bar
                      dataKey="retention"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* User Activity Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">Activity Summary</h3>
                <p className="text-sm text-muted-foreground">User engagement breakdown</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Power Users', value: 12, percentage: 15, color: 'bg-chart-1' },
                  { label: 'Regular Users', value: 45, percentage: 55, color: 'bg-chart-2' },
                  { label: 'Casual Users', value: 18, percentage: 22, color: 'bg-chart-3' },
                  { label: 'Inactive Users', value: 7, percentage: 8, color: 'bg-chart-4' },
                ].map((segment, index) => (
                  <motion.div
                    key={segment.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{segment.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(segment.value * 100)} users ({segment.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${segment.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + 0.1 * index }}
                        className={`h-full ${segment.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold font-mono text-foreground">67%</p>
                    <p className="text-xs text-muted-foreground">DAU/MAU Ratio</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono text-foreground">4.2</p>
                    <p className="text-xs text-muted-foreground">Avg. Sessions/User</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
