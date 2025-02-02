import "../index.css";
import { Link } from "react-router-dom";
import backendActor from "../utils/backend";
import { useState, useEffect } from "react";

function Navbar() {    
    const [ role, setRole ] = useState<0 | 1 | 2>(0);
    // 0: haven't login
    // 1: investor
    // 2: business

    const [ update, setUpdate ] = useState<boolean>(false);

    const fetchRole = async () => {
        try {
            const role = await backendActor.getUser();
            if (role[0] === "Investor") {
                setRole(1);
            } else if (role[0] === "Business") {
                setRole(2);
                const updateFetch = await backendActor.haveBusinessIdea();
                setUpdate(updateFetch);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRole();
    }, []);

    return (
        <div className="flex justify-between items-center w-fill p-2 border-2 border-black rounded-2xl shadow-md m-5">
            <div className="font-bold px-5">
                <Link to="/">PitchNode</Link>
            </div>
            <div className="flex space-x-40 items-center">
                <Link to="/invest">Invest</Link>
                {role === 2 && update === false && <Link to="/upload-idea">Upload Idea</Link>}
                {role === 2 && update === true && <Link to="/update-business">Upload Idea</Link>}
                <Link to="/about">About</Link>
                {role === 0 ? (
                    <div className="flex space-x-10 items-center">
                        <Link to="/signin" className="font-bold">Login</Link>
                        <Link to="/signup" className="rounded-md bg-[#324286] text-white px-5 py-1">Register</Link>
                    </div>
                ) : (
                    <div className="flex space-x-10 items-center px-5 py-1">
                        <Link to="/profile" className="font-bold">Profile</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;