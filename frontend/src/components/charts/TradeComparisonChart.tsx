import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TradeComparisonChartProps {
  data?: any;
}

const TradeComparisonChart: React.FC<TradeComparisonChartProps> = ({ data }) => {
  // Use mock data if no data is provided
  const mockData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'United States',
        data: [65, 35, 75, 55, 85],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
      },
      {
        label: 'China',
        data: [45, 30, 65, 75, 45],
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
      }
    ]
  };

  const chartData: ChartData<'bar'> = data || mockData;

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          labelTextColor: () => '#475569',
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="h-64 md:h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TradeComparisonChart;