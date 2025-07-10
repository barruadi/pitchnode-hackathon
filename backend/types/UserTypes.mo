import Principal "mo:base/Principal";

module {
  public type User = {
    principal: Principal;
    role: Text;
    username: Text;
    profilePhoto: Text;
    bio: Text;
  };
}
