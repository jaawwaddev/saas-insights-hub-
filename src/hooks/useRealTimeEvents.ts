import { useState, useEffect, useCallback, useRef } from 'react';
import { LiveEvent, RealTimeMetrics, SystemHealth } from '@/types/events';
import { generateLiveEvent, generateRealTimeMetrics, generateSystemHealth } from '@/lib/mock-data/live-events';

interface UseRealTimeEventsOptions {
  enabled?: boolean;
  eventInterval?: number;
  metricsInterval?: number;
  maxEvents?: number;
}

interface UseRealTimeEventsReturn {
  events: LiveEvent[];
  metrics: RealTimeMetrics;
  health: SystemHealth;
  isConnected: boolean;
  connectionError: string | null;
  reconnect: () => void;
  disconnect: () => void;
  clearEvents: () => void;
}

export function useRealTimeEvents(options: UseRealTimeEventsOptions = {}): UseRealTimeEventsReturn {
  const {
    enabled = true,
    eventInterval = 3000,
    metricsInterval = 5000,
    maxEvents = 50,
  } = options;

  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [metrics, setMetrics] = useState<RealTimeMetrics>(generateRealTimeMetrics());
  const [health, setHealth] = useState<SystemHealth>(generateSystemHealth());
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const eventIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!enabled) return;

    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setConnectionError(null);

      // Start event stream
      eventIntervalRef.current = setInterval(() => {
        const newEvent = generateLiveEvent();
        setEvents(prev => [newEvent, ...prev].slice(0, maxEvents));
      }, eventInterval);

      // Start metrics updates
      metricsIntervalRef.current = setInterval(() => {
        setMetrics(generateRealTimeMetrics());
        setHealth(generateSystemHealth());
      }, metricsInterval);

    }, 500);
  }, [enabled, eventInterval, metricsInterval, maxEvents]);

  const disconnect = useCallback(() => {
    if (eventIntervalRef.current) {
      clearInterval(eventIntervalRef.current);
      eventIntervalRef.current = null;
    }
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
      metricsIntervalRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setConnectionError(null);
    connect();
  }, [disconnect, connect]);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  // Simulate occasional reconnection
  useEffect(() => {
    if (!enabled || !isConnected) return;

    const reconnectCheck = setInterval(() => {
      // 2% chance of temporary disconnection
      if (Math.random() < 0.02) {
        disconnect();
        setConnectionError('Connection lost. Reconnecting...');
        setTimeout(() => {
          reconnect();
        }, 2000);
      }
    }, 30000);

    return () => clearInterval(reconnectCheck);
  }, [enabled, isConnected, disconnect, reconnect]);

  return {
    events,
    metrics,
    health,
    isConnected,
    connectionError,
    reconnect,
    disconnect,
    clearEvents,
  };
}
