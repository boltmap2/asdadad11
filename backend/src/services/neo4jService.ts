// backend/src/services/neo4jService.ts
import neo4j, { Driver, Record } from 'neo4j-driver';

export class Neo4jService {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'password'
      )
    );
  }

  async getTradeRelationships(country: string, industry: string) {
    const session = this.driver.session();
    try {
      const result = await session.run(`
        MATCH (c:Country {name: $country})-[t:TRADES_WITH]->(partner:Country)
        WHERE t.industry = $industry
        RETURN partner.name as country, t.value as value
        ORDER BY t.value DESC
        LIMIT 10
      `, { country, industry });
      
      return result.records.map((record: Record) => ({
        country: record.get('country'),
        value: record.get('value')
      }));
    } finally {
      await session.close();
    }
  }

  async close() {
    await this.driver.close();
  }
}