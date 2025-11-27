import { Customer, CustomerPlan, CustomerStatus } from '@/types/customer';
import { 
  generateRandomName, 
  generateRandomEmail, 
  generateRandomCompany, 
  generateRandomAvatar,
  generateRandomCountry,
  generateRandomIndustry
} from './generators';

const statuses: CustomerStatus[] = ['active', 'active', 'active', 'active', 'trial', 'trial', 'churned', 'paused'];
const plans: CustomerPlan[] = ['starter', 'starter', 'professional', 'professional', 'professional', 'enterprise'];

function generateCustomer(index: number): Customer {
  const name = generateRandomName();
  const status = statuses[index % statuses.length];
  const plan = plans[index % plans.length];
  
  const mrrByPlan = {
    starter: 29 + Math.random() * 20,
    professional: 99 + Math.random() * 50,
    enterprise: 499 + Math.random() * 500,
  };
  
  const mrr = status === 'churned' ? 0 : mrrByPlan[plan];
  const lifetimeMonths = Math.floor(Math.random() * 24) + 1;
  const ltv = mrr * lifetimeMonths;
  
  const joinedAt = new Date();
  joinedAt.setMonth(joinedAt.getMonth() - lifetimeMonths);
  
  const lastActiveAt = new Date();
  if (status === 'churned') {
    lastActiveAt.setDate(lastActiveAt.getDate() - Math.floor(Math.random() * 60) - 7);
  } else if (status === 'paused') {
    lastActiveAt.setDate(lastActiveAt.getDate() - Math.floor(Math.random() * 14) - 3);
  } else {
    lastActiveAt.setHours(lastActiveAt.getHours() - Math.floor(Math.random() * 72));
  }
  
  return {
    id: `cust_${(index + 1).toString().padStart(6, '0')}`,
    name,
    email: generateRandomEmail(name),
    company: generateRandomCompany(),
    avatar: generateRandomAvatar(),
    status,
    plan,
    mrr,
    ltv,
    joinedAt,
    lastActiveAt,
    country: generateRandomCountry(),
    industry: generateRandomIndustry(),
  };
}

let customersCache: Customer[] | null = null;

export function generateCustomers(count: number = 100): Customer[] {
  if (customersCache && customersCache.length === count) {
    return customersCache;
  }
  
  customersCache = Array.from({ length: count }, (_, i) => generateCustomer(i));
  return customersCache;
}

export function getCustomerMetrics(customers: Customer[]) {
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const trialCustomers = customers.filter(c => c.status === 'trial').length;
  const churnedCustomers = customers.filter(c => c.status === 'churned').length;
  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
  const avgLtv = customers.reduce((sum, c) => sum + c.ltv, 0) / customers.length;
  
  return {
    total: customers.length,
    active: activeCustomers,
    trial: trialCustomers,
    churned: churnedCustomers,
    totalMrr,
    avgLtv,
  };
}
