import List "mo:base/List";
import Principal "mo:base/Principal";
import Usertypes "../types/UserTypes";

object {
  public var users : List.List<(Principal, Text, Text)> = List.nil(); // principal, role, username
}