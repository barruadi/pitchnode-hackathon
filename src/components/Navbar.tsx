'use client';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import backendActor from "../utils/backend";


export default function Navbar() {
  const location = useLocation();
  const isDiscover = location.pathname === "/discover";
  const [ role, setRole ] = useState<0 | 1 | 2>(0);
  const [ username, setUsername ] = useState<string | null>(null);
  

    const fetchRole = async () => {
        try {
            const role = await backendActor.getUser();
            if (role[0] === "Investor") {
                setRole(1);
            } else if (role[0] === "Business") {
                setRole(2);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const fetchUsername = async () => {
        try {
            const username = await backendActor.getUsername();
            setUsername(username);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRole();
        fetchUsername();
    }, []);

  return (
    <header className="w-full bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 py-4 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">PitchNode</h1>
      </div>
      <div>
        <nav className="flex items-center ml-4 space-x-3">
          <Link to="/discover" className={`px-3 py-1 rounded-full text-sm ${isDiscover ? "bg-white text-black font-semibold" : "bg-white/50  text-gray-700"}`}>Discover</Link>
          <Link to="/dashboard" className={`px-3 py-1 rounded-full text-sm ${isDiscover ? "bg-white/50 text-gray-700" : "bg-white text-black font-semibold"}`}>Dashboard</Link>
        </nav>
      </div>
      <Link to={role === 0 ? "/welcome" : "/profile"} className="flex items-center space-x-4">
        <p className="text-sm text-gray-800">Barru Adi</p>
        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </Link>
    </header>
  );
}