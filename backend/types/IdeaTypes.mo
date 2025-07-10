import Principal "mo:base/Principal";
import Float "mo:base/Float";

module {
  public type Businessidea = {
    id: Nat;
    owner: Principal;
    title: Text;
    description: Text;
    equity: Float;
    valuation: Float;
    raisedAmount: Float;
    imageUrl: Text;
    investorShares: [(Principal, Float)];
  };
}
