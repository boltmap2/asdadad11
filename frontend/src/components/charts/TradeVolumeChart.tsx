import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TradeVolumeChartProps {
  data?: any;
}

const TradeVolumeChart: React.FC<TradeVolumeChartProps> = ({ data }) => {
  // Use mock data if no data is provided
  const mockData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2022', '2024', '2026', '2028'],
    datasets: [
      {
        label: 'Exports',
        data: [14, 15, 15.2, 15.5, 16, 17, 19, 21, 23, 25],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Imports',
        data: [9.5, 9.8, 10, 10.5, 11, 12, 13, 14, 16, 17.5],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3,
      }
    ]
  };

  const chartData: ChartData<'line'> = data || mockData;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
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
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="h-64 md:h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TradeVolumeChart;