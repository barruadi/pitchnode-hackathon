import React, { useState } from "react"
import { canisterId, createActor } from "../declarations/backend"
import backendActor  from "../utils/backend"

const Idea: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fundingGoal, setFundingGoal] = useState<number>(0);

    const submitIdea = async () => {
        try {
            const ideaId = await backendActor.uploadIdea(title, description, BigInt(fundingGoal));
            console.log(`Idea uploaded with id: ${ideaId}`);

            setTitle("");
            setDescription("");
            setFundingGoal(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <h1 className="text-center text-3xl font-bold mt-10">Submit Your Idea</h1>
            <div className="flex justify-center items-center flex-col">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg p-2 m-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg p-2 m-2"
                />
                <input
                    type="number"
                    placeholder="Funding Goal"
                    value={fundingGoal}
                    onChange={(e) => setFundingGoal(parseInt(e.target.value))}
                    className="border-2 border-gray-300 rounded-lg p-2 m-2"
                />
                <button onClick={submitIdea} className="bg-blue-500 text-white rounded-lg p-2 m-2">
                    Submit Idea
                </button>
            </div>
        </div>
    );
};

export default Idea