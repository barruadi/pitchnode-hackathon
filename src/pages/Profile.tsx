import ProgressBar from "../components/ProgressBar";
import IdeaCard from "../components/IdeaCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function Profile() {
    const ideas = [
        {
            id: 1n,
            title: "AI-Powered Healthcare",
            owner: "John Doe",
            description: "A revolutionary AI-driven solution to enhance medical diagnosis.",
            fundingGoal: 500n,
            raisedAmount: 250n, 
        },
        {
            id: 2n,
            title: "Eco-Friendly Smart Home",
            owner: "Jane Smith",
            description: "An AI-driven smart home system that reduces energy consumption.",
            fundingGoal: 300n,
            raisedAmount: 150n, 
        },
        {
            id: 3n,
            title: "Eco-Friendly Smart Home",
            owner: "Jane Smith",
            description: "An AI-driven smart home system that reduces energy consumption.",
            fundingGoal: 300n,
            raisedAmount: 150n, 
        }
    ];
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
                {/* Business Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Your Business</h3>
                <h4 className="text-xl font-bold text-gray-700 mb-4">
                    Ayam Goreng Pak Slamet
                </h4>

                {/* Progress Bar */}
                <ProgressBar progress={75} />

                {/* Indicators */}
                <div className="flex justify-around text-center text-sm font-semibold text-gray-800">
                    <div>
                    <p className="text-blue-600">Indicator 1</p>
                    <p>$123K</p>
                    </div>
                    <div>
                    <p className="text-blue-600">Indicator 2</p>
                    <p>3-12%</p>
                    </div>
                    <div>
                    <p className="text-blue-600">Investors</p>
                    <p>12</p>
                    </div>
                </div>
                </div>

                {/* Investment Section */}

                <div className="p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Business Ideas</h1>
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
                            {ideas.map((idea) => (
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

            </div>
            </div>
    );
  }
  
  export default Profile;