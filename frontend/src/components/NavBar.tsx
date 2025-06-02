import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Globe className="h-8 w-8 text-blue-700" />
              <span className="ml-2 text-xl font-bold text-slate-900">WORLD TRADE EXPLORER</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
              } mr-2 transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/dashboard' 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
              } transition-colors duration-200`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;