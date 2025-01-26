function Profile() {
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
                <div className="w-full bg-gray-200 h-4 rounded-full mb-4 relative">
                    <div
                    className="absolute top-0 left-0 h-4 rounded-full bg-blue-600"
                    style={{ width: "69%" }}
                    ></div>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold mb-4">
                    <span className="text-gray-700">69% funded</span>
                </div>

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
                <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                    <img
                    src="../assets/business.svg"
                    alt="Idea"
                    className="w-full rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-lg">Idea Title</h4>
                    <p className="text-sm text-gray-500">
                    General overview of the idea. They can showcase their unique and
                    innovative ideas here to raise funds based on their target etc.
                    </p>
                    <div className="flex">
                        <div>
                            <p className="text-sm font-semibold mt-4">Your investment</p>
                            <p className="text-lg font-bold">$123K</p>
                        </div>
                        <button className="ml-auto mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 text-right">
                        View More
                        </button>
                    </div>
            
                </div>

                <div className="border rounded-xl p-4">
                    <img
                    src="../assets/business.svg"
                    alt="Idea"
                    className="w-full rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-lg">Idea Title</h4>
                    <p className="text-sm text-gray-500">
                    General overview of the idea. They can showcase their unique and
                    innovative ideas here to raise funds based on their target etc.
                    </p>
                    <div className="flex">
                        <div>
                            <p className="text-sm font-semibold mt-4">Your investment</p>
                            <p className="text-lg font-bold">$123K</p>
                        </div>
                        <button className="ml-auto mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 text-right">
                        View More
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
    );
  }
  
  export default Profile;