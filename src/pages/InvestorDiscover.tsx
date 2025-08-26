import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import StartupCard from '../components/StartupCard';
import backendActor from "../utils/backend";

interface StartupCardProps {
  name: string;
  description: string;
  valuation: string;
  target: string;
  investors: number;
  image?: string;
  onInvest: () => void;
  onDetail: () => void;
}

const DiscoverPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [ideas, setIdeas] = useState<StartupCardProps[]>([
    {
      name: "EcoTech Solutions",
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs",
      valuation: "$2.5M",
      target: "$500K",
      investors: 45,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: EcoTech Solutions");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: EcoTech Solutions");
        window.location.href = `/idea/1`;
      }
    },
    {
      name: "HealthAI Assistant",
      description: "AI-powered personal health monitoring system using wearable devices and machine learning",
      valuation: "$3.2M",
      target: "$750K",
      investors: 78,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: HealthAI Assistant");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: HealthAI Assistant");
        window.location.href = `/idea/2`;
      }
    },
    {
      name: "Smart Farm Network",
      description: "IoT-based precision agriculture platform for sustainable farming and crop optimization",
      valuation: "$4.1M",
      target: "$1M",
      investors: 92,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: Smart Farm Network");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: Smart Farm Network");
        window.location.href = `/idea/3`;
      }
    },
    {
      name: "EduVR Platform",
      description: "Virtual reality educational platform for immersive learning experiences in STEM subjects",
      valuation: "$2.8M",
      target: "$600K",
      investors: 56,
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: EduVR Platform");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: EduVR Platform");
        window.location.href = `/idea/4`;
      }
    },
    {
      name: "CleanWater Systems",
      description: "Portable water purification technology for remote communities and disaster relief",
      valuation: "$1.8M",
      target: "$400K",
      investors: 34,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: CleanWater Systems");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: CleanWater Systems");
        window.location.href = `/idea/5`;
      }
    },
    {
      name: "FinTech Marketplace",
      description: "Decentralized lending platform connecting investors with small businesses globally",
      valuation: "$3.5M",
      target: "$800K",
      investors: 123,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
      onInvest: () => {
        console.log("Invest clicked: FinTech Marketplace");
        window.location.href = `/invest`;
      },
      onDetail: () => {
        console.log("Detail clicked: FinTech Marketplace");
        window.location.href = `/idea/6`;
      }
    }
  ]);

  useEffect(() => {
    // Comment out the API call since we're using hardcoded data
    /*
    const fetchIdeas = async () => {
      try {
        const response = await backendActor.getIdeas();
        setIdeas(response);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
    */
  }, []);

  const filteredIdeas = ideas.filter(idea =>
    idea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 relative">
      <div className="relative text-center py-16 px-4">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#4162FF]/20 via-[#7B68EE]/15 to-[#9665FF]/20 opacity-60">
            <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
              <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4162FF" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#7B68EE" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#9665FF" stopOpacity="0.3"/>
          </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grad1)"/>
              <circle cx="150" cy="100" r="80" fill="#4162FF" fillOpacity="0.1"/>
              <circle cx="650" cy="300" r="120" fill="#9665FF" fillOpacity="0.1"/>
              <circle cx="400" cy="50" r="60" fill="#7B68EE" fillOpacity="0.15"/>
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#324286] mb-4 z-10">
          Trustworthy Investing
        </h1>
        <h2 className="text-5xl font-bold text-[#324286] mb-8 z-10">
          in Brilliant Ideas
        </h2>
        
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

      <div className="max-w-7xl mx-auto px-4 pb-16 bg-[#e8e8ff] pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIdeas.map((idea, index) => (
            <StartupCard
              key={index}
              {...idea}
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
  </>
  );
};

export default DiscoverPage;