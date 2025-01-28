
function SignUp() {
    return (
        <div className="flex justify-between items-center h-screen">
            <div className="w-1/2 px-8">
                <div className="mt-18 ml-10 mr-10">
                    <h1 className="lg:text-2xl font-bold mb-1 md:text-2xl sm:text-l">Welcome to</h1>
                    <h1 className="lg:text-7xl font-bold mb-8 md:text-6xl sm:text:4xl">PitchNode</h1>
                    <hr className="mb-24 1px"/>
                </div>
                <img src="../assets/welcome.svg" alt="Illustration" className=""/> 
            </div>

            <div className="w-1/2 bg-[#0B031F] h-full flex justify-center items-center flex-col rounded-l-4xl">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full lg:w-xl md:w-md sm:w-sm rounded-2xl p-8 mx-4">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9BAEFF] to-[#BF52FF] mb-8 text-center">
                        Register New Account
                        </h1>

                        <form>
                        <div className="mb-6">
                            <label
                            htmlFor="username"
                            className="block text-white font-medium mb-2"
                            >
                            Username
                            </label>
                            <input
                            type="text"
                            id="username"
                            placeholder="Type to input your name"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#9BAEFF]"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                            htmlFor="password"
                            className="block text-white font-medium mb-2"
                            >
                            Create Password
                            </label>
                            <input
                            type="password"
                            id="password"
                            placeholder="Type to create password"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#9BAEFF]"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                            htmlFor="confirm-password"
                            className="block text-white font-medium mb-2"
                            >
                            Confirm Password
                            </label>
                            <input
                            type="password"
                            id="confirm-password"
                            placeholder="Type to confirm password"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#9BAEFF]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-[#9BAEFF] transition"
                        >
                            Sign Up
                        </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <a
                                href="/signin"
                                className="text-[#9BAEFF] hover:underline"
                                >
                                Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default SignUp;