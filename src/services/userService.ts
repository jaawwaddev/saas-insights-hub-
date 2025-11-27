// User Service - Abstraction for user data operations
import { generateUsers, getUserMetrics } from '../mock/users';
import type { UserData, UserMetrics } from '@/types/analytics';

export class UserService {
    /**
     * Fetch user data for a given time period
     * @param days Number of days to fetch data for
     * @returns Array of user data points
     */
    static async getUserData(days: number): Promise<UserData[]> {
        // In production, this would call an API endpoint
        return generateUsers(days);
    }

    /**
     * Get aggregated user metrics
     * @param data User data array
     * @returns User metrics object
     */
    static getMetrics(data: UserData[]): UserMetrics {
        return getUserMetrics(data);
    }

    /**
     * Get user growth trend
     * @param data User data array
     * @returns Growth percentage
     */
    static getGrowthTrend(data: UserData[]): number {
        if (data.length < 2) return 0;
        const current = data[data.length - 1].total;
        const previous = data[0].total;
        return ((current - previous) / previous) * 100;
    }
}

export const userService = UserService;
