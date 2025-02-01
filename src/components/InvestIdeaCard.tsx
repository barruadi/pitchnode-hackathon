import React, { useState } from "react";
import backendActor from "../utils/backend";

const Invest: React.FC<{ ideaId: bigint }> = ({ ideaId }) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState("");

  const invest = async () => {
    if (amount <= 0) {
      setMessage("Investment amount must be greater than zero.");
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
    <div>
      <h3>Invest in Business</h3>
      <input 
        type="number" 
        placeholder="Amount (ICP)" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
      />
      <button onClick={invest}>Invest</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Invest;
