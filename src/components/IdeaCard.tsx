interface BusinessIdeaProps {
    id: bigint;
    title: string;
    owner: string;
    description: string;
    fundingGoal: bigint;
    raisedAmount: bigint;
}

export default function IdeaCard({ title, description, raisedAmount, fundingGoal, id }: BusinessIdeaProps) {
    return (
        <div className="border-2 border-gray-200 rounded-2xl shadow-lg w-[350px] mx-auto flex flex-col bg-white">
            <div className="">
                <img src="../assets/invest.png" alt="Idea Image" className="w-full" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-black text-sm mt-2">
                    {description}
                </p>
            </div>

            <div className="px-4">
                <div className="flex justify-end items-center text-sm font-bold text-gray-800">
                    <span className="flex items-center">
                        <span className="mx-1">{Number(raisedAmount)}%</span> funded
                    </span>
                </div>
                <div className="relative w-full h-2 mt-2 bg-gray-300 rounded-full">
                    <div className="absolute h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${raisedAmount}%` }}></div>
                </div>
            </div>

            <div className="flex justify-between px-4 mt-4 text-center text-sm text-black">
                <div>
                    <p className="font-bold text-[#324286]">Indicator 1</p>
                    <p className="text-lg font-semibold">${Number(fundingGoal)}K</p>
                </div>
                <div>
                <p className="font-bold text-[#324286]">Indicator 2</p>
                <p className="text-lg font-semibold">{Number(id)}</p>
                </div>
            </div>
            <div className="flex justify-between px-4 py-4">
                <button className="w-1/2 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md mr-2">
                    Invest
                </button>
                <button className="w-1/2 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md">
                    View More
                </button>
            </div>
        </div>
    );
}