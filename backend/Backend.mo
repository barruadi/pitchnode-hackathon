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

  // Business
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

    public query func getRemainingAmount(ideaId: Nat): async Nat {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return Nat.sub(idea.fundingGoal, idea.raisedAmount);
        };
      };
      return 0;
    };

    public shared(ic) func getIdeaDetail(ideaId: Nat): async Businessidea {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return idea;
        };
      };

      let default = {
        id = 0;
        owner = ic.caller;
        title = "NaN";
        description = "NaN";
        fundingGoal = 0;
        raisedAmount = 0;
      };
      return default;
    };

    public query func getIdeas(): async [Businessidea] {
        return List.toArray(ideas);
    };

    public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
    };


    // Get all investments made by a specific investor
    public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == investor }));
    };


    // Invesment
    public query func getTotalInvestor( ideaId: Nat ): async Nat {
      var totalInvestor: Nat = 0;
      for (investment in List.toIter<Investment>(investments)) {
        if (investment.ideaId == ideaId) {
          totalInvestor := Nat.add(totalInvestor, 1);
        };
      };
      return totalInvestor;
    };
}