// Application-wide constants

export const APP_NAME = 'SaaS Insights Hub';
export const APP_VERSION = '1.0.0';

// Navigation items
export const NAVIGATION_ITEMS = [
    { name: 'Overview', href: '/', icon: 'LayoutDashboard' },
    { name: 'Revenue', href: '/revenue', icon: 'DollarSign' },
    { name: 'Users', href: '/users', icon: 'Users' },
    { name: 'Churn', href: '/churn', icon: 'TrendingDown' },
    { name: 'Funnel', href: '/funnel', icon: 'Filter' },
    { name: 'Customers', href: '/customers', icon: 'Activity' },
] as const;

export const SECONDARY_NAVIGATION = [
    { name: 'Settings', href: '/settings', icon: 'Settings' },
] as const;

// Date range options
export const DATE_RANGES = {
    '24h': { label: '24 Hours', days: 1 },
    '7d': { label: '7 Days', days: 7 },
    '30d': { label: '30 Days', days: 30 },
    '90d': { label: '90 Days', days: 90 },
} as const;

// Chart colors
export const CHART_COLORS = {
    primary: 'hsl(var(--chart-1))',
    secondary: 'hsl(var(--chart-2))',
    success: 'hsl(var(--chart-3))',
    warning: 'hsl(var(--chart-4))',
    accent: 'hsl(var(--chart-5))',
} as const;

// Default values
export const DEFAULTS = {
    pageSize: 10,
    dateRange: '30d' as const,
    theme: 'system' as const,
    animationDuration: 300,
} as const;

// Status types
export const CUSTOMER_STATUS = {
    ACTIVE: 'active',
    CHURNED: 'churned',
    TRIAL: 'trial',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
    revenue: '/api/revenue',
    users: '/api/users',
    customers: '/api/customers',
    churn: '/api/churn',
    funnel: '/api/funnel',
} as const;
