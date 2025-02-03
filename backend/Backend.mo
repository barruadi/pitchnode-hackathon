import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Float "mo:base/Float";

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
      equity: Float;
      valuation: Float;
      raisedAmount: Float;
      imageUrl: Text;
      investorShares: [(Principal, Float)]
  };


  stable var ideas: List.List<Businessidea> = List.nil();
  stable var nextId: Nat = 0;

  // Business
  public shared(ic) func uploadIdea(title: Text, description: Text, equity: Float, valuation: Float, imageUrl: Text): async Nat {
      let caller = ic.caller;
      let idea: Businessidea = {
          id = nextId;
          owner = caller;
          title = title;
          description = description;
          equity = equity;
          valuation = valuation;
          raisedAmount = 0.0;
          imageUrl = imageUrl;
          investorShares = [];
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

  public shared(ic) func updateValuation(ideaId: Nat, newValuation: Float): async Bool {
    let caller = ic.caller;
    var updatedIdeas = List.nil<Businessidea>();
    var found = false;

    for (idea in List.toIter<Businessidea>(ideas)) {
      if (idea.id == ideaId and idea.owner == caller) {
        let newIdea = {
          id = idea.id;
          owner = idea.owner;
          title = idea.title;
          description = idea.description;
          equity = idea.equity;
          valuation = newValuation;
          raisedAmount = idea.raisedAmount;
          imageUrl = idea.imageUrl;
          investorShares = idea.investorShares;
        };
        updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
        found := true;
      } else {
        updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
      };
    };

    if (found) {
      ideas := updatedIdeas;
      return true;
    };
    return false;
  };

    // invest
    public shared(ic) func invest(ideaId: Nat, amount: Float): async Bool {
      let caller = ic.caller;

        var updatedIdeas = List.nil<Businessidea>();
        var found = false;

        for (idea in List.toIter<Businessidea>(ideas)) {
            if (idea.id == ideaId) {
              let totalEquitySold = List.foldLeft<(Principal, Float), Float>(
                List.fromArray(idea.investorShares), 0.0, func (acc, (_, equity)) { Float.add(acc, equity) }
              );

              let remaningEquity = Float.sub(idea.equity, totalEquitySold);
              let sharePercentage = (amount / idea.valuation) * idea.equity;

              if (sharePercentage > remaningEquity) {
                return false;
              };

                let newIdea = {
                    id = idea.id;
                    owner = idea.owner;
                    title = idea.title;
                    description = idea.description;
                    equity = idea.equity;
                    valuation = idea.valuation;
                    raisedAmount = Float.add(idea.raisedAmount, amount);
                    imageUrl = idea.imageUrl;
                    investorShares = List.toArray(List.push<(Principal, Float)>((caller, sharePercentage), List.fromArray(idea.investorShares))); 
                };
                updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
                found := true;
            } else {
                updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
            };
        };

        if (found) {
            ideas := updatedIdeas;
            return true;
        };
        return false;
    };

    public query func getInvestorValue(ideaId: Nat, investor: Principal): async Float {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
            if (share.0 == investor) {
              let currentValue = Float.mul(share.1, idea.valuation) / 100.0;
              return currentValue;
            };
          };
        };
      };
      return 0.0;
    };

    public query func getRemainingAmount(ideaId: Nat): async Float {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return Float.sub(idea.valuation, idea.raisedAmount);
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
        equity = 0.0;
        valuation = 1.0;
        raisedAmount = 0.0;
        imageUrl = "NaN";
        investorShares = [];
      };
      return default;
    };

    public query func getIdeas(): async [Businessidea] {
        return List.toArray(ideas);
    };

    public query func getInvestmentsByIdea(ideaId: Nat): async [(Principal, Float)] {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return idea.investorShares;
        };
      };
      return [];
    };

    // public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
    // };

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
    public query func getInvestmentsByInvestor(investor: Principal): async [(Principal, Float)] {
      var result: [(Principal, Float)] = [];
      for (idea in List.toIter<Businessidea>(ideas)) {
        for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
          if (share.0 == investor) {
            result := List.toArray(List.push<(Principal, Float)>(share, List.fromArray(result)));
          };
        };
      };
      return result;
    };

    // public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == investor }));
    // };

    // user -> investment
    public shared(ic) func getInvestmentUesr(): async [(Principal, Float)] {
      let principal = ic.caller;
      var result: [(Principal, Float)] = [];
      for (idea in List.toIter<Businessidea>(ideas)) {
        for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
          if (share.0 == principal) {
            result := List.toArray(List.push<(Principal, Float)>(share, List.fromArray(result)));
          };
        };
      };
      return result;
    };

    // public shared(ic) func getInvesmentUser(): async [Investment] {
    //     let principal = ic.caller;
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == principal }));
    // };


    // Invesment
    public query func getTotalInvestor( ideaId: Nat ): async Nat {
      var totalInvestor: Nat = 0;
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
            totalInvestor := Nat.add(totalInvestor, 1);
          };
        };
      };
      return totalInvestor;
    };

    // public query func getTotalInvestor( ideaId: Nat ): async Nat {
    //   var totalInvestor: Nat = 0;
    //   for (investment in List.toIter<Investment>(investments)) {
    //     if (investment.ideaId == ideaId) {
    //       totalInvestor := Nat.add(totalInvestor, 1);
    //     };
    //   };
    //   return totalInvestor;
    // };


    // utils
    public func clearData(): async Bool {
      users := List.nil();
      ideas := List.nil();
      nextId := 0;
      return true;
    }
}