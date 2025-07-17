import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import StartupCard from '../components/StartupCard';
import { mapBusinessIdeaToCard } from '../utils/helper';
import { Businessidea } from '../declarations/backend/backend.did';
import backendActor from "../utils/backend";

const DiscoverPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [ideas, setIdeas] = useState<Businessidea[]>([]);
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await backendActor.getIdeas();
        setIdeas(response);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
  }
  , []);

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center py-16 px-4 bg-[url('../assets/top-discover.png')]">
        <h1 className="text-5xl font-bold text-[#324286] mb-4">
          Trustworthy Investing
        </h1>
        <h2 className="text-5xl font-bold text-[#324286] mb-8">
          in Brilliant Ideas
        </h2>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4">
            <Filter className="w-5 h-5 text-gray-400 mr-4" />
            <input
              type="text"
              placeholder="Search startups, ideas, or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
            />
            <Search className="w-5 h-5 text-gray-400 ml-4" />
          </div>
        </div>
      </div>

      {/* Idea Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIdeas.map((idea) => (
            <StartupCard
            key={Number(idea.id)} // karena id itu bigint
            {...mapBusinessIdeaToCard(
              idea,
              () => {
                console.log("Invest clicked:", idea.id);
                window.location.href = `/invest/${idea.id}`;
              },
              () => {
                console.log("Detail clicked:", idea.id);
                window.location.href = `/idea/${idea.id}`;
              }
            )}
          />
          ))}
        </div>
        
        {filteredIdeas.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No startups found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;