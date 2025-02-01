import List "mo:base/List";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

module {
    public type Investment = {
        investor: Principal; // Who invested
        ideaId: Nat;         // The business idea they invested in
        amount: Nat;         // How much they invested
    };

    stable var investments: List.List<Investment> = List.nil(); // Stores all investments

    // Function to invest in a business idea
    public shared(msg) func invest(ideaId: Nat, amount: Nat): async Bool {
        let caller = msg.caller; // The investor's Principal ID
        let newInvestment = { investor = caller; ideaId = ideaId; amount = amount };
        
        investments := List.push(newInvestment, investments); // Store the investment
        return true;
    };

    // Get all investments for a business idea
    public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
    };


    // Get all investments made by a specific investor
    public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func test (inv: Investment): Bool { inv.investor == investor }));
    };
}



// import Nat "mo:base/Nat";
// import List "mo:base/List";
// import Principal "mo:base/Principal";
 
// actor InvesmentPlatform {
//     // Business idea structure
//     public type Businessidea = {
//         id: Nat;
//         owner: Principal;
//         title: Text;
//         description: Text;
//         fundingGoal: Nat;
//         raisedAmount: Nat;
//     };

//     // Investment structure
//     public type Investment = {
//         investor: Principal;
//         ideaId: Nat;
//         amount: Nat;
//     };

//     stable var ideas: List.List<Businessidea> = List.nil();
//     stable var investments: List.List<Investment> = List.nil();
//     stable var nextId: Nat = 0;

//     public shared(ic) func uploadIdea(title: Text): async Nat {
//         let caller = ic.caller;
//         let idea: Businessidea = {
//             id = nextId;
//             owner = caller;
//             title = title;
//             description = "";
//             fundingGoal = 0;
//             raisedAmount = 0;
//         };
//         ideas := List.push<Businessidea>(idea, ideas);
//         nextId := Nat.add(nextId, 1);
        
//         return idea.id
//     };

//     // invest
//     public shared(ic) func invest(ideaId: Nat, amount: Nat): async Bool {
//         let caller = ic.caller;

//         var updatedIdeas = List.nil<Businessidea>();
//         var found = false;

//         for (idea in List.toIter<Businessidea>(ideas)) {
//             if (idea.id == ideaId) {
//                 let newIdea = {
//                     id = idea.id;
//                     owner = idea.owner;
//                     title = idea.title;
//                     description = idea.description;
//                     fundingGoal = idea.fundingGoal;
//                     raisedAmount = Nat.add(idea.raisedAmount, amount);
//                 };
//                 updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
//                 found := true;
//             } else {
//                 updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
//             };
//         };

//         if (found) {
//             let newInvestment = {
//                 investor = caller;
//                 ideaId = ideaId;
//                 amount = amount;
//             };
//             investments := List.push(newInvestment, investments);
//             ideas := updatedIdeas;
//             return true;
//         };
//         return false;
//     };

//     public query func getIdeas(): async [Businessidea] {
//         return List.toArray(ideas);
//     };

//     public query func getInvesmentByIdea(ideaId: Nat): async [Investment] {
//         return List.toArray(List.filter(investments, func(inv) {
//             inv.ideaId == ideaId
//         }));
//     };

//     public query func getInvesmentByInvestor(investor: Principal): async [Investment] {
//         return List.toArray(List.filter(investments, func(inv) {
//             inv.investor == investor
//         }));
//     }
// }