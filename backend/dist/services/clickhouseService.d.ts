export declare class ClickHouseService {
    private client;
    constructor();
    getTradeVolumeData(country: string, timeFrame: string, industry: string): Promise<{
        labels: any[];
        datasets: {
            label: string;
            data: any[];
            borderColor: string;
            backgroundColor: string;
            tension: number;
        }[];
    }>;
    private getStartYear;
    private formatVolumeData;
}
//# sourceMappingURL=clickhouseService.d.ts.map