import React from 'react';

interface TopTradeTableProps {
  data?: {
    exports: Array<{ country: string; value: number }>;
    imports: Array<{ country: string; value: number }>;
  };
}

const TopTradeTable: React.FC<TopTradeTableProps> = ({ data }) => {
  // Mock data if none is provided
  const mockData = {
    exports: [
      { country: 'Germany', value: 321.6 },
      { country: 'China', value: 246.3 },
      { country: 'Canada', value: 182.9 },
      { country: 'Japan', value: 89.1 }
    ],
    imports: [
      { country: 'United States', value: 415.8 },
      { country: 'Germany', value: 321.6 },
      { country: 'China', value: 246.3 },
      { country: 'Canada', value: 182.9 }
    ]
  };

  const tableData = data || mockData;

  return (
    <div className="overflow-hidden">
      <h3 className="text-lg font-medium text-slate-900 mb-4">Top Imports and Exports</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-slate-800 mb-2">Exports</h4>
          <div className="overflow-hidden border border-slate-200 rounded-md">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tableData.exports.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-3 py-2 text-sm text-slate-900">
                      {item.country}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-900 text-right">
                      {item.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-slate-800 mb-2">Imports</h4>
          <div className="overflow-hidden border border-slate-200 rounded-md">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tableData.imports.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-3 py-2 text-sm text-slate-900">
                      {item.country}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-900 text-right">
                      {item.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTradeTable;