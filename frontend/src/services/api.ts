import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTradeData = async (
  country: string,
  timeFrame: string,
  industry: string,
  tradeType: string
) => {
  try {
    const [volumeResponse, topTradeResponse, comparisonResponse, growthResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/trade/volume`, {
        params: { country, timeFrame, industry, tradeType }
      }),
      axios.get(`${API_BASE_URL}/trade/top-partners`, {
        params: { country, industry }
      }),
      axios.get(`${API_BASE_URL}/analytics/comparison`, {
        params: { industry, tradeType }
      }),
      axios.get(`${API_BASE_URL}/analytics/growth`, {
        params: { timeFrame }
      })
    ]);

    return {
      volumeData: volumeResponse.data,
      topTradeData: topTradeResponse.data,
      comparisonData: comparisonResponse.data,
      growthData: growthResponse.data
    };
  } catch (error) {
    console.error('Error fetching trade data:', error);
    throw error;
  }
};