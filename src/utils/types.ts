export interface BusinessIdea {
    id: bigint;
    title: string;
    owner: string; // Principal
    description: string;
    fundingGoal: bigint;
    raisedAmount: bigint;
    imageUrl: string; // image link
}

export interface Investment {
    investor: string; // Principal
    ideaId: bigint;
    amount: bigint;
}