"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jService = void 0;
// backend/src/services/neo4jService.ts
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
class Neo4jService {
    constructor() {
        this.driver = neo4j_driver_1.default.driver(process.env.NEO4J_URI || 'bolt://localhost:7687', neo4j_driver_1.default.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password'));
    }
    async getTradeRelationships(country, industry) {
        const session = this.driver.session();
        try {
            const result = await session.run(`
        MATCH (c:Country {name: $country})-[t:TRADES_WITH]->(partner:Country)
        WHERE t.industry = $industry
        RETURN partner.name as country, t.value as value
        ORDER BY t.value DESC
        LIMIT 10
      `, { country, industry });
            return result.records.map(record => ({
                country: record.get('country'),
                value: record.get('value')
            }));
        }
        finally {
            await session.close();
        }
    }
}
exports.Neo4jService = Neo4jService;
//# sourceMappingURL=neo4jService.js.map