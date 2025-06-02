"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickHouseService = void 0;
// backend/src/services/clickhouseService.ts
const clickhouse_1 = require("clickhouse");
class ClickHouseService {
    constructor() {
        this.client = new clickhouse_1.ClickHouse({
            url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
            port: 8123,
            debug: false,
            basicAuth: {
                username: process.env.CLICKHOUSE_USER || 'default',
                password: process.env.CLICKHOUSE_PASSWORD || ''
            }
        });
    }
    async getTradeVolumeData(country, timeFrame, industry) {
        const query = `
      SELECT 
        year,
        sum(export_value) as exports,
        sum(import_value) as imports
      FROM trade_data 
      WHERE country = {country:String} 
        AND industry = {industry:String}
        AND year >= {startYear:UInt16}
      GROUP BY year 
      ORDER BY year
    `;
        const startYear = this.getStartYear(timeFrame);
        const result = await this.client.query(query, {
            params: { country, industry, startYear }
        }).toPromise();
        return this.formatVolumeData(result);
    }
    getStartYear(timeFrame) {
        const currentYear = new Date().getFullYear();
        switch (timeFrame) {
            case '2015-2024': return 2015;
            case '2020-2024': return 2020;
            case '2022-2024': return 2022;
            default: return currentYear - 1;
        }
    }
    formatVolumeData(data) {
        const labels = data.map(row => row.year.toString());
        return {
            labels,
            datasets: [
                {
                    label: 'Exports',
                    data: data.map(row => row.exports),
                    borderColor: 'rgb(37, 99, 235)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.3,
                },
                {
                    label: 'Imports',
                    data: data.map(row => row.imports),
                    borderColor: 'rgb(20, 184, 166)',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                    tension: 0.3,
                }
            ]
        };
    }
}
exports.ClickHouseService = ClickHouseService;
//# sourceMappingURL=clickhouseService.js.map