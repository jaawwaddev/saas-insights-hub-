// Churn Service - Abstraction for churn analysis operations
import { generateChurnData, getChurnMetrics } from '../mock/churn';
import type { ChurnData, ChurnMetrics } from '@/types/analytics';

export class ChurnService {
    /**
     * Fetch churn data for a given time period
     * @param days Number of days to fetch data for
     * @returns Array of churn data points
     */
    static async getChurnData(days: number): Promise<ChurnData[]> {
        // In production, this would call an API endpoint
        return generateChurnData(days);
    }

    /**
     * Get aggregated churn metrics
     * @param data Churn data array
     * @returns Churn metrics object
     */
    static getMetrics(data: ChurnData[]): ChurnMetrics {
        return getChurnMetrics(data);
    }

    /**
     * Calculate churn rate for a period
     * @param churned Number of churned customers
     * @param total Total number of customers
     * @returns Churn rate percentage
     */
    static calculateChurnRate(churned: number, total: number): number {
        if (total === 0) return 0;
        return (churned / total) * 100;
    }
}

export const churnService = ChurnService;
