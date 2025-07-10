import Principal "mo:base/Principal";
import US "./services/UserService";
import IS "./services/IdeaService";
import IV "./services/InvestService";
import CS "./services/ChatService";

actor PitchNode {
  public shared(msg) func registerUser(role: Text, username: Text): async Bool {
    US.registerUser(msg.caller, role, username);
  };

  public shared(msg) func uploadIdea(title: Text, desc: Text, equity: Float, valuation: Float, imageUrl: Text): async Nat {
    IS.uploadIdea(msg.caller, title, desc, equity, valuation, imageUrl);
  };

  public shared(msg) func invest(ideaId: Nat, amount: Float): async Bool {
    IV.invest(msg.caller, ideaId, amount);
  };

  public shared(msg) func createMessageAsParent(message: Text, ideaId: Nat): async Bool {
    CS.createParentMessage(msg.caller, message, ideaId);
  };

  public query func getIdeas(): async [IS.Types.Businessidea] {
    IS.getIdeas();
  };
}
