import { motion } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RealTimeBadgeProps {
  isConnected: boolean;
  error?: string | null;
  onReconnect?: () => void;
  className?: string;
}

export function RealTimeBadge({
  isConnected,
  error,
  onReconnect,
  className,
}: RealTimeBadgeProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {error ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-destructive">{error}</span>
          {onReconnect && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReconnect}
              className="h-7 px-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            {isConnected && (
              <motion.div
                className="absolute h-2.5 w-2.5 rounded-full bg-success"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isConnected ? 'bg-success' : 'bg-muted-foreground'
              )}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Live' : 'Offline'}
          </span>
          {isConnected ? (
            <Wifi className="h-3.5 w-3.5 text-success" />
          ) : (
            <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
}

interface LiveCounterProps {
  value: number;
  label: string;
  className?: string;
}

export function LiveCounter({ value, label, className }: LiveCounterProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-success"
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="h-2 w-2 rounded-full bg-success" />
      </div>
      <div className="flex items-baseline gap-2">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold font-mono text-foreground"
        >
          {value.toLocaleString()}
        </motion.span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
