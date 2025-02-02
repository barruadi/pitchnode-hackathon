// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// const ConnectWallet: React.FC = () => {
//     const [account, setAccount] = useState<string | null>(null);

//     const connectWallet = async () => {
//         if (!window.ethereum) {
//             alert('MetaMask not detected!');
//             return;   
//         }

//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const account = await provider.send('eth_requestAccounts', []);
//         setAccount(account.result[0]);
//     }

//     return (
//         <div className='flex flex-col items-center'>
//             {account ? <p>Connected with {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
//         </div>
//     );
// }

// export default ConnectWallet;