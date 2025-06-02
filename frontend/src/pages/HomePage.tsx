import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Globe } from 'lucide-react';
import NavBar from '../components/NavBar';
import WorldMap from '../components/WorldMap';
import MapSidebar from '../components/MapSidebar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const handleMetricChange = (metric: string) => {
    console.log('Metric changed to:', metric);
    // Implement metric change functionality
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex">
        <div className="flex-grow flex">
          <div className="w-3/4 h-[calc(100vh-4rem)] p-4">
            <WorldMap onCountrySelect={setSelectedCountry} />
          </div>
          <div className="w-1/4 h-[calc(100vh-4rem)] p-4 bg-slate-50">
            <MapSidebar
              selectedCountry={selectedCountry}
              onSearch={handleSearch}
              onMetricChange={handleMetricChange}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-800 text-slate-300 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 World Trade Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;