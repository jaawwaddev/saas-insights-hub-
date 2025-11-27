// Customer Service - Abstraction for customer data operations
import { generateCustomers, getCustomerMetrics } from '../mock/customers';
import type { Customer, CustomerMetrics } from '@/types/customer';

export class CustomerService {
    /**
     * Fetch customers
     * @param count Number of customers to generate
     * @returns Array of customer objects
     */
    static async getCustomers(count: number = 100): Promise<Customer[]> {
        // In production, this would call an API endpoint
        return generateCustomers(count);
    }

    /**
     * Get aggregated customer metrics
     * @param customers Customer array
     * @returns Customer metrics object
     */
    static getMetrics(customers: Customer[]): CustomerMetrics {
        return getCustomerMetrics(customers);
    }

    /**
     * Search customers by name or email
     * @param customers Customer array
     * @param query Search query
     * @returns Filtered customers
     */
    static searchCustomers(customers: Customer[], query: string): Customer[] {
        const lowerQuery = query.toLowerCase();
        return customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(lowerQuery) ||
                customer.email.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Filter customers by status
     * @param customers Customer array
     * @param status Customer status
     * @returns Filtered customers
     */
    static filterByStatus(customers: Customer[], status: string): Customer[] {
        return customers.filter((customer) => customer.status === status);
    }
}

export const customerService = CustomerService;
