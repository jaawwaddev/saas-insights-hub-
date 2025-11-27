import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Target, TrendingUp, Zap } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { FunnelChart } from '@/components/dashboard/charts/FunnelChart';
import { generateFunnelData, getFunnelMetrics } from '@/lib/mock-data/funnel';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';

export default function FunnelPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const funnelData = useMemo(() => generateFunnelData(), []);
  const funnelMetrics = getFunnelMetrics(funnelData);

  const stageDetails = [
    {
      name: 'Visitors → Signups',
      rate: 25,
      improvement: '+2.3%',
      actions: ['Optimize landing page', 'A/B test CTAs', 'Improve load speed'],
    },
    {
      name: 'Signups → Activated',
      rate: 50,
      improvement: '+4.1%',
      actions: ['Improve onboarding', 'Add tutorials', 'Send welcome emails'],
    },
    {
      name: 'Activated → Qualified',
      rate: 40,
      improvement: '+1.8%',
      actions: ['Feature discovery', 'In-app guidance', 'Success milestones'],
    },
    {
      name: 'Qualified → Converted',
      rate: 35,
      improvement: '+5.2%',
      actions: ['Pricing optimization', 'Trial extension', 'Sales outreach'],
    },
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
          title="Conversion Funnel"
          subtitle="Analyze your conversion pipeline and optimize drop-off points."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Total Conversion"
              metric={funnelMetrics.totalConversion}
              format="percentage"
              icon={<Target className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="Signup Rate"
              metric={funnelMetrics.signupRate}
              format="percentage"
              icon={<Filter className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="Activation Rate"
              metric={funnelMetrics.activationRate}
              format="percentage"
              icon={<Zap className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="Final Conversion"
              metric={funnelMetrics.conversionRate}
              format="percentage"
              icon={<TrendingUp className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* Main Funnel */}
          <FunnelChart />

          {/* Stage Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stageDetails.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{stage.name}</h3>
                    <p className="text-sm text-muted-foreground">Conversion Stage</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-foreground">{stage.rate}%</p>
                    <p className="text-sm text-success">{stage.improvement} vs last month</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.rate}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + 0.1 * index }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Optimization Actions
                  </p>
                  <ul className="space-y-1">
                    {stage.actions.map((action, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
