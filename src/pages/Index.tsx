import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingDown, Zap, ArrowUpRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart';
import { UserGrowthChart } from '@/components/dashboard/charts/UserGrowthChart';
import { ChurnChart } from '@/components/dashboard/charts/ChurnChart';
import { FunnelChart } from '@/components/dashboard/charts/FunnelChart';
import { LiveEventsFeed } from '@/components/dashboard/streams/LiveEventsFeed';
import { generateRevenueData, getRevenueMetrics } from '@/lib/mock-data/revenue';
import { generateUserData, getUserMetrics } from '@/lib/mock-data/users';
import { generateChurnData, getChurnMetrics } from '@/lib/mock-data/churn';
import { generateFunnelData, getFunnelMetrics } from '@/lib/mock-data/funnel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const revenueData = useMemo(() => generateRevenueData(30), []);
  const userData = useMemo(() => generateUserData(30), []);
  const churnData = useMemo(() => generateChurnData(30), []);
  const funnelData = useMemo(() => generateFunnelData(), []);

  const revenueMetrics = getRevenueMetrics(revenueData);
  const userMetrics = getUserMetrics(userData);
  const churnMetrics = getChurnMetrics(churnData);
  const funnelMetrics = getFunnelMetrics(funnelData);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar
              isCollapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Dashboard Overview"
          subtitle="Welcome back! Here's what's happening with your business."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Monthly Revenue"
              metric={revenueMetrics.mrr}
              format="currency"
              icon={<DollarSign className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="Active Users"
              metric={userMetrics.dau}
              format="number"
              icon={<Users className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="Churn Rate"
              metric={churnMetrics.churnRate}
              format="percentage"
              icon={<TrendingDown className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="Conversion"
              metric={funnelMetrics.totalConversion}
              format="percentage"
              icon={<Zap className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueChart />
            <UserGrowthChart />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChurnChart />
            </div>
            <FunnelChart compact />
          </div>

          {/* Live Events */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <LiveEventsFeed maxHeight="350px" />
            
            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Export Report', href: '/revenue' },
                  { label: 'View All Users', href: '/users' },
                  { label: 'Analyze Churn', href: '/churn' },
                  { label: 'View Customers', href: '/customers' },
                ].map((action, i) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="justify-between h-auto py-4 px-4"
                    asChild
                  >
                    <a href={action.href}>
                      <span className="text-sm font-medium">{action.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </Button>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">
                  This Month's Highlights
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">New Customers</span>
                    <span className="text-sm font-mono font-semibold text-success">+127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Revenue Growth</span>
                    <span className="text-sm font-mono font-semibold text-success">+12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Avg. Deal Size</span>
                    <span className="text-sm font-mono font-semibold text-foreground">$2,340</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Support Tickets</span>
                    <span className="text-sm font-mono font-semibold text-warning">23</span>
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
