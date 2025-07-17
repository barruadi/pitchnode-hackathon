import React from 'react';

const Chart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Chart</h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 5.858a9 9 0 0112.728 0m-2.828 9.9a5 5 0 01-7.072 0" />
        </svg>
      </div>

      <div>
        <p className="text-sm text-gray-500">Ini apa ya</p>
        <p className="text-3xl font-bold text-gray-900 my-2">$35,352.02</p>
      </div>

      <div className="h-48 my-4">
        <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
          <path
            d="M0,80 L25,90 L50,85 L75,100 L100,95 L125,110 L150,105 L175,90 L200,95 L225,80 L250,85 L275,70 L300,90 L325,100 L350,85 L375,95 L400,75 L425,85 L450,65 L475,80 L500,70"
            fill="none"
            stroke="#6C63FF"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <path
            d="M0,80 L25,90 L50,85 L75,100 L100,95 L125,110 L150,105 L175,90 L200,95 L225,80 L250,85 L275,70 L300,90 L325,100 L350,85 L375,95 L400,75 L425,85 L450,65 L475,80 L500,70 V150 H0 Z"
            fill="url(#chartGradient)"
            stroke="none"
          />
        </svg>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-2">
            <button className="bg-[#6C63FF] text-white px-4 py-1.5 rounded-lg text-xs font-bold">1D</button>
            <button className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-lg text-xs font-bold">1W</button>
            <button className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-lg text-xs font-bold">1M</button>
            <button className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-lg text-xs font-bold">1Y</button>
        </div>
        <div className="hidden sm:flex space-x-8 text-xs">
            <span>19:00</span>
            <span>19:10</span>
            <span>19:20</span>
            <span>19:30</span>
            <span>19:40</span>
            <span>19:50</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;