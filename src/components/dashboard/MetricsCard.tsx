import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricData } from '@/types/analytics';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils/formatters';

interface MetricsCardProps {
  title: string;
  metric: MetricData;
  format?: 'currency' | 'number' | 'percentage';
  icon?: React.ReactNode;
  className?: string;
  index?: number;
}

export function MetricsCard({
  title,
  metric,
  format = 'number',
  icon,
  className,
  index = 0,
}: MetricsCardProps) {
  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, true);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return formatNumber(value);
    }
  };

  const isPositive = metric.changeType === 'increase';
  const isNeutral = metric.changeType === 'neutral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card-hover hover:border-border/80',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.p
            key={metric.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-foreground font-mono"
          >
            {formatValue(metric.value)}
          </motion.p>
          <div className="flex items-center gap-1.5">
            {isNeutral ? (
              <Minus className="h-3.5 w-3.5 text-muted-foreground" />
            ) : isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isNeutral
                  ? 'text-muted-foreground'
                  : isPositive
                  ? 'text-success'
                  : 'text-destructive'
              )}
            >
              {formatPercentage(metric.change)}
            </span>
            <span className="text-sm text-muted-foreground">vs last week</span>
          </div>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
