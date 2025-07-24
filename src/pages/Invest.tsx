"use client";
import { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import Navbar from "../components/Navbar";
import backendActor from "../utils/backend";
import { Principal } from "@dfinity/principal";

import { BusinessIdea } from "../utils/types";

const ExploreIdeas: React.FC  = () => {
    
    // fetch backend data
    const [idea, setIdea] = useState<BusinessIdea[]>([]);

    useEffect(() => {
        const fetchIdeas = async () => {
            const ideaList = await backendActor.getIdeas();
            
            const formattedIdeas = ideaList.map((idea: any) => ({
                ...idea,
                owner: Principal.from(idea.owner).toText(), // Convert Principal to string
            }));
            setIdea(formattedIdeas);
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
    )

    return (
        <div className="flex flex-col  ">
            <div className="text-center py-10 bg-black flex justify-center items-center flex-col">
                <h1 className="font-bold w-1/2 text-[70px] py-10 bg-gradient-to-r from-[#8B9BE2] to-[#FFFFFF] text-transparent bg-clip-text">Trustworthy Investing in Brilliant Ideas</h1>
                <h1 className="text-white w-1/2 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam laborum accusantium quaerat neque, nostrum saepe nemo ipsa voluptates ad quae consectetur enim quisquam maxime est omnis deserunt necessitatibus hic soluta!</h1>
                <button className="border-white border-2 rounded-full py-2 px-4 my-10 bg-white hover:scale-105 transition-transform duration-300">
                    <a href="#invest" className="font-bold mt-10 px-2 py-2 text-black">Invest Now</a>
                </button>
            </div>
            <section id="invest">
            <h1 className="flex justify-start bg-gradient-to-r text-[37px] from-[#4E1C6B] to-[#324286] mx-10 font-bold mt-10 text-transparent bg-clip-text">Explore The Most Popular Ideas</h1>
            <div className="flex justify-center gap-8 mt-10 px-2">
                {
                    currentIdeas.map((idea, index) => (
                        <IdeaCard key={index} {...idea} />
                    ))
                }
            </div>
            
            <div className="flex justify-center mt-8 gap-4 py-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            </section>
        </div>
    );
}

export default ExploreIdeas;