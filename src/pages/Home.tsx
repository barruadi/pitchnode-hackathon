import "../index.css";
import Navbar from "../components/NavBar";
import FeatureBox from "../components/FeatureBox";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
        <Navbar></Navbar>

        {/* Landing Page */}
        <div className="p-30 w-2/3">
            <div className="font-bold text-6xl text-[#324286]">
                Securely Pitch
                Confidently Invest
            </div>
            <div className="py-10 text-sm">
            PitchNode is a cutting-edge Web3 platform where innovators can securely
            pitch their groundbreaking ideas, and investors can discover 
            and support the next big thing. Powered by blockchain technology, 
            we ensure transparency, trust, and seamless collaboration.
            </div>
            <div className="flex space-x-10 items-center">
                <Link to="/" className="border-2 border-black bg-black text-white rounded-full p-3 px-7 font-bold">I'm An Innovator</Link>
                <Link to="/" className="border-2 border-black rounded-full p-3 px-7 font-bold">I'm An Investor</Link>
            </div>
        </div>

        {/* PitchNode explanation */}
        <div className="w-full flex justify-between px-50 rounded-xl bg-[#242225] h-fit p-20 shadow-xl">
            <div className="items-center w-full text-white space-y-10 text-sm">
                <div className="">
                    <div className="font-bold text-5xl bg-gradient-to-r from-[#8B9BE2] to-white bg-clip-text text-transparent pb-5">
                        For innovators
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </div>
                <div className="pt-15">
                    <div className="font-bold text-5xl bg-gradient-to-r from-[#8B9BE2] to-white bg-clip-text text-transparent pb-5">
                        For investors
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </div>
            </div>
            <div className="flex-col w-full items-center">
                <div className="flex p-5 gap-10 justify-center">
                    <FeatureBox></FeatureBox>
                    <FeatureBox></FeatureBox>
                </div>
                <div className="flex p-5 gap-10 justify-center">
                    <FeatureBox></FeatureBox>
                    <FeatureBox></FeatureBox>
                </div>
            </div>
        </div>

        {/* footer */}
        <div className="w-full flex rounded-md bg-gray-700 p-10 mt-10 text-white">
            made by Rentopia
        </div>
    </div>
  );
}

export default Home;
