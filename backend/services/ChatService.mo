import List "mo:base/List";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Storage "../storage/ChatStorage";
import Types "../types/ChatTypes";

module {
  public func createParentMessage(caller: Principal, message: Text, ideaId: Nat): Bool {
    if (message == "" or ideaId == 0) return false;
    let newId = List.size<Types.ChatMessage>(Storage.chatMessages) + 1;
    let msg: Types.ChatMessage = {
      chatId = newId;
      ideaId = ideaId;
      sender = caller;
      content = message;
      createdAt = Nat64.toNat(Time.now());
      replyTo = null;
      replyList = null;
    };
    Storage.chatMessages := List.push(msg, Storage.chatMessages);
    return true;
  }
}
