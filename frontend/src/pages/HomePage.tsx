import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Globe } from 'lucide-react';
import NavBar from '../components/NavBar';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Globe className="h-16 w-16 text-blue-700" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            World Trade Explorer
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Analyze global trade patterns, compare countries, and explore industry-specific 
            trade data with our interactive dashboard.
          </p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Go to Dashboard
          </button>
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