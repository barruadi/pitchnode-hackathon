import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backendActor from "../utils/backend";
import InvestCard from "../components/InvestIdeaCard";
import ProgressBar from '../components/ProgressBar';
import { Principal } from "@dfinity/principal";

import { BusinessIdea } from "../utils/types";

const Detail: React.FC = () => {
  const { id }  = useParams();
    const ideaId = Number(id);

    const [idea, setIdea] = useState<BusinessIdea>({
      id: BigInt(0),
      title: "",
      owner: "",
      description: "",
      equity: 0,
      valuation: 0,
      raisedAmount: 0,
      imageUrl: "",
      investorShares: [],
    });

    const [totalInvestor, setTotalInvestor] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [remainingFund, setRemainingFund] = useState(0);

    useEffect(() => {
        const fetchInvestments = async () => {
            try {
              const totalInvestor = await backendActor.getTotalInvestor(BigInt(ideaId));
              const ideaFetch = await backendActor.getIdeaDetail(BigInt(ideaId));
              let remainingFunding = Number(ideaFetch.valuation) - Number(ideaFetch.raisedAmount);
                if (remainingFunding < 0) {
                  remainingFunding = 0;
                }
              setRemainingFund(remainingFunding);
              
              const percentageBar = (Number(ideaFetch.raisedAmount) / Number(ideaFetch.valuation)) * 100;
              setPercentage(percentageBar);

              const FormattedIdea: BusinessIdea = {
                ...ideaFetch,
                owner: Principal.from(ideaFetch.owner).toText(),
                investorShares: ideaFetch.investorShares.map((investor: [Principal, number]) => [Principal.from(investor[0]).toText(), investor[1]]),
              }
              
              setTotalInvestor(Number(totalInvestor));
              setIdea(FormattedIdea);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInvestments();
    }, [ideaId]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className='w-full lg:w-1/2 flex flex-col'>
          
          <div className="w-full aspect-video mb-6">
            <img 
              src={idea.imageUrl} 
              alt="Investment Preview" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="mb-6">
            <ProgressBar progress={percentage}/>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Valuation</p>
              <p className="text-2xl font-bold">{Number(idea.valuation)}</p>
            </div>
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Equity</p>
              <p className="text-2xl font-bold">{Number(idea.equity)}</p>
            </div>
            <div className="p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Investors</p>
              <p className="text-2xl font-bold">{totalInvestor}</p>
            </div>
          </div>

          <InvestCard ideaId={BigInt(ideaId)} remainingFund={remainingFund}></InvestCard>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="sticky top-6">
            <h1 className="text-3xl font-bold mb-4">{String(idea.title)}</h1>
            <p className="text-gray-700 leading-relaxed">
              {idea.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;