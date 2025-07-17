"use client";
import UserNavbar from "../components/UserNavbar";
import { useState } from "react";

const USER = {
  name: "Azfa Radhiyya Hakim",
  image: "",
  role: 0, // 0 = Business Owner, 1 = Investor
  dateOfBirth: "1 January 2025",
  description: "I am a ........",
};

export default function ProfilePage() {
  const [dob, setDob] = useState(USER.dateOfBirth);
  const [description, setDescription] = useState(USER.description);

  const getRoleLabel = (role: number) =>
    role === 0 ? "Business Owner" : "Investor";

  return (
    <>
        <UserNavbar />
        <main className="min-h-screen bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 py-12 px-4 flex justify-center items-start">
            <div className="w-full max-w-6xl bg-white/50 rounded-3xl p-10">
                <div className="flex flex-col items-center mb-10">
                    {USER.image && USER.image !== "" ? <img src={USER.image} alt="profile" className="w-32 h-32 rounded-full mb-6" /> : 
                    <div className="w-32 h-32 rounded-full bg-white mb-6" />
                    }
                    <h2 className="text-2xl font-semibold text-[#324286]">{USER.name}</h2>
                    <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium">
                        {getRoleLabel(USER.role)}
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


// todo: fetch data, edit and save

// import ProgressBar from "../components/ProgressBar";
// import IdeaCard from "../components/IdeaCard";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination } from 'swiper/modules';
// import backendActor from "../utils/backend";
// import { useEffect, useState } from "react";
// import { Principal } from "@dfinity/principal";
// import Navbar from "../components/NavBar";

// // types
// import { Investment, BusinessIdea } from "../utils/types";

// function Profile() {

//     // TODO: able to switch role for debugging
//     const [role, setRole] = useState< 0 | 1 >(0);  // TODO: state role type
//     // 0: investor
//     // 1: business

//     const [username, setUsername] = useState<string>("");
    
//     const [totalInvestor, setTotalInvestor] = useState(0);
//     const [idea, setIdea] = useState<BusinessIdea>({
//         id: BigInt(0),
//         title: "",
//         owner: "",
//         description: "",
//         equity: Number(0),
//         valuation: Number(0),
//         raisedAmount: Number(0),
//         imageUrl: "",
//         investorShares: [],
//     });

//     const [investment, setInvestment] = useState<Investment[]>([])
//     const [businessInvest, setBusinessInvest] = useState<BusinessIdea[]>([])
    
//     const fetchBusinessDetail = async () => {
//         try {
//             const id = await backendActor.getIdeaIdByPrincipal();
//             const ideaFetch = await backendActor.getIdeaDetail(id);
//             const totalInvestor = await backendActor.getTotalInvestor(id);
//             const FormattedIdea: BusinessIdea = {
//                 ...ideaFetch,
//                 owner: Principal.from(ideaFetch.owner).toText(),
//                 investorShares: ideaFetch.investorShares.map((investor: [Principal, number]) => [Principal.from(investor[0]).toText(), investor[1]]),
//             };
//             setIdea(FormattedIdea);
//             setTotalInvestor(Number(totalInvestor));

//         } catch (error) {
//             console.error(error);
//         };
//     }

//     const fetchInvestmentList = async () => {
//         try {
//             const fetchInvestment = await backendActor.getInvestmentUser();
//             const FormattedInvestment = fetchInvestment.map((inv: any) => ({
//                 ...inv,
//                 investor: Principal.from(inv.investor).toText(),
//             }))
//             setInvestment(FormattedInvestment);

//             const businessDetails: BusinessIdea[] = await Promise.all(
//                 FormattedInvestment.map(async (inv: Investment) => {
//                     if (inv.ideaId) {
//                         const detail = await backendActor.getIdeaDetail(BigInt(inv.ideaId));
//                         return {
//                             ...detail,
//                             owner: Principal.from(detail.owner).toText(),
//                             investorShares: detail.investorShares.map((investor: [Principal, number]) => [Principal.from(investor[0]).toText(), investor[1]] as [string, number]),
//                         };
//                     }
//                     return null;
//                 })
//             ).then(details => details.filter(detail => detail !== null));
//             setBusinessInvest(businessDetails);
//             console.log("test");

//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userRole = await backendActor.getUser();
//             const usernameFetch = await backendActor.getUsername();
            
//             setUsername(usernameFetch);

//             // identify role
//             if (userRole[0] == "Business") {
//                 setRole(1);
//                 fetchBusinessDetail();
//             } else {
//                 fetchInvestmentList();
//             }
//         };

//         fetchUserData();
//         console.log(investment);
//         console.log(idea);
//         console.log(businessInvest);
//     }, []);
    
//     return (
//         <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
//             {/* Left Section */}
//             <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
//                 <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
//                 <h2 className="text-lg font-semibold">{username}</h2>
//                 <p className="text-gray-500">description</p>
//             </div>

//             {/* Right Section */}
//             <div className="w-full md:w-2/3">
            
//                 {role === 1 ? (
//                     <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//                         <h3 className="text-lg font-semibold mb-2">Your Business</h3>
//                         <h4 className="text-xl font-bold text-gray-700 mb-4">
//                             {idea.title}
//                         </h4>

//                         {/* Progress Bar */}
//                         <ProgressBar progress={Number(idea.raisedAmount) / Number(idea.valuation) * 100} />

//                         {/* Indicators */}
//                         <div className="flex justify-around text-center text-sm font-semibold text-gray-800">
//                             <div>
//                                 <p className="text-blue-600">Funding Goals</p>
//                                 <p>{Number(idea.valuation)}</p>
//                             </div>
//                             <div>
//                                 <p className="text-blue-600">Equity</p>
//                                 <p>{Number(idea.equity)} %</p>
//                             </div>
//                             <div>
//                                 <p className="text-blue-600">Investors</p>
//                                 <p>{totalInvestor}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                 <div className="p-6">
//                     <h1 className="text-2xl font-bold text-center mb-6">Your Investment</h1>
//                     <div className="relative w-full">
//                         {/* Tombol Navigasi Kiri */}
//                         <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2  text-white rounded-full shadow-lg">
//                             ◀
//                         </button>

//                         {/* Swiper Container */}
//                         <Swiper
//                             slidesPerView={1}
//                             spaceBetween={20}
//                             navigation={{
//                                 nextEl: ".swiper-button-next",
//                                 prevEl: ".swiper-button-prev",
//                             }}
//                             pagination={{ clickable: true }}
//                             breakpoints={{
//                                 640: { slidesPerView: 2 },
//                                 1024: { slidesPerView: 2 },
//                             }}
//                             modules={[Navigation, Pagination]}
//                             className="w-full"
//                         >
//                             {businessInvest.map((idea, index) => (
//                                 // TODO: add index to prevent same key children
//                                 <SwiperSlide key={Number(idea.id)}>
//                                     <IdeaCard 
//                                         id={idea.id}
//                                         title={idea.title}
//                                         owner={idea.owner}
//                                         description={idea.description}
//                                         equity={idea.equity}
//                                         valuation={idea.valuation}
//                                         raisedAmount={(idea.raisedAmount * 100) / idea.valuation}
//                                         imageUrl={idea.imageUrl}
//                                         investorShares={idea.investorShares}
//                                     />
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>

//                         {/* Tombol Navigasi Kanan */}
//                         <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2  text-white rounded-full shadow-lg">
//                             ▶
//                         </button>
//                     </div>
//                 </div>
//                 )
//                 }

//             </div>
//             </div>
//     );
//   }
  
//   export default Profile;