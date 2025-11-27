import { faker } from '@faker-js/faker';

// Set seed for deterministic data
faker.seed(12345);

export function generateTrendData(
  days: number,
  baseValue: number,
  growthRate: number = 0.02,
  volatility: number = 0.1,
  seasonality: boolean = true
): number[] {
  const data: number[] = [];
  let value = baseValue;

  for (let i = 0; i < days; i++) {
    // Apply growth
    value *= (1 + growthRate / 30);
    
    // Add seasonality (weekly pattern)
    if (seasonality) {
      const dayOfWeek = i % 7;
      const seasonalFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.85 : 1.1;
      value *= seasonalFactor;
    }
    
    // Add random volatility
    const noise = 1 + (Math.random() - 0.5) * volatility;
    const finalValue = Math.round(value * noise);
    
    data.push(Math.max(0, finalValue));
    
    // Reset value without seasonality for next iteration
    if (seasonality) {
      const dayOfWeek = i % 7;
      const seasonalFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.85 : 1.1;
      value /= seasonalFactor;
    }
  }

  return data;
}

export function generateDateRange(days: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  
  return dates;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function generateRandomName(): string {
  return faker.person.fullName();
}

export function generateRandomEmail(name: string): string {
  const firstName = name.split(' ')[0].toLowerCase();
  const lastName = name.split(' ')[1]?.toLowerCase() || '';
  const domains = ['gmail.com', 'company.io', 'business.com', 'enterprise.co', 'startup.io'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}@${domain}`;
}

export function generateRandomCompany(): string {
  return faker.company.name();
}

export function generateRandomAvatar(): string {
  const seed = faker.string.alphanumeric(8);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}

export function generateRandomCountry(): string {
  const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia', 'Japan', 'Brazil', 'India', 'Singapore'];
  return countries[Math.floor(Math.random() * countries.length)];
}

export function generateRandomIndustry(): string {
  const industries = ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Manufacturing', 'Real Estate', 'Marketing', 'Consulting', 'Media'];
  return industries[Math.floor(Math.random() * industries.length)];
}
