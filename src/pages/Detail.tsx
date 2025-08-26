import React from "react";
import { useParams } from "react-router-dom";
import InvestCard from "../components/InvestIdeaCard";
import ProgressBar from '../components/ProgressBar';

const Detail: React.FC = () => {

  // Hardcoded data
  const idea = {
    id: BigInt(1),
    title: "EcoTech Solutions",
    owner: "john-doe-principal-id",
    description: "Revolutionary sustainable technology platform that connects eco-friendly startups with environmentally conscious investors. Our platform uses AI to match the right investors with green technology companies, creating a marketplace for sustainable innovation. We're building the future of clean technology investment with blockchain-powered transparency and smart contract automation.",
    equity: 15,
    valuation: 500000,
    raisedAmount: 275000,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    investorShares: [],
  };

  const totalInvestor = 42;
  const percentage = (idea.raisedAmount / idea.valuation) * 100;
  const remainingFund = idea.valuation - idea.raisedAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Investment Details
          </h1>
          <p className="text-gray-600">Explore this investment opportunity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Image Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-video">
                <img 
                  src={idea.imageUrl} 
                  alt="Investment Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Funding Progress</h3>
              <ProgressBar progress={percentage}/>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-600">Raised: ${idea.raisedAmount.toLocaleString()}</span>
                <span className="text-gray-600">Goal: ${idea.valuation.toLocaleString()}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
                <p className="text-sm text-gray-500 mb-2">Valuation</p>
                <p className="text-2xl font-bold text-blue-600">${idea.valuation.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
                <p className="text-sm text-gray-500 mb-2">Equity</p>
                <p className="text-2xl font-bold text-purple-600">{idea.equity}%</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
                <p className="text-sm text-gray-500 mb-2">Investors</p>
                <p className="text-2xl font-bold text-green-600">{totalInvestor}</p>
              </div>
            </div>

            {/* Investment Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <InvestCard ideaId={idea.id} remainingFund={remainingFund} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                  Active Campaign
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{idea.title}</h1>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {idea.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Fund</span>
                    <span className="font-semibold">${remainingFund.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Investment</span>
                    <span className="font-semibold">$1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;