export type CustomerStatus = 'active' | 'trial' | 'churned' | 'paused';
export type CustomerPlan = 'starter' | 'professional' | 'enterprise';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  mrr: number;
  ltv: number;
  joinedAt: Date;
  lastActiveAt: Date;
  country: string;
  industry: string;
}

export interface CustomerFilters {
  search: string;
  status: CustomerStatus | 'all';
  plan: CustomerPlan | 'all';
}

export interface CustomerSort {
  field: keyof Customer;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
