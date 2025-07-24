import React from 'react';
import Chart from '../components/Chart';
import LiveMarket from '../components/LiveMarket';
import RecentUpdates from '../components/RecentUpdates';
import Navbar from '../components/Navbar';

const DashboardPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 p-6 font-sans">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Chart />
          <LiveMarket />
        </div>
        <div className="lg:col-span-1">
          <RecentUpdates />
        </div>
      </main>
    </div>
    </>
  );
};

export default DashboardPage;