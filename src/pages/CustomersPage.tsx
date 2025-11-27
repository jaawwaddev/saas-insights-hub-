import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, DollarSign, Activity } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { CustomersTable } from '@/components/dashboard/tables/CustomersTable';
import { generateCustomers, getCustomerMetrics } from '@/lib/mock-data/customers';

export default function CustomersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const customers = useMemo(() => generateCustomers(100), []);
  const metrics = getCustomerMetrics(customers);

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
          title="Customers"
          subtitle="Manage and analyze your customer base."
          onMenuClick={() => setMobileMenuOpen(true)}
          showMobileMenu
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Total Customers"
              metric={{
                value: metrics.total,
                previousValue: metrics.total - 12,
                change: 8.5,
                changeType: 'increase',
              }}
              format="number"
              icon={<Users className="h-5 w-5" />}
              index={0}
            />
            <MetricsCard
              title="Active Customers"
              metric={{
                value: metrics.active,
                previousValue: metrics.active - 8,
                change: 5.2,
                changeType: 'increase',
              }}
              format="number"
              icon={<Activity className="h-5 w-5" />}
              index={1}
            />
            <MetricsCard
              title="Trial Users"
              metric={{
                value: metrics.trial,
                previousValue: metrics.trial - 3,
                change: 12.5,
                changeType: 'increase',
              }}
              format="number"
              icon={<UserPlus className="h-5 w-5" />}
              index={2}
            />
            <MetricsCard
              title="Avg. LTV"
              metric={{
                value: Math.round(metrics.avgLtv),
                previousValue: Math.round(metrics.avgLtv * 0.95),
                change: 5.3,
                changeType: 'increase',
              }}
              format="currency"
              icon={<DollarSign className="h-5 w-5" />}
              index={3}
            />
          </div>

          {/* Customers Table */}
          <CustomersTable />
        </main>
      </div>
    </div>
  );
}
