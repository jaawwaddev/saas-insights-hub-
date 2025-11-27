import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  TrendingDown,
  Filter,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Churn', href: '/churn', icon: TrendingDown },
  { name: 'Funnel', href: '/funnel', icon: Filter },
  { name: 'Customers', href: '/customers', icon: Activity },
];

const secondaryNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
            A
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-sidebar-foreground"
            >
              Analytics
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'sidebar-item',
                isActive && 'active',
                isCollapsed && 'justify-center px-0'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary')} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="truncate"
                >
                  {item.name}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {secondaryNav.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'sidebar-item',
                isActive && 'active',
                isCollapsed && 'justify-center px-0'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-sm hover:bg-muted"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </motion.aside>
  );
}
