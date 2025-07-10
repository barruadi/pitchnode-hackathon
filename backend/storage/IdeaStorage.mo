import List "mo:base/List";
import Types "../types/IdeaTypes";

object {
  public var ideas : List.List<Types.Businessidea> = List.nil();
  public var nextId : Nat = 0;
  public var valuationHistory : List.List<(Nat, Float)> = List.nil();
}
