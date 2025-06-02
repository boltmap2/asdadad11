// backend/src/services/clickhouseService.ts
import { createClient, ClickHouseClient } from '@clickhouse/client';

export class ClickHouseService {
  private client: ClickHouseClient;

  constructor() {
    this.client = createClient({
      host: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
      username: process.env.CLICKHOUSE_USER || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || '',
      database: process.env.CLICKHOUSE_DATABASE || 'default'
    });
  }

  async getTradeVolumeData(country: string, timeFrame: string, industry: string) {
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
    
    const resultSet = await this.client.query({
      query,
      query_params: { country, industry, startYear }
    });
    
    const result = await resultSet.json<{ data: TradeDataRow[] }>();
    return this.formatVolumeData(result.data);
  }

  private getStartYear(timeFrame: string): number {
    const currentYear = new Date().getFullYear();
    switch (timeFrame) {
      case '2015-2024': return 2015;
      case '2020-2024': return 2020;
      case '2022-2024': return 2022;
      default: return currentYear - 1;
    }
  }

  private formatVolumeData(data: TradeDataRow[]) {
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

  async close() {
    await this.client.close();
  }
}

interface TradeDataRow {
  year: number;
  exports: number;
  imports: number;
}