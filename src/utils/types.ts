export interface BusinessIdea {
    id: bigint;
    title: string;
    owner: string; // Principal
    description: string;
    equity: number; // in percentage
    valuation: number;
    raisedAmount: number;
    imageUrl: string; // image link
    investorShares: [string, number][]; // Principal, shares
}

// export interface Investment {
//     investor: string; // Principal
//     ideaId: bigint;
//     amount: bigint;
// }