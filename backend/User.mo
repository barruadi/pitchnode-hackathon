// actor UserManager {
//   // Stores metadata for each user (Principal ID → Description)
//   stable var users: [(Principal, Text)] = []; // (Principal ID, description)

//   // Register a user with their device ID (Principal ID)
//   public func signUp(description: Text): async Bool {
//     let caller = ic.caller; // Get the Principal ID of the caller

//     // Check if the user is already registered
//     for (user in users) {
//       if (user.0 == caller) {
//         return false; // User is already registered
//       };
//     };

//     // Register the user with their Principal ID and description
//     users := List.append(users, [(caller, description)]);
//     return true;
//   };

//   // Query user metadata by Principal ID
//   public query func getUser(): async ?Text {
//     let caller = ic.caller; // Get the Principal ID of the caller

//     for (user in users) {
//       if (user.0 == caller) {
//         return ?user.1; // Return the description
//       };
//     };

//     return null; // User not found
//   };
// }
