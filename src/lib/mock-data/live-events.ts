import { LiveEvent, EventType, SystemHealth, RealTimeMetrics } from '@/types/events';
import { generateRandomName, generateRandomAvatar } from './generators';

const eventTypes: EventType[] = [
  'signup', 'signup', 'signup',
  'upgrade', 'upgrade',
  'login', 'login', 'login', 'login',
  'feature_used', 'feature_used', 'feature_used',
  'payment',
  'trial_started', 'trial_started',
  'downgrade',
  'cancellation',
  'support_ticket',
];

const features = ['Dashboard', 'Reports', 'API', 'Integrations', 'Team Management', 'Analytics', 'Export'];
const plans = ['Starter', 'Professional', 'Enterprise'];

export function generateLiveEvent(): LiveEvent {
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const name = generateRandomName();
  
  let metadata: LiveEvent['metadata'] = {};
  
  switch (type) {
    case 'upgrade':
      metadata = {
        previousPlan: plans[Math.floor(Math.random() * 2)],
        newPlan: plans[Math.floor(Math.random() * 2) + 1],
        amount: [99, 199, 499][Math.floor(Math.random() * 3)],
      };
      break;
    case 'downgrade':
      metadata = {
        previousPlan: plans[Math.floor(Math.random() * 2) + 1],
        newPlan: plans[Math.floor(Math.random() * 2)],
      };
      break;
    case 'payment':
      metadata = {
        amount: Math.floor(Math.random() * 500) + 29,
        plan: plans[Math.floor(Math.random() * 3)],
      };
      break;
    case 'feature_used':
      metadata = {
        feature: features[Math.floor(Math.random() * features.length)],
      };
      break;
    case 'signup':
    case 'trial_started':
      metadata = {
        plan: 'Trial',
      };
      break;
    case 'cancellation':
      metadata = {
        previousPlan: plans[Math.floor(Math.random() * 3)],
      };
      break;
  }
  
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp: new Date(),
    user: {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: `${name.split(' ')[0].toLowerCase()}@example.com`,
      avatar: generateRandomAvatar(),
    },
    metadata,
  };
}

export function getEventIcon(type: EventType): string {
  const icons: Record<EventType, string> = {
    signup: '👤',
    upgrade: '⬆️',
    downgrade: '⬇️',
    cancellation: '❌',
    payment: '💳',
    login: '🔐',
    feature_used: '⚡',
    support_ticket: '🎫',
    trial_started: '🎯',
    trial_ended: '⏰',
  };
  return icons[type];
}

export function getEventColor(type: EventType): string {
  const colors: Record<EventType, string> = {
    signup: 'text-chart-2',
    upgrade: 'text-success',
    downgrade: 'text-warning',
    cancellation: 'text-destructive',
    payment: 'text-chart-1',
    login: 'text-muted-foreground',
    feature_used: 'text-chart-5',
    support_ticket: 'text-warning',
    trial_started: 'text-chart-2',
    trial_ended: 'text-muted-foreground',
  };
  return colors[type];
}

export function generateSystemHealth(): SystemHealth {
  return {
    status: Math.random() > 0.95 ? 'degraded' : 'healthy',
    uptime: 99.98 + Math.random() * 0.02,
    responseTime: 45 + Math.floor(Math.random() * 30),
    activeConnections: 2400 + Math.floor(Math.random() * 200),
    errorRate: Math.random() * 0.5,
  };
}

export function generateRealTimeMetrics(): RealTimeMetrics {
  return {
    activeUsers: 4200 + Math.floor(Math.random() * 300),
    eventsPerMinute: 850 + Math.floor(Math.random() * 150),
    conversionRate: 2.3 + Math.random() * 0.4,
    serverLoad: 45 + Math.random() * 20,
  };
}
