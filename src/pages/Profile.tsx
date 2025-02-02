import ProgressBar from "../components/ProgressBar";
import IdeaCard from "../components/IdeaCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import backendActor from "../utils/backend";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";

// types
import { Investment, BusinessIdea } from "../utils/types";


function Profile() {

    // TODO: able to switch role for debugging
    const [role, setRole] = useState< 0 | 1 >(0);  // TODO: state role type
    // 0: investor
    // 1: business
    
    const [totalInvestor, setTotalInvestor] = useState(0);
    const [idea, setIdea] = useState<BusinessIdea>({
        id: BigInt(0),
        title: "",
        owner: "",
        description: "",
        fundingGoal: BigInt(0),
        raisedAmount: BigInt(0),
        imageUrl: "",
    });

    const [investment, setInvestment] = useState<Investment[]>([])
    const [businessInvest, setBusinessInvest] = useState<BusinessIdea[]>([])
    
    const fetchBusinessDetail = async () => {
        try {
            const id = await backendActor.getIdeaIdByPrincipal();
            const ideaFetch = await backendActor.getIdeaDetail(id);
            const totalInvestor = await backendActor.getTotalInvestor(id);
            const FormattedIdea = {
                ...ideaFetch,
                owner: Principal.from(ideaFetch.owner).toText(),
            };
            setIdea(FormattedIdea);
            setTotalInvestor(Number(totalInvestor));

        } catch (error) {
            console.error(error);
        };
    }

    const fetchInvestmentList = async () => {
        try {
            const fetchInvestment = await backendActor.getInvesmentUser();
            const FormattedInvestment = fetchInvestment.map((inv: any) => ({
                ...inv,
                investor: Principal.from(inv.investor).toText(),
            }))
            setInvestment(FormattedInvestment);

            const businessDetails: BusinessIdea[] = await Promise.all(
                FormattedInvestment.map(async (inv: Investment) => {
                    if (inv.ideaId) {
                        const detail = await backendActor.getIdeaDetail(BigInt(inv.ideaId));
                        return {
                            ...detail,
                            owner: Principal.from(detail.owner).toText(),
                        };
                    }
                    return null;
                })
            ).then(details => details.filter(detail => detail !== null));
            setBusinessInvest(businessDetails);
            console.log("test");

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userRole = await backendActor.getUser();

            // identify role
            if (userRole[0] == "Business") {
                setRole(1);
                fetchBusinessDetail();
            } else {
                fetchInvestmentList();
            }
        };

        fetchUserData();
        console.log(investment);
        console.log(idea);
        console.log(businessInvest);
    }, []);
    
    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen">
            {/* Left Section */}
            <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                <h2 className="text-lg font-semibold">Barru Adi Utomo</h2>
                <p className="text-gray-500">description</p>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-2/3">
            
                {role === 1 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-2">Your Business</h3>
                        <h4 className="text-xl font-bold text-gray-700 mb-4">
                            idea.title
                        </h4>

                        {/* Progress Bar */}
                        <ProgressBar progress={Number(idea.raisedAmount) / Number(idea.fundingGoal) * 100} />

                        {/* Indicators */}
                        <div className="flex justify-around text-center text-sm font-semibold text-gray-800">
                            <div>
                                <p className="text-blue-600">Funding Goals</p>
                                <p>{Number(idea.fundingGoal)}</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Equity</p>
                                <p>3-12%</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Investors</p>
                                <p>{totalInvestor}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Your Investment</h1>
                    <div className="relative w-full">
                        {/* Tombol Navigasi Kiri */}
                        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2  text-white rounded-full shadow-lg">
                            ◀
                        </button>

                        {/* Swiper Container */}
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                            }}
                            modules={[Navigation, Pagination]}
                            className="w-full"
                        >
                            {businessInvest.map((idea, index) => (
                                <SwiperSlide key={Number(idea.id)}>
                                    <IdeaCard 
                                        id={idea.id}
                                        title={idea.title}
                                        owner={idea.owner}
                                        description={idea.description}
                                        fundingGoal={idea.fundingGoal}
                                        raisedAmount={(idea.raisedAmount * 100n) / idea.fundingGoal}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Tombol Navigasi Kanan */}
                        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2  text-white rounded-full shadow-lg">
                            ▶
                        </button>
                    </div>
                </div>
                )
                }

            </div>
            </div>
    );
  }
  
  export default Profile;