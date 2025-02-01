import List "mo:base/List";

module {
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
};