import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('Starting server...');
console.log('Environment variables:');
console.log('PORT:', PORT);
console.log('NEO4J_URI:', process.env.NEO4J_URI);
console.log('CLICKHOUSE_URL:', process.env.CLICKHOUSE_URL);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Neo4j will be available at ${process.env.NEO4J_URI}`);
  console.log(`📈 ClickHouse will be available at ${process.env.CLICKHOUSE_URL}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});