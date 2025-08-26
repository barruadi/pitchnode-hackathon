"use client";
import Navbar from "../components/Navbar";
import backendActor from "../utils/backend";
import { useEffect, useState } from "react";

const INVESTOR_USER = {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    dateOfBirth: "15 March 1985",
    description: "Seasoned venture capitalist with 15+ years of experience in tech investments. Passionate about supporting innovative startups in fintech, AI, and sustainable technology. I focus on early-stage companies with strong founding teams and scalable business models.",
};

const INVESTED_STARTUPS = [
    {
        id: 1,
        name: "TechFlow AI",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop",
        description: "AI-powered workflow automation platform",
        investmentAmount: "$500K",
        stage: "Series A"
    },
    {
        id: 2,
        name: "GreenEnergy Solutions",
        logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=80&h=80&fit=crop",
        description: "Renewable energy management systems",
        investmentAmount: "$750K",
        stage: "Seed"
    },
    {
        id: 3,
        name: "FinSecure",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop",
        description: "Blockchain-based security solutions for financial institutions",
        investmentAmount: "$1.2M",
        stage: "Series B"
    }
];

export default function ProfilePage() {
        const [dob, setDob] = useState(INVESTOR_USER.dateOfBirth);
        const [description, setDescription] = useState(INVESTOR_USER.description);
        const [username, setUsername] = useState<string | null>("Barru Adi");
        const [role, setRole] = useState<string | null>("Investor");
        const [loading, setLoading] = useState(false); // Set to false for mockup

        useEffect(() => {
                const fetchProfile = async () => {
                try {
                        const usernameRes = await backendActor.getUsername();
                        const roleRes = await backendActor.getUser();
                        setUsername(usernameRes);
                        if (roleRes[0] === "Business") {
                                setRole("Business Owner");
                        } else if (roleRes[0] === "Investor") {
                                setRole("Investor");
                        }
                } catch (err) {
                        console.error("Error fetching user info:", err);
                } finally {
                        setLoading(false);
                }
                };

                // Comment out for mockup
                // fetchProfile();
        }, []);
        
        if (loading) {
                return <p>Loading profile...</p>;
        }

        return (
                <>
                        <Navbar />
                        <main className="min-h-screen bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 py-12 px-4 flex justify-center items-start">
                                <div className="w-full max-w-6xl bg-white/50 rounded-3xl p-10">
                                        <div className="flex flex-col items-center mb-10">
                                                {INVESTOR_USER.image && INVESTOR_USER.image !== "" ? 
                                                        <img src={INVESTOR_USER.image} alt="profile" className="w-32 h-32 rounded-full mb-6 object-cover" /> : 
                                                        <div className="w-32 h-32 rounded-full bg-white mb-6" />
                                                }
                                                <h2 className="text-2xl font-semibold text-[#324286]">{username}</h2>
                                                <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium">
                                                        {role}
                                                </span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                {/* Profile Form */}
                                                <div>
                                                        <h3 className="text-xl font-semibold text-[#324286] mb-6">Profile Information</h3>
                                                        <form className="space-y-6">
                                                                <div>
                                                                        <label htmlFor="dob" className="block mb-1 text-sm font-semibold text-[#64748B]">
                                                                                Date of Birth
                                                                        </label>
                                                                        <input
                                                                                id="dob"
                                                                                value={dob}
                                                                                onChange={(e) => setDob(e.target.value)}
                                                                                className="w-full rounded-md border-[1.5px] border-[#EBEBEB] px-4 py-2 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
                                                                        />
                                                                </div>

                                                                <div>
                                                                        <label htmlFor="desc" className="block mb-1 text-sm font-semibold text-[#64748B]">
                                                                                Description
                                                                        </label>
                                                                        <textarea
                                                                                id="desc"
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                className="w-full min-h-[120px] rounded-md border-[1.5px] border-[#EBEBEB] px-4 py-2 text-sm text-[#0F172A] placeholder-[#64748B] resize-none focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
                                                                        />
                                                                </div>

                                                                <div className="mt-6 flex justify-end gap-4">
                                                                        <button type="button" className="w-28 rounded-md bg-white border border-[#64748B] px-4 py-2 text-[#64748B] hover:bg-gray-100 cursor-pointer">
                                                                                Cancel
                                                                        </button>
                                                                        <button type="submit" className="w-36 rounded-md bg-[#324286] px-4 py-2 text-white hover:bg-[#1a2d5d] cursor-pointer">
                                                                                Save Changes
                                                                        </button>
                                                                </div>
                                                        </form>
                                                </div>

                                                {/* Investment Portfolio */}
                                                <div>
                                                        <h3 className="text-xl font-semibold text-[#324286] mb-6">Current Investments</h3>
                                                        <div className="space-y-4">
                                                                {INVESTED_STARTUPS.map((startup) => (
                                                                        <div key={startup.id} className="bg-white/70 rounded-lg p-4 border border-[#EBEBEB]">
                                                                                <div className="flex items-start gap-4">
                                                                                        <img 
                                                                                                src={startup.logo} 
                                                                                                alt={startup.name}
                                                                                                className="w-12 h-12 rounded-lg object-cover"
                                                                                        />
                                                                                        <div className="flex-1">
                                                                                                <div className="flex items-center justify-between mb-2">
                                                                                                        <h4 className="font-semibold text-[#324286]">{startup.name}</h4>
                                                                                                        <span className="text-xs bg-[#324286] text-white px-2 py-1 rounded-full">
                                                                                                                {startup.stage}
                                                                                                        </span>
                                                                                                </div>
                                                                                                <p className="text-sm text-[#64748B] mb-2">{startup.description}</p>
                                                                                                <p className="text-sm font-medium text-green-600">
                                                                                                        Investment: {startup.investmentAmount}
                                                                                                </p>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </main>
                </>
        );
}