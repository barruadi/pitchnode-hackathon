import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor PitchNode {
  stable var users : List.List<(Principal, role: Text, username: Text)> = List.nil();

  public shared(ic) func registerUser(role: Text, username: Text): async Bool {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return false;
      };
    };

    users := List.push<(Principal, role: Text, username: Text)>((caller, role, username), users);
    return true;
  };

  public shared(ic) func getUser(): async ?Text {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return ?user.1;
      };
    };

    return null;
  };


  public shared(ic) func getUsername(): async Text {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return user.2;
      };
    };

    return "NaN";
  };

  public query func getUsernameByPrincipal(principal: Principal): async ?Text {
    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == principal) {
        return ?user.2;
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
      equity: Nat;
      fundingGoal: Nat;
      raisedAmount: Nat;
      imageUrl: Text;
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
  public shared(ic) func uploadIdea(title: Text, description: Text, equity: Nat, fundingGoal: Nat, imageUrl: Text): async Nat {
      let caller = ic.caller;
      let idea: Businessidea = {
          id = nextId;
          owner = caller;
          title = title;
          description = description;
          equity = equity;
          fundingGoal = fundingGoal;
          raisedAmount = 0;
          imageUrl = imageUrl;
      };
      ideas := List.push<Businessidea>(idea, ideas);
      nextId := Nat.add(nextId, 1);
      
      return idea.id
  };

  public shared(ic) func haveBusinessIdea(): async Bool {
    let caller = ic.caller;
    for (idea in List.toIter<Businessidea>(ideas)) {
      if (idea.owner == caller) {
        return true;
      };
    };
    return false;
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
                    equity = idea.equity;
                    fundingGoal = idea.fundingGoal;
                    raisedAmount = Nat.add(idea.raisedAmount, amount);
                    imageUrl = idea.imageUrl;
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
        equity = 0;
        fundingGoal = 1;
        raisedAmount = 0;
        imageUrl = "NaN";
      };
      return default;
    };

    public query func getIdeas(): async [Businessidea] {
        return List.toArray(ideas);
    };

    public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
    };

    // principal -> ideaId
    public shared(ic) func getIdeaIdByPrincipal(): async Nat {
      let principal = ic.caller;
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.owner == principal) {
          return idea.id;
        };
      };
      return 0;
    };

    // principal -> investment
    public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == investor }));
    };

    // user -> investment
    public shared(ic) func getInvesmentUser(): async [Investment] {
        let principal = ic.caller;
        return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == principal }));
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


    // utils
    public func clearData(): async Bool {
      users := List.nil();
      ideas := List.nil();
      investments := List.nil();
      nextId := 0;
      return true;
    }
}