// Funnel Service - Abstraction for funnel data operations
import { generateFunnelData } from '../mock/funnel';
import type { FunnelStage } from '@/types/analytics';

export class FunnelService {
    /**
     * Fetch funnel data
     * @returns Array of funnel stages
     */
    static async getFunnelData(): Promise<FunnelStage[]> {
        // In production, this would call an API endpoint
        return generateFunnelData();
    }

    /**
     * Calculate conversion rate between two stages
     * @param fromStage Starting stage users
     * @param toStage Ending stage users
     * @returns Conversion rate percentage
     */
    static calculateConversionRate(fromStage: number, toStage: number): number {
        if (fromStage === 0) return 0;
        return (toStage / fromStage) * 100;
    }

    /**
     * Get overall funnel conversion rate
     * @param stages Funnel stages array
     * @returns Overall conversion percentage
     */
    static getOverallConversion(stages: FunnelStage[]): number {
        if (stages.length === 0) return 0;
        const first = stages[0].users;
        const last = stages[stages.length - 1].users;
        return this.calculateConversionRate(first, last);
    }
}

export const funnelService = FunnelService;
