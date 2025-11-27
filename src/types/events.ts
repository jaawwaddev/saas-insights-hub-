export type EventType = 
  | 'signup'
  | 'upgrade'
  | 'downgrade'
  | 'cancellation'
  | 'payment'
  | 'login'
  | 'feature_used'
  | 'support_ticket'
  | 'trial_started'
  | 'trial_ended';

export interface LiveEvent {
  id: string;
  type: EventType;
  timestamp: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  metadata: {
    plan?: string;
    amount?: number;
    feature?: string;
    previousPlan?: string;
    newPlan?: string;
  };
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  activeConnections: number;
  errorRate: number;
}

export interface RealTimeMetrics {
  activeUsers: number;
  eventsPerMinute: number;
  conversionRate: number;
  serverLoad: number;
}
