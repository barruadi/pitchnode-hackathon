import List "mo:base/List";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

module{
    public type ChatMessage = {
        chatId: Nat;
        ideaId: Nat;
        sender: Principal;
        content: Text;
        createdAt: Time.Time;
        replyTo: ?Nat;
        replyList: ?List.List<Nat>;
    };

    public func createMessage(
        id: Nat,
        ideaId: Nat,
        sender: Principal,
        content: Text,
        replyTo: ?Nat,
        replyList: ?List.List<Nat>
    ) : ChatMessage {
        {
        chatId = id;
        ideaId = ideaId;
        sender = sender;
        content = content;
        createdAt = Time.now();
        replyTo = replyTo;
        replyList = replyList;
        }
    };
}