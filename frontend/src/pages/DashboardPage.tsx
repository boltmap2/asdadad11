import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FilterDropdown from '../components/FilterDropdown';
import TradeVolumeChart from '../components/charts/TradeVolumeChart';
import TradeComparisonChart from '../components/charts/TradeComparisonChart';
import TopTradeTable from '../components/TopTradeTable';
import TradeGrowthStats from '../components/TradeGrowthStats';
import { fetchTradeData } from '../services/api';

const countries = ['United States', 'China', 'Germany', 'Japan', 'Canada', 'United Kingdom', 'France', 'India', 'Brazil', 'South Korea'];
const timeFrames = ['2015-2024', '2020-2024', '2022-2024', 'Last 12 Months', 'Year to Date'];
const industries = ['Agriculture', 'Manufacturing', 'Technology', 'Automotive', 'Energy', 'Pharmaceuticals', 'Textiles', 'Consumer Goods'];
const tradeTypes = ['All', 'Exports', 'Imports'];

const DashboardPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('2015-2024');
  const [selectedIndustry, setSelectedIndustry] = useState('Agriculture');
  const [selectedTradeType, setSelectedTradeType] = useState('All');
  const [tradeData, setTradeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTradeData(selectedCountry, selectedTimeFrame, selectedIndustry, selectedTradeType);
        setTradeData(data);
      } catch (error) {
        console.error('Error fetching trade data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [selectedCountry, selectedTimeFrame, selectedIndustry, selectedTradeType]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Trade Analysis Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterDropdown 
              label="Country"
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
            <FilterDropdown
              label="Time Frame"
              options={timeFrames}
              value={selectedTimeFrame}
              onChange={setSelectedTimeFrame}
            />
            <FilterDropdown
              label="Industry"
              options={industries}
              value={selectedIndustry}
              onChange={setSelectedIndustry}
            />
            <FilterDropdown
              label="Trade Type"
              options={tradeTypes}
              value={selectedTradeType}
              onChange={setSelectedTradeType}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Trade Volumes Over Time</h2>
              <TradeVolumeChart data={tradeData?.volumeData} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Top Imports and Exports</h2>
              <TopTradeTable data={tradeData?.topTradeData} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Compare Countries' Trade by Product</h2>
              <div className="flex mb-4">
                <FilterDropdown
                  label="Industry"
                  options={industries}
                  value={selectedIndustry}
                  onChange={setSelectedIndustry}
                  small
                />
                <FilterDropdown
                  label="Trade Type"
                  options={tradeTypes}
                  value={selectedTradeType}
                  onChange={setSelectedTradeType}
                  small
                />
              </div>
              <TradeComparisonChart data={tradeData?.comparisonData} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Trade Growth Rates</h2>
              <TradeGrowthStats data={tradeData?.growthData} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-slate-800 text-slate-300 py-4 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 World Trade Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;