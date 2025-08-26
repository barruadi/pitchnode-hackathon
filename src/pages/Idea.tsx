import React, { useState } from "react"
import Navbar from "../components/Navbar"
import backendActor  from "../utils/backend"
import { useStorageUpload } from "@thirdweb-dev/react"


//TODO: rename fundingGoal to valuation
const Idea: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [fundingGoal, setFundingGoal] = useState<number>(0);
    const [equity, setEquity] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { mutateAsync: upload } = useStorageUpload();

    const uploadToIPFS = async () => {
        try {
            const uploadUrl = await upload({
                data: [imageFile],
                options: {
                    uploadWithGatewayUrl: true,
                    uploadWithoutDirectory: true
                }
            });
            console.log('url:', uploadUrl);
            return uploadUrl[0];

        } catch (error) {
            console.error(error);
            return "";
        }
    }

    const submitIdea = async () => {
        // form validation
        if (!title || !description || !equity || !fundingGoal || !imageFile) {
            console.log("Please fill all fields");
            return;
        }
        if (equity < 0 || equity > 100) {
            console.log("Equity should be between 0 and 100");
            return;
        }
        if (fundingGoal <= 0) {
            console.log("Funding goal should be greater than 0");
            return;
        }
        
        // checking if user already have a business idea
        const status = await backendActor.haveBusinessIdea();
        if (status) {
            console.log("You already have a business idea");
            return;
        }

        // checking role
        const role = await backendActor.getUser();
        if (role[0] !== "Business") {
            console.log("You are not a business");
            return;
        }

        try {
            const imageURL = await uploadToIPFS();

            const ideaId = await backendActor.uploadIdea(title, description, Number(equity), Number(fundingGoal), imageURL);
            console.log(`Idea uploaded with id: ${ideaId}`);

            // reset form
            setTitle("");
            setFundingGoal(0);
            setEquity(0);
            setDescription("");
            setImageFile(null);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Share Your Business Idea</h1>
                        <p className="text-blue-100 mt-2">Present your vision to potential investors</p>
                    </div>
                    
                    <div className="p-8">
                        <div className="grid lg:grid-cols-2 gap-8"></div>
                            {/* Left Column - Form Fields */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Idea Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Idea Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Funding Goal ($)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={fundingGoal}
                                            onChange={(e) => setFundingGoal(parseInt(e.target.value))}
                                            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Equity (%)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={equity}
                                            onChange={(e) => setEquity(parseInt(e.target.value))}
                                            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Describe your business idea in detail..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={6}
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Image Upload */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Related Image
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                                        <label className="cursor-pointer">
                                            <div className="space-y-4">
                                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {imageFile ? imageFile.name : 'Upload an image'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG up to 10MB
                                                    </p>
                                                </div>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] || null)}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                {imageFile && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-800">
                                                    Image ready to upload
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={submitIdea} 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Publish Idea
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Idea;
