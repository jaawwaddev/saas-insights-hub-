// Revenue Service - Abstraction for revenue data operations
import { generateRevenueData, getRevenueMetrics } from '../mock/revenue';
import type { RevenueData, RevenueMetrics } from '@/types/analytics';

export class RevenueService {
    /**
     * Fetch revenue data for a given time period
     * @param days Number of days to fetch data for
     * @returns Array of revenue data points
     */
    static async getRevenueData(days: number): Promise<RevenueData[]> {
        // In production, this would call an API endpoint
        // return await api.get('/revenue', { params: { days } });

        return generateRevenueData(days);
    }

    /**
     * Get aggregated revenue metrics
     * @param data Revenue data array
     * @returns Revenue metrics object
     */
    static getMetrics(data: RevenueData[]): RevenueMetrics {
        return getRevenueMetrics(data);
    }

    /**
     * Export revenue data
     * @param data Revenue data to export
     * @param format Export format (csv, json)
     */
    static async exportData(data: RevenueData[], format: 'csv' | 'json' = 'csv'): Promise<void> {
        // Implementation for data export
        console.log(`Exporting ${data.length} revenue records as ${format}`);
    }
}

export const revenueService = RevenueService;
