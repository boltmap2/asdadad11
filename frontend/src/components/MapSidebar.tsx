import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface MapSidebarProps {
  selectedCountry: any | null;
  onSearch: (query: string) => void;
  onMetricChange: (metric: string) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  selectedCountry,
  onSearch,
  onMetricChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  if (!selectedCountry) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Global Trade Overview</h2>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search for a country..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Color by Metric</h3>
          <select
            className="w-full p-2 border border-slate-300 rounded-lg"
            onChange={(e) => onMetricChange(e.target.value)}
          >
            <option value="gdp">GDP</option>
            <option value="exports">Total Exports</option>
            <option value="imports">Total Imports</option>
            <option value="balance">Trade Balance</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Trade Agreements</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2">Free Trade Agreements</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2">Customs Unions</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2">Preferential Trade</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">{selectedCountry.name}</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Economic Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-600">GDP</p>
              <p className="text-lg font-semibold">{selectedCountry.gdp}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-600">Trade Balance</p>
              <p className="text-lg font-semibold">
                {parseInt(selectedCountry.exports) - parseInt(selectedCountry.imports)}B USD
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Trade Volume</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Exports</p>
              <p className="text-lg font-semibold">{selectedCountry.exports}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <p className="text-sm text-teal-600">Imports</p>
              <p className="text-lg font-semibold">{selectedCountry.imports}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Top Trade Partners</h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="space-y-2">
              {selectedCountry.topPartners.map((partner: string, index: number) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{partner}</span>
                  <span className="text-slate-600">{Math.floor(Math.random() * 100)}B USD</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Trade Agreements</h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="space-y-2">
              {selectedCountry.tradeAgreements.map((agreement: string, index: number) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>{agreement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;