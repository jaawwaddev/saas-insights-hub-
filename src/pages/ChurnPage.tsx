import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Users, AlertTriangle, Shield } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { ChurnChart } from '@/components/dashboard/charts/ChurnChart';
import { generateChurnData, getChurnMetrics } from '@/lib/mock-data/churn';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';
import { useTheme } from '@/hooks/useTheme';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export default function ChurnPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  const churnData = useMemo(() => generateChurnData(30), []);
  const churnMetrics = getChurnMetrics(churnData);

  const churnReasons = [
    { name: 'Price', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Features', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Support', value: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Competitor', value: 15, color: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 10, color: 'hsl(var(--chart-5))' },
  ];

  const atRiskUsers = [
    { name: 'John Smith', company: 'Acme Inc.', risk: 85, reason: 'No login for 14 days' },
    { name: 'Sarah Johnson', company: 'TechCorp', risk: 72, reason: 'Support tickets' },
    { name: 'Mike Davis', company: 'StartupXYZ', risk: 68, reason: 'Feature complaints' },
    { name: 'Emily Brown', company: 'GrowthCo', risk: 61, reason: 'Payment failed' },
  ];

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
          title="Churn Analytics"
          subtitle="Monitor and reduce customer churn with actionable insights."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Churn Rate"
              metric={churnMetrics.churnRate}
              format="percentage"
              icon={<TrendingDown className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="Churned Users (Today)"
              metric={churnMetrics.churnedUsers}
              format="number"
              icon={<Users className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="Retention Rate"
              metric={churnMetrics.retentionRate}
              format="percentage"
              icon={<Shield className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="At Risk Users"
              metric={{ value: 23, previousValue: 28, change: -17.9, changeType: 'increase' }}
              format="number"
              icon={<AlertTriangle className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* Churn Chart */}
          <ChurnChart />

          {/* Churn Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Churn Reasons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">Churn Reasons</h3>
                <p className="text-sm text-muted-foreground">Why customers leave</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={churnReasons}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {churnReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={8}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* At Risk Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">At Risk Customers</h3>
                <p className="text-sm text-muted-foreground">Customers likely to churn</p>
              </div>

              <div className="space-y-4">
                {atRiskUsers.map((user, index) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-semibold text-destructive">
                        {user.risk}% risk
                      </p>
                      <p className="text-xs text-muted-foreground">{user.reason}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
