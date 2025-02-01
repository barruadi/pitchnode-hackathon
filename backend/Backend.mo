import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor PitchNode {
  stable var users : List.List<(Principal, role: Text)> = List.nil();

  public shared(ic) func registerUser(role: Text): async Bool {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text)>(users)) {
      if (user.0 == caller) {
        return false;
      };
    };

    users := List.push<(Principal, role: Text)>((caller, role), users);
    return true;
  };

  public shared(ic) func getUser(): async ?Text {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text)>(users)) {
      if (user.0 == caller) {
        return ?user.1;
      };
    };

    return null;
  };


    // Business idea structure
  public type Businessidea = {
      id: Nat;
      owner: Principal;
      title: Text;
      description: Text;
      fundingGoal: Nat;
      raisedAmount: Nat;
  };

    // Investment structure
  public type Investment = {
      investor: Principal;
      ideaId: Nat;
      amount: Nat;
  };

  stable var ideas: List.List<Businessidea> = List.nil();
  stable var investments: List.List<Investment> = List.nil();
  stable var nextId: Nat = 0;

  public shared(ic) func uploadIdea(title: Text, description: Text, fundingGoal: Nat): async Nat {
      let caller = ic.caller;
      let idea: Businessidea = {
          id = nextId;
          owner = caller;
          title = title;
          description = description;
          fundingGoal = fundingGoal;
          raisedAmount = 0;
      };
      ideas := List.push<Businessidea>(idea, ideas);
      nextId := Nat.add(nextId, 1);
      
      return idea.id
  };

    // invest
    public shared(ic) func invest(ideaId: Nat, amount: Nat): async Bool {
      let caller = ic.caller;

        var updatedIdeas = List.nil<Businessidea>();
        var found = false;

        for (idea in List.toIter<Businessidea>(ideas)) {
            if (idea.id == ideaId) {
                let newIdea = {
                    id = idea.id;
                    owner = idea.owner;
                    title = idea.title;
                    description = idea.description;
                    fundingGoal = idea.fundingGoal;
                    raisedAmount = Nat.add(idea.raisedAmount, amount);
                };
                updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
                found := true;
            } else {
                updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
            };
        };

        if (found) {
            let newInvestment = {
                investor = caller;
                ideaId = ideaId;
                amount = amount;
            };
            investments := List.push(newInvestment, investments);
            ideas := updatedIdeas;
            return true;
        };
        return false;
    };

    public query func getIdeas(): async [Businessidea] {
        return List.toArray(ideas);
    };

    public query func getIdeasList(): async List.List<Businessidea>  {
        return ideas;
    };

    // public query func getInvesmentByIdea(ideaId: Nat): async [Investment] {
    //     return List.toArray(List.filter(investments, func(inv) {
    //         inv.ideaId == ideaId
    //     }));
    // };

    // public query func getInvesmentByInvestor(investor: Principal): async [Investment] {
    //     return List.toArray(List.filter(investments, func(inv) {
    //         inv.investor == investor
    //     }));
    // };

}

// actor UserManager {

// };


// // investment
// actor InvesmentPlatform {

// };