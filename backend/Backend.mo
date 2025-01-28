import Array "mo:base/Array";
import List "mo:base/List";

actor UserManager {
  // Stores metadata for each user (Principal ID → Description)
  stable var users: [(Principal, Text)] = []; // (Principal ID, description)

  // Register a user with their device ID (Principal ID)
  public shared(ic) func signUp(description: Text): async Bool {
    let caller = ic.caller; // Get the Principal ID of the caller

    // Check if the user is already registered
    // if (List.find(users, func(user) {
    //   user.0 == caller;
    // }) != null) {
    //   return false; // User is already registered
    // };

    // Register the user with their Principal ID and description
    users := Array.append(users, [(caller, description)]);
    return true;
  };

  // Query user metadata by Principal ID
  // public shared(ic) func getUser(): async ?Text {
  //   // let caller = ic.caller; // Get the Principal ID of the caller

  //   // let usersArray = users;

  //   // Check if the user is already registered
  //   // if (Array.find(usersArray, func(user) {
  //   //   user.0 == caller;
  //   // }) != null) {
  //   //   return ?user.1; // User is already registered
  //   // };

  //   return null; // User not found
  // };
}
