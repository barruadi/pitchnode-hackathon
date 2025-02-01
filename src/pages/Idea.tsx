import React, { useState } from "react"
import Navbar from "../components/NavBar";
import { canisterId, createActor } from "../declarations/backend"
import backendActor  from "../utils/backend"

const Idea: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fundingGoal, setFundingGoal] = useState<number>(0);
    const [equity, setEquity] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const submitIdea = async () => {
        try {
            const ideaId = await backendActor.uploadIdea(title, description, BigInt(fundingGoal));
            console.log(`Idea uploaded with id: ${ideaId}`);
            setTitle("");
            setFundingGoal(0);
            setEquity(0);
            setDescription("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <Navbar></Navbar>
            <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full w-full">
                <div className="col-span-2 row-span-4 flex justify-center">
                    <div className="w-full h-full px-10 py-4 flex flex-col justify-center gap-2">
                        <p className="text-black mx-2">Idea Title</p>
                        <input
                            type="text"
                            placeholder="Enter your Idea Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-300 rounded-lg p-2 mx-2"
                        />
                        <p className="text-black mx-2 mt-1.5">Funding Goal</p>
                        <input
                            type="number"
                            placeholder="Funding Goal"
                            value={fundingGoal}
                            onChange={(e) => setFundingGoal(parseInt(e.target.value))}
                            className="border-2 border-gray-300 rounded-lg p-2 mx-2"
                        />
                        <p className="text-black mx-2 mt-1.5">Equity</p>
                        <input
                            type="number"
                            placeholder="Equity Percentage"
                            value={equity}
                            onChange={(e) => setEquity(parseInt(e.target.value))}
                            className="border-2 border-gray-300 rounded-lg p-2 mx-2"
                        />
                        <p className="text-black mx-2 mt-1.5">Description</p>
                        <textarea
                            placeholder="Describe your business idea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-gray-300 rounded-lg p-2 mx-2 h-36 resize-none"
                        /> 
                    </div>
                </div>
                <div className="col-span-2 row-span-3 col-start-3 flex justify-center">
                    <div className="w-full h-full px-4 py-4 flex flex-col justify-center gap-2">
                        <p className="text-black mx-2 mt-1.5">Related Image</p>
                        <label className="border-2 border-gray-300 rounded-lg p-2 mx-2 h-50 resize-none items-center flex flex-col cursor-pointer">
                            Upload Image
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 col-start-4 row-start-4 flex justify-center">
                    <button onClick={submitIdea} className="bg-blue-500 text-white rounded-lg p-4 m-6">
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Idea;
