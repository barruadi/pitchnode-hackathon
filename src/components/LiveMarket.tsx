import React from 'react';

const marketData = [
  { name: 'TechFlow', change: '+12.00%', investment: '$3.560M', volume: '$65.20M' },
  { name: 'GreenVenture', change: '+10.00%', investment: '$3.560M', volume: '$65.20M' },
  { name: 'FinanceHub', change: '+8.00%', investment: '$3.560M', volume: '$65.20M' },
  { name: 'DataStream', change: '+6.00%', investment: '$3.560M', volume: '$65.20M' },
  { name: 'CloudPilot', change: '+6.00%', investment: '$3.560M', volume: '$65.20M' },
];

const LiveMarket: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Live Market</h2>
        <button className="text-sm font-semibold text-[#6C63FF]">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="py-3 pr-3">Startup</th>
              <th className="py-3 px-3">Change</th>
              <th className="py-3 px-3">Your Investment</th>
              <th className="py-3 px-3">24h Volume</th>
              <th className="py-3 pl-3"></th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-4 pr-3 font-semibold text-gray-800">{item.name}</td>
                <td className="py-4 px-3 font-medium text-green-500">{item.change}</td>
                <td className="py-4 px-3 font-medium text-gray-700">{item.investment}</td>
                <td className="py-4 px-3 font-medium text-gray-700">{item.volume}</td>
                <td className="py-4 pl-3 font-semibold text-[#6C63FF] text-sm cursor-pointer">More Detail</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveMarket;