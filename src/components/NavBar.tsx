import "../index.css";
import { Link } from "react-router-dom";

function Navbar() {    
    return (
        <div className="flex justify-between items-center w-fill p-2 border-2 border-black rounded-2xl shadow-md m-5">
            <div className="font-bold px-5">
                <Link to="/">PitchNode</Link>
            </div>
            <div className="flex space-x-40 items-center">
                <Link to="/invest">Invest</Link>
                <Link to="/learn">Learn</Link>
                <Link to="/about">About</Link>
                <div className="flex space-x-10 items-center">
                    <Link to="/signin" className="font-bold">Login</Link>
                    <Link to="/signup" className="rounded-md bg-[#324286] text-white px-5 py-1">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;