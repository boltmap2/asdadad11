import { Router } from 'express';
import { Neo4jService } from '../services/neo4jService';
import { ClickHouseService } from '../services/clickhouseService';

const router = Router();
const neo4jService = new Neo4jService();
const clickhouseService = new ClickHouseService();

// Get trade volume data
router.get('/volume', async (req, res) => {
  try {
    const { country, timeFrame, industry, tradeType } = req.query;
    
    console.log('Trade volume request:', { country, timeFrame, industry, tradeType });
    
    // For now, return mock data - we'll connect to ClickHouse later
    const mockData = {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Exports',
          data: [1000, 1200, 1400, 1600, 1800],
          borderColor: 'rgb(37, 99, 235)',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.3,
        },
        {
          label: 'Imports',
          data: [800, 900, 1100, 1300, 1500],
          borderColor: 'rgb(20, 184, 166)',
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          tension: 0.3,
        }
      ]
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Error fetching trade volume:', error);
    res.status(500).json({ error: 'Failed to fetch trade volume data' });
  }
});

// Get top trade partners
router.get('/top-partners', async (req, res) => {
  try {
    const { country, industry } = req.query;
    
    console.log('Top partners request:', { country, industry });
    
    // Mock data for now
    const mockData = [
      { country: 'China', value: 25000 },
      { country: 'Canada', value: 18000 },
      { country: 'Mexico', value: 15000 },
      { country: 'Germany', value: 12000 },
      { country: 'Japan', value: 10000 }
    ];
    
    res.json(mockData);
  } catch (error) {
    console.error('Error fetching top partners:', error);
    res.status(500).json({ error: 'Failed to fetch top trade partners' });
  }
});

// Export/Import comparison
router.get('/comparison', async (req, res) => {
  try {
    const { industry, tradeType } = req.query;
    
    console.log('Comparison request:', { industry, tradeType });
    
    const mockData = {
      labels: ['USA', 'China', 'Germany', 'Japan', 'UK'],
      datasets: [
        {
          label: 'Trade Value (Billions USD)',
          data: [1500, 1200, 800, 600, 500],
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(20, 184, 166, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(168, 85, 247, 0.8)'
          ],
          borderColor: [
            'rgb(37, 99, 235)',
            'rgb(20, 184, 166)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
            'rgb(168, 85, 247)'
          ],
          borderWidth: 1
        }
      ]
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
});

export default router;