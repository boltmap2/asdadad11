// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';
import tradeRoutes from './routes/trade';

console.log('Loading app.ts...');

dotenv.config();

const app = express();

console.log('Setting up middleware...');

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Setting up routes...');

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Trade Dashboard Backend'
  });
});

// API routes
app.use('/api', apiRoutes);
app.use('/api/trade', tradeRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error middleware triggered:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

console.log('App setup complete');

export default app;