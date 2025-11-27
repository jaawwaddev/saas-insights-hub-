import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateFunnelData } from '@/lib/mock-data/funnel';
import { formatNumber } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface FunnelChartProps {
  isLoading?: boolean;
  compact?: boolean;
}

export function FunnelChart({ isLoading = false, compact = false }: FunnelChartProps) {
  const data = useMemo(() => generateFunnelData(), []);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="h-72 animate-pulse bg-muted/50 rounded-lg" />
      </div>
    );
  }

  const maxWidth = 100;
  const minWidth = 35;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        'rounded-xl border border-border bg-card p-6',
        compact && 'p-4'
      )}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
        <p className="text-sm text-muted-foreground">
          Total conversion:{' '}
          <span className="font-mono text-success">{data.totalConversion.toFixed(2)}%</span>
        </p>
      </div>

      <div className="space-y-3">
        {data.stages.map((stage, index) => {
          const widthPercentage =
            minWidth + (maxWidth - minWidth) * (stage.percentage / 100);

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{stage.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-foreground">
                    {formatNumber(stage.value)}
                  </span>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {stage.percentage}%
                  </span>
                </div>
              </div>

              <div className="relative h-10 bg-muted/50 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className="absolute left-0 top-0 h-full rounded-lg"
                  style={{
                    background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)`,
                  }}
                />

                {index > 0 && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="text-xs font-medium text-destructive/80">
                      -{stage.dropoff}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Visitors to Signup</p>
              <p className="text-lg font-mono font-semibold text-foreground">25%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Signup to Paid</p>
              <p className="text-lg font-mono font-semibold text-foreground">7%</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
