import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Trade Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      trade: '/api/trade',
      tradeVolume: '/api/trade/volume',
      topPartners: '/api/trade/top-partners',
      comparison: '/api/trade/comparison'
    }
  });
});

export default router;