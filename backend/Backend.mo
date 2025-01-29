import List "mo:base/List";
import Principal "mo:base/Principal";

actor UserManager {
  stable var users : List.List<Principal> = List.nil();

  public shared(ic) func signUp(): async Bool {
    let caller = ic.caller;

    for (user in List.toIter<Principal>(users)) {
      if (user == caller) {
        return false;
      };
    };

    users := List.push<Principal>(caller, users);
    return true;
  };
}