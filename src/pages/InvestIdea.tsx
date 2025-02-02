import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backendActor from "../utils/backend";
import InvestCard from "../components/InvestIdeaCard";

const InvestIdea: React.FC = () => {
    const { id }  = useParams();
    const ideaId = Number(id);

    const [idea, setIdea] = useState<any>({});

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const idea = await backendActor.getIdeaDetail(BigInt(ideaId));
                setIdea(idea);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInvestments();
    }, [ideaId]);

    return (
        <div>
            <h1 className="text-3xl font-bold mt-10">Invest in Idea</h1>
            <div className="flex justify-center items-center flex-col">
                <h2 className="text-2xl font-bold mt-5">{idea.title}</h2>
                <p className="text-lg mt-5">{idea.description}</p>
                <p className="text-lg mt-5">Funding Goal: {idea.fundingGoal} ICP</p>
                <p className="text-lg mt-5">Current Funding: {idea.currentFunding} ICP</p>
                {/* <InvestCard ideaId={BigInt(ideaId)}></InvestCard> */}
            </div>
        </div>
    )
}


export default InvestIdea