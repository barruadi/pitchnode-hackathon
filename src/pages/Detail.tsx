import React from 'react';
import ProgressBar from '../components/ProgressBar';

function Detail() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className='w-full lg:w-1/2 flex flex-col'>
          
          <div className="w-full aspect-video mb-6">
            <img 
              src="../assets/invest.png" 
              alt="Investment Preview" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="mb-6">
            <ProgressBar progress={75}/>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Indicator 1</p>
              <p className="text-2xl font-bold">$100K</p>
            </div>
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Indicator 2</p>
              <p className="text-2xl font-bold">3-12%</p>
            </div>
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Investors</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter amount investment"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-8 py-3 bg-[#6C63FF] text-white font-semibold rounded-lg hover:bg-[#5850EC] transition-colors whitespace-nowrap">
              Invest
            </button>
          </div>
        </div>

        {/* Right Column - Title Section */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-6">
            <h1 className="text-3xl font-bold mb-4">Idea Title</h1>
            <p className="text-gray-700 leading-relaxed">
              General overview of the idea. They can showcase their unique and innovative ideas here to raise funds based on their target etc etc. General overview of the idea. They can showcase their unique and innovative ideas here to raise funds based on their target etc etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;