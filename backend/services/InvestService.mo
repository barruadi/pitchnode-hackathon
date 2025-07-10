import List "mo:base/List";
import Float "mo:base/Float";
import Principal "mo:base/Principal";
import IS "../storage/IdeaStorage";
import Types "../types/IdeaTypes";

module {
  public func invest(caller: Principal, ideaId: Nat, amount: Float): Bool {
    var updated = List.nil<Types.Businessidea>();
    var found = false;

    for (idea in List.toIter(IS.ideas)) {
      if (idea.id == ideaId) {
        let totalEquitySold = List.foldLeft<(Principal, Float), Float>(
          List.fromArray(idea.investorShares),
          0.0,
          func (acc, (_, eq)) { acc + eq }
        );

        let remainingEquity = idea.equity - totalEquitySold;
        let sharePercentage = (amount / idea.valuation) * idea.equity;

        if (sharePercentage > remainingEquity) {
          return false;
        };

        let newIdea = idea;
        newIdea.raisedAmount := idea.raisedAmount + amount;
        newIdea.investorShares := Array.append(idea.investorShares, [(caller, sharePercentage)]);
        updated := List.push(newIdea, updated);
        found := true;
      } else {
        updated := List.push(idea, updated);
      };
    };

    if (found) {
      IS.ideas := updated;
      return true;
    };
    return false;
  }
}
