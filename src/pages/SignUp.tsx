import React, { useEffect, useState } from 'react';
import { canisterId, createActor } from '../declarations/backend';
import { AuthClient } from '@dfinity/auth-client';
import backendActor from '../utils/backend';

const Register: React.FC = () => {
    const [role, setRole] = useState<"Investor" | "Business">("Investor");
    const [username, setUsername] = useState<string>("Unknown");

    const registerUser = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        
        const success = await backendActor.registerUser(role, username);

        if (success) {
            console.log('User registered successfully');
        } else {
            console.log('User registration failed');
        }
    }

    return (
        <div className="flex justify-between items-center h-screen">
            <div className="w-1/2 px-8 bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 h-full flex flex-col justify-center">
                <div className="ml-10 mr-10">
                    <h1 className="lg:text-2xl font-bold mb-1 md:text-2xl sm:text-l">Welcome to</h1>
                    <h1 className="lg:text-7xl font-bold mb-8 md:text-6xl sm:text-4xl">PitchNode</h1>
                    <hr className="mb-8 border-t border-gray-300"/>
                    <p className="text-gray-600 text-lg">Join our platform to connect investors with innovative businesses.</p>
                </div>
            </div>

            <div className="w-1/2 bg-white h-full flex justify-center items-center flex-col rounded-l-4xl">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full lg:w-xl md:w-md sm:w-sm rounded-2xl p-8 mx-4">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9BAEFF] to-[#BF52FF] mb-8 text-center">
                        Register Role
                        </h1>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter your username" 
                            className="w-full bg-white text-gray-800 p-2 rounded-lg mb-4 border"
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value as "Investor" | "Business")} className="w-full bg-white text-gray-800 p-2 rounded-lg border">
                            <option value="Investor">Investor</option>
                            <option value="Business">Business</option>
                        </select>
                        <button onClick={registerUser} className='w-full bg-[#9BAEFF] text-white rounded-full p-2 my-5'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;