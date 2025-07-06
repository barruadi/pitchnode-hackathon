import List "mo:base/List";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Chatroom "Chatroom";

actor PitchNode {
	stable var users : List.List<(Principal, role : Text, username : Text)> = List.nil();
  stable var valuationHistory: List.List<(ideaId: Nat, valuation: Float)> = List.nil<(ideaId: Nat, valuation: Float)>();
	stable var chatMessages : List.List<Chatroom.ChatMessage> = List.nil();
	
	public shared (ic) func registerUser(role : Text, username : Text) : async Bool {
		let caller = ic.caller;

		for (user in List.toIter<(Principal, role : Text, username : Text)>(users)) {
			if (user.0 == caller) {
				return false;
			};
		};

		users := List.push<(Principal, role : Text, username : Text)>((caller, role, username), users);
		return true;
	};

	public shared (ic) func getUser() : async ?Text {
		let caller = ic.caller;

		for (user in List.toIter<(Principal, role : Text, username : Text)>(users)) {
			if (user.0 == caller) {
				return ?user.1;
			};
		};

		return null;
	};

	public shared (ic) func getUsername() : async Text {
		let caller = ic.caller;

		for (user in List.toIter<(Principal, role : Text, username : Text)>(users)) {
			if (user.0 == caller) {
				return user.2;
			};
		};

		return "NaN";
	};

	public query func getUsernameByPrincipal(principal : Principal) : async ?Text {
		for (user in List.toIter<(Principal, role : Text, username : Text)>(users)) {
			if (user.0 == principal) {
				return ?user.2;
			};
		};

		return null;
	};

	// Business idea structure
	public type Businessidea = {
		id : Nat;
		owner : Principal;
		title : Text;
		description : Text;
		equity : Float;
		valuation : Float;
		raisedAmount : Float;
		imageUrl : Text;
		investorShares : [(Principal, Float)];
	};

	stable var ideas : List.List<Businessidea> = List.nil();
	stable var nextId : Nat = 0;

	// Business
	public shared (ic) func uploadIdea(title : Text, description : Text, equity : Float, valuation : Float, imageUrl : Text) : async Nat {
		let caller = ic.caller;
		let idea : Businessidea = {
			id = nextId;
			owner = caller;
			title = title;
			description = description;
			equity = equity;
			valuation = valuation;
			raisedAmount = 0.0;
			imageUrl = imageUrl;
			investorShares = [];
		};
		ideas := List.push<Businessidea>(idea, ideas);
		nextId := Nat.add(nextId, 1);

		return idea.id;
	};

	public shared (ic) func haveBusinessIdea() : async Bool {
		let caller = ic.caller;
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.owner == caller) {
				return true;
			};
		};
		return false;
	};

	public shared (ic) func updateValuation(ideaId : Nat, newValuation : Float) : async Bool {
		let caller = ic.caller;
		var updatedIdeas = List.nil<Businessidea>();
		var found = false;

		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId and idea.owner == caller) {
				let newIdea = {
					id = idea.id;
					owner = idea.owner;
					title = idea.title;
					description = idea.description;
					equity = idea.equity;
					valuation = newValuation;
					raisedAmount = idea.raisedAmount;
					imageUrl = idea.imageUrl;
					investorShares = idea.investorShares;
				};
				updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
				found := true;
			} else {
				updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
			};
		};

		if (found) {
			ideas := updatedIdeas;
			return true;
		};
		return false;
	};
  
  // fungsi untuk mengambil riwauyat valuation dari sebuah ide
  // return : array
  public query func getValuationHistoryFromIdea(ideaId: Nat): async [(Nat, Float)] {
  var results: List.List<(Nat, Float)> = List.nil<(Nat, Float)>();
  for (history in List.toIter(valuationHistory)){
    if (history.0 == ideaId){
      results := List.push<(Nat, Float)>((history.0, history.1), results);
    };
  };
  return List.toArray(List.reverse(results));
  };

	// invest
	public shared (ic) func invest(ideaId : Nat, amount : Float) : async Bool {
		let caller = ic.caller;

		var updatedIdeas = List.nil<Businessidea>();
		var found = false;

		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				let totalEquitySold = List.foldLeft<(Principal, Float), Float>(
					List.fromArray(idea.investorShares),
					0.0,
					func(acc, (_, equity)) { Float.add(acc, equity) },
				);

				let remaningEquity = Float.sub(idea.equity, totalEquitySold);
				let sharePercentage = (amount / idea.valuation) * idea.equity;

				if (sharePercentage > remaningEquity) {
					return false;
				};

				let newIdea = {
					id = idea.id;
					owner = idea.owner;
					title = idea.title;
					description = idea.description;
					equity = idea.equity;
					valuation = idea.valuation;
					raisedAmount = Float.add(idea.raisedAmount, amount);
					imageUrl = idea.imageUrl;
					investorShares = List.toArray(List.push<(Principal, Float)>((caller, sharePercentage), List.fromArray(idea.investorShares)));
				};
				updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
				found := true;
			} else {
				updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
			};
		};

		if (found) {
			ideas := updatedIdeas;
			return true;
		};
		return false;
	};

	public query func getInvestorValue(ideaId : Nat, investor : Principal) : async Float {
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
					if (share.0 == investor) {
						let currentValue = Float.mul(share.1, idea.valuation) / 100.0;
						return currentValue;
					};
				};
			};
		};
		return 0.0;
	};

	public query func getRemainingAmount(ideaId : Nat) : async Float {
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				return Float.sub(idea.valuation, idea.raisedAmount);
			};
		};
		return 0;
	};

	public shared (ic) func getIdeaDetail(ideaId : Nat) : async Businessidea {
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				return idea;
			};
		};

		let default = {
			id = 0;
			owner = ic.caller;
			title = "NaN";
			description = "NaN";
			equity = 0.0;
			valuation = 1.0;
			raisedAmount = 0.0;
			imageUrl = "NaN";
			investorShares = [];
		};
		return default;
	};

	public query func getIdeas() : async [Businessidea] {
		return List.toArray(ideas);
	};

	public query func getInvestmentsByIdea(ideaId : Nat) : async [(Principal, Float)] {
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				return idea.investorShares;
			};
		};
		return [];
	};

	// public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
	//     return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
	// };

	// principal -> ideaId
	public shared (ic) func getIdeaIdByPrincipal() : async Nat {
		let principal = ic.caller;
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.owner == principal) {
				return idea.id;
			};
		};
		return 0;
	};

	// principal -> investment with ideaId
	public query func getInvestmentsByInvestor(investor : Principal) : async [(Nat, Principal, Float)] {
		var result : [(Nat, Principal, Float)] = [];
		for (idea in List.toIter<Businessidea>(ideas)) {
			for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
				if (share.0 == investor) {
					result := List.toArray(List.push<(Nat, Principal, Float)>((idea.id, share.0, share.1), List.fromArray(result)));
				};
			};
		};
		return result;
	};

	// public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
	//     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == investor }));
	// };

	// user -> investment
	public shared (ic) func getInvestmentUser() : async [(Nat, Principal, Float)] {
		let principal = ic.caller;
		var result : [(Nat, Principal, Float)] = [];
		for (idea in List.toIter<Businessidea>(ideas)) {
			for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
				if (share.0 == principal) {
					result := List.toArray(List.push<(Nat, Principal, Float)>((idea.id, share.0, share.1), List.fromArray(result)));
				};
			};
		};
		return result;
	};

	// public shared(ic) func getInvesmentUser(): async [Investment] {
	//     let principal = ic.caller;
	//     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == principal }));
	// };

	// Invesment
	public query func getTotalInvestor(ideaId : Nat) : async Nat {
		var totalInvestor : Nat = 0;
		for (idea in List.toIter<Businessidea>(ideas)) {
			if (idea.id == ideaId) {
				for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
					totalInvestor := Nat.add(totalInvestor, 1);
				};
			};
		};
		return totalInvestor;
	};

	// public query func getTotalInvestor( ideaId: Nat ): async Nat {
	//   var totalInvestor: Nat = 0;
	//   for (investment in List.toIter<Investment>(investments)) {
	//     if (investment.ideaId == ideaId) {
	//       totalInvestor := Nat.add(totalInvestor, 1);
	//     };
	//   };
	//   return totalInvestor;
	// };

	// utils
	public func clearData() : async Bool {
		users := List.nil();
		ideas := List.nil();
		chatMessages := List.nil();
		nextId := 0;
		return true;
	};
	public func resetUser() : async Bool {
		users := List.nil();
		return true;
	};

	// CHATROOM

	public shared (ic) func createMessageAsParent(message : Text, ideaId : Nat) : async Bool {
		if (message == "" or ideaId == 0) {
			return false;
		};
		let caller = ic.caller;
		let newMessage : Chatroom.ChatMessage = Chatroom.createMessage(
			List.size<Chatroom.ChatMessage>(chatMessages) + 1,
			ideaId,
			caller,
			message,
			null,
			null,
		);
		chatMessages := List.push<Chatroom.ChatMessage>(newMessage, chatMessages);
		return true;
	};

	public shared (ic) func createMessageAsReply(message : Text, replyTo : Nat) : async Bool {
		if (message == "" or replyTo == 0) {
			return false;
		};

		let caller = ic.caller;
		var updatedMessages = List.nil<Chatroom.ChatMessage>();
		var found = false;
		let newId = List.size<Chatroom.ChatMessage>(chatMessages) + 1;
		var parent : ?Chatroom.ChatMessage = null;

		for (msg in List.toIter(chatMessages)) {
			if (msg.chatId == replyTo) {
				let updatedParent : Chatroom.ChatMessage = {
					chatId = msg.chatId;
					ideaId = msg.ideaId;
					sender = msg.sender;
					content = msg.content;
					createdAt = msg.createdAt;
					replyTo = ?replyTo;
					replyList = switch (msg.replyList) {
						case (null) { ?List.push(newId, List.nil()) };
						case (?lst) { ?List.push(newId, lst) };
					};
				};
				updatedMessages := List.push(updatedParent, updatedMessages);
				parent := ?updatedParent;
				found := true;
			} else {
				updatedMessages := List.push(msg, updatedMessages);
			};
		};

		if (not found or parent == null) return false;

		let newMsg = Chatroom.createMessage(
			newId,
			switch parent { case (?p) p.ideaId; case null 0 },
			caller,
			message,
			?replyTo,
			null,
		);

		updatedMessages := List.push(newMsg, updatedMessages);
		chatMessages := updatedMessages;
		return true;
	};

	public query func getAllMessages() : async [Chatroom.ChatMessage] {
		return List.toArray(chatMessages);
	};

	public query func getMessagesByIdea(ideaId : Nat) : async [Chatroom.ChatMessage] {
		return List.toArray(
			List.filter<Chatroom.ChatMessage>(
				chatMessages,
				func(msg : Chatroom.ChatMessage) : Bool {
					msg.ideaId == ideaId;
				},
			)
		);
	};

	public query func getAllRepliesByMessageId(messageId : Nat) : async [Chatroom.ChatMessage] {
		for (msg in List.toIter<Chatroom.ChatMessage>(chatMessages)) {
			if (msg.chatId == messageId) {
				switch (msg.replyList) {
					case (null) { return [] };
					case (?lst) {
						let replies = List.filter<Chatroom.ChatMessage>(
							chatMessages,
							func(m : Chatroom.ChatMessage) : Bool {
								List.some<Nat>(lst, func(id : Nat) : Bool { m.chatId == id });
							},
						);
						return List.toArray(replies);
					};
				};
			};
		};
		return [];
	};
};
=======
  stable var users : List.List<(Principal, role: Text, username: Text)> = List.nil();
  stable var valuationHistory: List.List<(ideaId: Nat, valuation: Float)> = List.nil<(ideaId: Nat, valuation: Float)>();

  public shared(ic) func registerUser(role: Text, username: Text): async Bool {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return false;
      };
    };

    users := List.push<(Principal, role: Text, username: Text)>((caller, role, username), users);
    return true;
  };

  public shared(ic) func getUser(): async ?Text {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return ?user.1;
      };
    };

    return null;
  };


  public shared(ic) func getUsername(): async Text {
    let caller = ic.caller;

    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == caller) {
        return user.2;
      };
    };

    return "NaN";
  };

  public query func getUsernameByPrincipal(principal: Principal): async ?Text {
    for (user in List.toIter<(Principal, role: Text, username: Text)>(users)) {
      if (user.0 == principal) {
        return ?user.2;
      };
    };

    return null;
  };

    // Business idea structure
  public type Businessidea = {
      id: Nat;
      owner: Principal;
      title: Text;
      description: Text;
      equity: Float;
      valuation: Float;
      raisedAmount: Float;
      imageUrl: Text;
      investorShares: [(Principal, Float)]
  };


  stable var ideas: List.List<Businessidea> = List.nil();
  stable var nextId: Nat = 0;

  // Business
  public shared(ic) func uploadIdea(title: Text, description: Text, equity: Float, valuation: Float, imageUrl: Text): async Nat {
      let caller = ic.caller;
      let idea: Businessidea = {
          id = nextId;
          owner = caller;
          title = title;
          description = description;
          equity = equity;
          valuation = valuation;
          raisedAmount = 0.0;
          imageUrl = imageUrl;
          investorShares = [];
      };
      ideas := List.push<Businessidea>(idea, ideas);
      nextId := Nat.add(nextId, 1);
      
      return idea.id
  };

  public shared(ic) func haveBusinessIdea(): async Bool {
    let caller = ic.caller;
    for (idea in List.toIter<Businessidea>(ideas)) {
      if (idea.owner == caller) {
        return true;
      };
    };
    return false;
  };

  public shared(ic) func updateValuation(ideaId: Nat, newValuation: Float): async Bool {
    let caller = ic.caller;
    var updatedIdeas = List.nil<Businessidea>();
    var found = false;

    for (idea in List.toIter<Businessidea>(ideas)) {
      if (idea.id == ideaId and idea.owner == caller) {
        let newIdea = {
          id = idea.id;
          owner = idea.owner;
          title = idea.title;
          description = idea.description;
          equity = idea.equity;
          valuation = newValuation;
          raisedAmount = idea.raisedAmount;
          imageUrl = idea.imageUrl;
          investorShares = idea.investorShares;
        };
        updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
        found := true;
      } else {
        updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
      };
    };

    if (found) {
      ideas := updatedIdeas;
      valuationHistory := List.push<(ideaId: Nat, valuation: Float)>((ideaId, newValuation), valuationHistory);
      return true;
    };
    return false;
  };

    // fungsi untuk mengambil riwauyat valuation dari sebuah ide
    // return : array
    public query func getValuationHistoryFromIdea(ideaId: Nat): async [(Nat, Float)] {
      var results: List.List<(Nat, Float)> = List.nil<(Nat, Float)>();
      for (history in List.toIter(valuationHistory)){
        if (history.0 == ideaId){
          results := List.push<(Nat, Float)>((history.0, history.1), results);
        };
      };
      return List.toArray(List.reverse(results));
    };

    // invest
    public shared(ic) func invest(ideaId: Nat, amount: Float): async Bool {
      let caller = ic.caller;

        var updatedIdeas = List.nil<Businessidea>();
        var found = false;

        for (idea in List.toIter<Businessidea>(ideas)) {
            if (idea.id == ideaId) {
              let totalEquitySold = List.foldLeft<(Principal, Float), Float>(
                List.fromArray(idea.investorShares), 0.0, func (acc, (_, equity)) { Float.add(acc, equity) }
              );

              let remaningEquity = Float.sub(idea.equity, totalEquitySold);
              let sharePercentage = (amount / idea.valuation) * idea.equity;

              if (sharePercentage > remaningEquity) {
                return false;
              };

                let newIdea = {
                    id = idea.id;
                    owner = idea.owner;
                    title = idea.title;
                    description = idea.description;
                    equity = idea.equity;
                    valuation = idea.valuation;
                    raisedAmount = Float.add(idea.raisedAmount, amount);
                    imageUrl = idea.imageUrl;
                    investorShares = List.toArray(List.push<(Principal, Float)>((caller, sharePercentage), List.fromArray(idea.investorShares))); 
                };
                updatedIdeas := List.push<Businessidea>(newIdea, updatedIdeas);
                found := true;
            } else {
                updatedIdeas := List.push<Businessidea>(idea, updatedIdeas);
            };
        };

        if (found) {
            ideas := updatedIdeas;
            return true;
        };
        return false;
    };

    public query func getInvestorValue(ideaId: Nat, investor: Principal): async Float {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
            if (share.0 == investor) {
              let currentValue = Float.mul(share.1, idea.valuation) / 100.0;
              return currentValue;
            };
          };
        };
      };
      return 0.0;
    };

    public query func getRemainingAmount(ideaId: Nat): async Float {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return Float.sub(idea.valuation, idea.raisedAmount);
        };
      };
      return 0;
    };

    public shared(ic) func getIdeaDetail(ideaId: Nat): async Businessidea {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return idea;
        };
      };

      let default = {
        id = 0;
        owner = ic.caller;
        title = "NaN";
        description = "NaN";
        equity = 0.0;
        valuation = 1.0;
        raisedAmount = 0.0;
        imageUrl = "NaN";
        investorShares = [];
      };
      return default;
    };

    public query func getIdeas(): async [Businessidea] {
        return List.toArray(ideas);
    };

    public query func getInvestmentsByIdea(ideaId: Nat): async [(Principal, Float)] {
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          return idea.investorShares;
        };
      };
      return [];
    };

    // public query func getInvestmentsByIdea(ideaId: Nat): async [Investment] {
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment) : Bool { return inv.ideaId == ideaId }));
    // };

    // principal -> ideaId
    public shared(ic) func getIdeaIdByPrincipal(): async Nat {
      let principal = ic.caller;
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.owner == principal) {
          return idea.id;
        };
      };
      return 0;
    };

    // principal -> investment with ideaId
    public query func getInvestmentsByInvestor(investor: Principal): async [(Nat, Principal, Float)] {
      var result: [(Nat, Principal, Float)] = [];
      for (idea in List.toIter<Businessidea>(ideas)) {
        for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
          if (share.0 == investor) {
            result := List.toArray(List.push<(Nat, Principal, Float)>((idea.id, share.0, share.1), List.fromArray(result)));
          };
        };
      };
      return result;
    };

    // public query func getInvestmentsByInvestor(investor: Principal): async [Investment] {
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == investor }));
    // };

    // user -> investment
    public shared(ic) func getInvestmentUser(): async [(Nat, Principal, Float)] {
      let principal = ic.caller;
      var result: [(Nat, Principal, Float)] = [];
      for (idea in List.toIter<Businessidea>(ideas)) {
        for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
          if (share.0 == principal) {
            result := List.toArray(List.push<(Nat, Principal, Float)>((idea.id, share.0, share.1), List.fromArray(result)));
          };
        };
      };
      return result;
    };

    // public shared(ic) func getInvesmentUser(): async [Investment] {
    //     let principal = ic.caller;
    //     return List.toArray(List.filter<Investment>(investments, func (inv: Investment): Bool { inv.investor == principal }));
    // };


    // Invesment
    public query func getTotalInvestor( ideaId: Nat ): async Nat {
      var totalInvestor: Nat = 0;
      for (idea in List.toIter<Businessidea>(ideas)) {
        if (idea.id == ideaId) {
          for (share in List.toIter<(Principal, Float)>(List.fromArray(idea.investorShares))) {
            totalInvestor := Nat.add(totalInvestor, 1);
          };
        };
      };
      return totalInvestor;
    };

    // public query func getTotalInvestor( ideaId: Nat ): async Nat {
    //   var totalInvestor: Nat = 0;
    //   for (investment in List.toIter<Investment>(investments)) {
    //     if (investment.ideaId == ideaId) {
    //       totalInvestor := Nat.add(totalInvestor, 1);
    //     };
    //   };
    //   return totalInvestor;
    // };


    // utils
    public func clearData(): async Bool {
      users := List.nil();
      ideas := List.nil();
      nextId := 0;
      return true;
    };
    public func resetUser(): async Bool {
      users := List.nil();
      return true;
    }
}
