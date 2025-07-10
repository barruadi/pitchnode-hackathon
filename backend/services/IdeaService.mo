import List "mo:base/List";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import IS "../storage/IdeaStorage";
import Types "../types/IdeaTypes";

module {
  public func uploadIdea(caller: Principal, title: Text, desc: Text, equity: Float, valuation: Float, imageUrl: Text): Nat {
    let idea: Types.Businessidea = {
      id = IS.nextId;
      owner = caller;
      title = title;
      description = desc;
      equity = equity;
      valuation = valuation;
      raisedAmount = 0.0;
      imageUrl = imageUrl;
      investorShares = [];
    };
    IS.ideas := List.push(idea, IS.ideas);
    IS.nextId += 1;
    return idea.id;
  };

  public func updateValuation(caller: Principal, ideaId: Nat, newVal: Float): Bool {
    var updated = List.nil<Types.Businessidea>();
    var found = false;

    for (idea in List.toIter(IS.ideas)) {
      if (idea.id == ideaId and idea.owner == caller) {
        let newIdea = idea;
        newIdea.valuation := newVal;
        updated := List.push(newIdea, updated);
        found := true;
        IS.valuationHistory := List.push((ideaId, newVal), IS.valuationHistory);
      } else {
        updated := List.push(idea, updated);
      };
    };

    if (found) {
      IS.ideas := updated;
      return true;
    };
    return false;
  };

  public func getValuationHistory(ideaId: Nat): [(Nat, Float)] {
    var res = List.nil<(Nat, Float)>();
    for (h in List.toIter(IS.valuationHistory)) {
      if (h.0 == ideaId) {
        res := List.push(h, res);
      };
    };
    return List.toArray(List.reverse(res));
  }

  public func getIdeas(): [Types.Businessidea] {
    return List.toArray(IS.ideas);
  }
}
