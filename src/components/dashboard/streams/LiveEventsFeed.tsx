import { motion, AnimatePresence } from 'framer-motion';
import { useRealTimeEvents } from '@/hooks/useRealTimeEvents';
import { RealTimeBadge } from '../RealTimeBadge';
import { getEventIcon, getEventColor } from '@/lib/mock-data/live-events';
import { formatRelativeTime, capitalizeFirst, formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveEventsFeedProps {
  maxHeight?: string;
  compact?: boolean;
}

export function LiveEventsFeed({ maxHeight = '400px', compact = false }: LiveEventsFeedProps) {
  const { events, isConnected, connectionError, reconnect, clearEvents } = useRealTimeEvents({
    enabled: true,
    eventInterval: 2500,
    maxEvents: 30,
  });

  const getEventDescription = (event: typeof events[0]) => {
    switch (event.type) {
      case 'signup':
        return 'signed up for a trial';
      case 'upgrade':
        return `upgraded to ${event.metadata.newPlan}`;
      case 'downgrade':
        return `downgraded to ${event.metadata.newPlan}`;
      case 'cancellation':
        return 'cancelled their subscription';
      case 'payment':
        return `paid ${formatCurrency(event.metadata.amount || 0)}`;
      case 'login':
        return 'logged in';
      case 'feature_used':
        return `used ${event.metadata.feature}`;
      case 'support_ticket':
        return 'opened a support ticket';
      case 'trial_started':
        return 'started a free trial';
      case 'trial_ended':
        return 'trial ended';
      default:
        return capitalizeFirst(event.type);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Live Events</h3>
          <p className="text-sm text-muted-foreground">Real-time activity stream</p>
        </div>
        <div className="flex items-center gap-2">
          {events.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearEvents}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
          <RealTimeBadge
            isConnected={isConnected}
            error={connectionError}
            onReconnect={reconnect}
          />
        </div>
      </div>

      <div
        className="overflow-y-auto scrollbar-thin"
        style={{ maxHeight }}
      >
        <AnimatePresence initial={false}>
          {events.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">Waiting for events...</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors',
                    index === 0 && 'bg-primary/5'
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <img
                      src={event.user.avatar}
                      alt={event.user.name}
                      className="h-8 w-8 rounded-full ring-2 ring-border"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {event.user.name}
                      </span>
                      <span className={cn('text-base', getEventColor(event.type))}>
                        {getEventIcon(event.type)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getEventDescription(event)}
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(event.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
