export interface BusinessIdea {
    id: bigint;
    title: string;
    owner: string; // Principal
    description: string;
    equity: bigint; // in percentage
    fundingGoal: bigint;
    raisedAmount: bigint;
    imageUrl: string; // image link
}

export interface Investment {
    investor: string; // Principal
    ideaId: bigint;
    amount: bigint;
}