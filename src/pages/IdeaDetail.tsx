import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backendActor from "../utils/backend";
import { Businessidea } from "../declarations/backend/backend.did";
import DiscussionSection from "../components/DiscussionBox";

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState<Businessidea | null>(null);

  useEffect(() => {
    const fetchIdea = async () => {
      if (!id) return;
      const detail = await backendActor.getIdeaDetail(BigInt(id));
      setIdea(detail);
    };
    fetchIdea();
  }, [id]);

  if (!idea) return <p>Loading...</p>;

  return (
    <div className="h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex w-full max-w-7xl mx-auto gap-8">
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <h1 className="text-7xl font-bold text-indigo-900 text-center">{idea.title}</h1>
            <div className="flex-1 overflow-auto space-y-4 pr-2">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                  {idea.imageUrl ? (
                    <img 
                      src={idea.imageUrl} 
                      className="w-full h-full object-cover rounded-xl" 
                      alt="Startup" 
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p>Image placeholder</p>
                    </div>
                  )}
                </div>
              </div>
  
              <div className="bg-white rounded-2xl shadow-lg p-4">
              <p className="text-gray-700 text-sm">Description :</p>
                <p className="text-gray-700 text-sm">{idea.description}</p>
              </div>
  
              <div className="grid grid-cols-3 gap-2">
                <InfoBox label="Valuation" value={`$${idea.valuation.toLocaleString()}`} />
                <InfoBox label="Target" value={`$${idea.raisedAmount.toLocaleString()}`} />
                <InfoBox label="Equity" value={`${idea.equity}%`} />
              </div>
  
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <h2 className="text-sm font-semibold mb-2">Investors</h2>
                <ul className="space-y-2 text-sm">
                  {idea.investorShares.map(([investor, amount], i) => (
                    <li key={i} className="flex justify-between text-gray-600">
                      <span className="font-mono truncate">{investor.toString()}</span>
                      <span className="font-semibold">${amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
  
              <div className="flex justify-center gap-3">
                <button className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition">
                  View Pitch Deck
                </button>
                <button
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  onClick={() => window.location.href = `/invest`}
                >
                  Invest
                </button>
              </div>
            </div>
          </div>
  
          <div className="w-1/3 h-full overflow-hidden">
            <DiscussionSection ideaId={id ? Number(id) : 0} backendActor={backendActor} />
          </div>
        </div>
      </div>
    </div>
  );
  
};

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-xl font-bold text-gray-900">{value}</p>
  </div>
);

export default IdeaDetail;