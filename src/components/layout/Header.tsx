import { motion } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LiveCounter } from '@/components/dashboard/RealTimeBadge';
import { useRealTimeEvents } from '@/hooks/useRealTimeEvents';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

export function Header({ title, subtitle, onMenuClick, showMobileMenu = false }: HeaderProps) {
  const { metrics, isConnected } = useRealTimeEvents({ enabled: true });

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 lg:px-6 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center gap-4">
        {showMobileMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Live Users Counter - Hidden on mobile */}
        <div className="hidden md:block">
          {isConnected && (
            <LiveCounter
              value={metrics.activeUsers}
              label="active users"
            />
          )}
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 bg-muted/50 border-transparent focus:border-border"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="Profile"
            className="h-8 w-8 rounded-full ring-2 ring-border"
          />
        </Button>
      </div>
    </header>
  );
}
