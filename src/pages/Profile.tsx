"use client";
import Navbar from "../components/Navbar";
import backendActor from "../utils/backend";
import { useEffect, useState } from "react";

const USER = { //TODO: fetch image, dob, and description
  image: "",
  dateOfBirth: "1 January 2025",
  description: "I am a ........",
};

export default function ProfilePage() {
    const [dob, setDob] = useState(USER.dateOfBirth);
    const [description, setDescription] = useState(USER.description);
    const [username, setUsername] = useState<string | null>("Unknown");
    const [role, setRole] = useState<string | null>("Unregistered");
    const [loading, setLoading] = useState(true);
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

        fetchProfile();
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
                        {USER.image && USER.image !== "" ? <img src={USER.image} alt="profile" className="w-32 h-32 rounded-full mb-6" /> : 
                        <div className="w-32 h-32 rounded-full bg-white mb-6" />
                        }
                        <h2 className="text-2xl font-semibold text-[#324286]">{username}</h2>
                        <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium">
                            {role}
                        </span>
                    </div>

                    <form className="space-y-6 max-w-xl mx-auto">
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
            </main>
        </>
    );
}