import React, { useState } from "react";
import backendActor from "../utils/backend";

const InvestCard: React.FC<{ ideaId: bigint, remainingFund: number}> = ({ ideaId, remainingFund }) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState("");

  const invest = async () => {
    if (amount <= 0) {
      setMessage("Investment amount must be greater than zero.");
      return;
    }
    if (amount > remainingFund) {
        setMessage("Investment amount must be less than remaining fund.");
        console.log("Investment amount must be less than remaining fund")
        return;
    }

    try {
      const success = await backendActor.invest(ideaId, BigInt(amount));
      if (success) {
        setMessage(`Investment successful! You invested ${amount} ICP.`);
      } else {
        setMessage("Investment failed.");
      }
    } catch (error) {
      setMessage("Error investing. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
        <input
            type="text"
            placeholder="Enter amount investment"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAmount(Number(e.target.value))} 
        />
        <button onClick={invest} className="px-8 py-3 bg-[#6C63FF] text-white font-semibold rounded-lg hover:bg-[#5850EC] transition-colors whitespace-nowrap">
            Invest
        </button>
    </div>
  );
};

export default InvestCard;
