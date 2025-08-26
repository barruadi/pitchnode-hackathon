function Welcome() {
    return (
        <div className="flex justify-between items-center h-screen bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15">
            {/* Back button */}
            <a 
                href="/dashboard" 
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Dashboard</span>
            </a>

            <div className="w-1/2 px-8 flex justify-center items-center">
                <div className="text-center">
                    <h1 className="lg:text-2xl font-bold mb-1 md:text-2xl">Welcome to</h1>
                    <h1 className="lg:text-7xl font-bold mb-8 md:text-6xl bg-gradient-to-r from-[#4162FF] to-[#9665FF] bg-clip-text text-transparent">PitchNode</h1>
                    <p className="text-gray-600 text-lg">Your gateway to innovation and investment</p>
                </div>
            </div>

            <div className="w-1/2 bg-[#0B031F] h-full flex justify-center items-center flex-col rounded-l-4xl">
                <p className="text-white mb-10 text-3xl font-bold text-left">Create Your Account</p>
                
                <a href="/signup">
                    <div className="p-0.5 rounded-2xl mb-10 mt-10 hover:scale-105 transition-transform duration-300 ease-in-out max-w-md sm:max-w-lg lg:max-w-xl w-full outline outline-[#9BAEFF] outline-offset-2">
                        <div className="text-center p-8 rounded-2xl mx-10">
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9BAEFF] to-[#BF52FF] mb-2">
                            Register As Innovator
                            </h1>
                            <p className="text-gray-400">
                            An innovator is them who want to raise funds <br/> for their business idea.
                            </p>
                        </div>
                    </div>
                </a>

                <a href="/signup">
                    <div className="p-0.5 rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out max-w-lg md:max-w-lg lg:max-w-xl w-full outline outline-[#9BAEFF] outline-offset-2">
                        <div className="text-center p-8 rounded-2xl ml-10 mr-10 ">
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9BAEFF] to-[#BF52FF] mb-2">
                            Register As Investor
                            </h1>
                            <p className="text-gray-400">
                            An investor is them who want to support and<br/>invest to innovator's business idea.
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Welcome;