import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TradeGrowthStatsProps {
  data?: {
    period: string;
    countries: Array<{
      name: string;
      growth: number;
    }>;
  };
}

const TradeGrowthStats: React.FC<TradeGrowthStatsProps> = ({ data }) => {
  // Mock data if none is provided
  const mockData = {
    period: '2023-2024',
    countries: [
      { name: 'United States', growth: 4.3 },
      { name: 'China', growth: 5.7 },
      { name: 'Germany', growth: 3.2 },
      { name: 'Japan', growth: -1.5 }
    ]
  };

  const statsData = data || mockData;

  return (
    <div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">Trade Growth Rates</h3>
      <p className="text-sm text-slate-500 mb-4">{statsData.period}</p>
      
      <div className="space-y-4">
        {statsData.countries.map((country, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-slate-900">{country.name}</h4>
              <div className={`flex items-center ${
                country.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {country.growth >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span className="text-xl font-bold">{Math.abs(country.growth)}%</span>
              </div>
            </div>
            
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${country.growth >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(country.growth) * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeGrowthStats;