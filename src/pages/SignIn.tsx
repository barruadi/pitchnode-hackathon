import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const Auth: React.FC = () => {
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [principal, setPrincipal] = useState<string | null>(null);

    useEffect(() => {
        async function initializeAuth() {
            const client = await AuthClient.create();
            setAuthClient(client);
      
            if (await client.isAuthenticated()) {
              const identity = client.getIdentity();
              setPrincipal(identity.getPrincipal().toText());
            }
          }
          initializeAuth();
        }, []);

    const login = async () => {
        if (!authClient) return;
    
        await authClient.login({
            // TODO: deploy canister and update identityProvider
            identityProvider: "https://localhost:4943",
            onSuccess: () => {
                const identity = authClient.getIdentity();
                setPrincipal(identity.getPrincipal().toText());
                },
            });
        };
    const logout = async () => {
        await authClient?.logout();
        setPrincipal(null);
    };

    return (
        <div className="flex justify-between items-center h-screen">
            <div className="w-1/2 px-8 bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 h-full flex items-center justify-center">
                <div className="text-center">
                    <h1 className="lg:text-2xl font-bold mb-1 md:text-2xl sm:text-l">Welcome to</h1>
                    <h1 className="lg:text-7xl font-bold mb-8 md:text-6xl sm:text-4xl">PitchNode</h1>
                    <hr className="mb-8 border-gray-300"/>
                </div>
            </div>

            <div className="w-1/2 bg-[#0B031F] h-full flex justify-center items-center flex-col rounded-l-4xl">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full lg:w-xl md:w-md sm:w-sm rounded-2xl p-8 mx-4">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9BAEFF] to-[#BF52FF] mb-8 text-center">
                        Sign In
                        </h1>

                        {!principal ? (
                            <form onSubmit={login} className='space-y-6'>
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-medium py-2 my-5 px-4 rounded-lg hover:bg-[#9BAEFF] transition"
                            >
                                login
                            </button>
                            </form>
                        ) : (
                            <>
                            <p className='text-white'>logged in as : {principal}</p>
                            <form onSubmit={logout} className='space-y-6'>
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-medium py-2 my-5 px-4 rounded-lg hover:bg-[#9BAEFF] transition"
                            >
                                logout
                            </button>
                            </form>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
