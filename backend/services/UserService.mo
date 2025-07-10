import List "mo:base/List";
import Principal "mo:base/Principal";
import Storage "../storage/UserStorage";

module {
  public func registerUser(caller: Principal, role: Text, username: Text): Bool {
    for (user in List.toIter(Storage.users)) {
      if (user.0 == caller) {
        return false;
      };
    };
    Storage.users := List.push((caller, role, username), Storage.users);
    return true;
  };

  public func getUserRole(caller: Principal): ?Text {
    for (user in List.toIter(Storage.users)) {
      if (user.0 == caller) {
        return ?user.1;
      };
    };
    return null;
  };

  public func getUsername(caller: Principal): ?Text {
    for (user in List.toIter(Storage.users)) {
      if (user.0 == caller) {
        return ?user.2;
      };
    };
    return null;
  };
}
