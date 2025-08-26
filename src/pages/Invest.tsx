"use client";
import { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import Navbar from "../components/Navbar";
import backendActor from "../utils/backend";
import { Principal } from "@dfinity/principal";

import { BusinessIdea } from "../utils/types";

const ExploreIdeas: React.FC = () => {
    
    // Hardcoded idea for testing
    const hardcodedIdea: BusinessIdea = {
        id: BigInt(1),
        title: "EcoTech Solutions",
        description: "Revolutionary green technology platform that connects sustainable startups with eco-conscious investors",
        owner: "2vxsx-fae4w-pqaaa-aaaab-cai",
        equity: 15,
        valuation: 500000,
        raisedAmount: 45000,
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        investorShares: [],
    };

    // fetch backend data
    const [idea, setIdea] = useState<BusinessIdea[]>([hardcodedIdea]);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const ideaList = await backendActor.getIdeas();
                
                const formattedIdeas = ideaList.map((idea: any) => ({
                    ...idea,
                    owner: Principal.from(idea.owner).toText(),
                }));
                
                // Combine hardcoded idea with fetched ideas
                setIdea([hardcodedIdea, ...formattedIdeas]);
            } catch (error) {
                console.error("Failed to fetch ideas:", error);
                // Keep only hardcoded idea if fetch fails
                setIdea([hardcodedIdea]);
            }
        };
        fetchIdeas();
    }, []);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(idea.length / itemsPerPage);
    const currentIdeas = idea.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text">
                            Trustworthy Investing in Brilliant Ideas
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                            Discover innovative startups and invest in the future of technology, sustainability, and innovation.
                        </p>
                        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <a href="#invest">Start Investing</a>
                        </button>
                    </div>
                </div>
            </div>

            {/* Ideas Section */}
            <section id="invest" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                        Explore Popular Investment Opportunities
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {currentIdeas.map((idea, index) => (
                            <IdeaCard key={index} {...idea} />
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
                        >
                            Previous
                        </button>
                        <span className="text-lg font-semibold text-gray-700 px-4">
                            {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ExploreIdeas;