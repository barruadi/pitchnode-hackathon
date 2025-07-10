import List "mo:base/List";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {
    public type ChatMessage = {
        chatId: Nat;
        ideaId: Nat;
        sender: Principal;
        content: Text;
        createdAt: Time.Time;
        replyTo: ?Nat;
        replyList: ?List.List<Nat>;
    };
}