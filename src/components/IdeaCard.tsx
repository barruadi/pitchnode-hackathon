import { BusinessIdea } from "../utils/types";
import ProgressBar from "./ProgressBar";

export default function IdeaCard({ id, title, description, equity, raisedAmount, valuation, imageUrl, investorShares}: BusinessIdea) {
    return (
        <div className="border-2 border-gray-200 rounded-2xl shadow-lg w-[350px] mx-auto flex flex-col bg-white">
            <div className="max-h-[25vh] overflow-hidden">
                <img src={imageUrl} alt="Idea Image" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-black text-sm mt-2">
                    {description}
                </p>
            </div>

            <div className="px-4">
                <div className="relative w-full h-auto mt-2 rounded-full">
                    <ProgressBar progress={Number(raisedAmount) / Number(valuation) * 100}></ProgressBar>
                </div>
            </div>

            <div className="flex justify-between px-4 mt-4 text-center text-sm text-black">
                <div>
                    <p className="font-bold text-[#324286]">Funding Goal</p>
                    <p className="text-lg font-semibold">{Number(valuation)}</p>
                </div>
                <div>
                <p className="font-bold text-[#324286]">Equity</p>
                <p className="text-lg font-semibold">{Number(equity)} %</p>
                </div>
            </div>
            <div className="flex justify-end px-4 py-4">
                <button className="w-1/2 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md"
                    onClick={() => window.location.href = `/detail/${id}`}
                >
                    View More
                </button>
            </div>
        </div>
    );
}