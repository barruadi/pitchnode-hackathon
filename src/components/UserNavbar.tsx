'use client';
import { Link } from "react-router-dom";

const USER = {
  name: "Azfa Radhiyya Hakim",
  image: "",
  role: 0,
}
export default function UserNavbar() {
  return (
    <header className="w-full bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 py-4 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">PitchNode</h1>
      </div>
      <div>
        <nav className="flex items-center ml-4 space-x-3">
          <Link to="/" className="px-3 py-1 rounded-full bg-white/50 text-sm text-gray-700">Discover</Link>
          <Link to="/dashboard" className="px-3 py-1 rounded-full bg-white text-sm text-black font-semibold">Dashboard</Link>
        </nav>
      </div>
      <Link to="/profile" className="flex items-center space-x-4">
        <p className="text-sm text-gray-800">{USER.name}</p>
        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </Link>
    </header>
  );
}

//todo:  change to general navbar (used for business owner and investor)
