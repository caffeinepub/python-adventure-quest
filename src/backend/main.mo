import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

actor {
  type WorldId = Nat;
  type QuestionId = Nat;

  type World = {
    id : WorldId;
    name : Text;
    description : Text;
  };

  module World {
    public func compare(world1 : World, world2 : World) : Order.Order {
      Nat.compare(world1.id, world2.id);
    };
  };

  type Question = {
    id : QuestionId;
    worldId : WorldId;
    questionText : Text;
    choices : [Text];
    correctAnswerIndex : Nat;
    xpReward : Nat;
  };

  module Question {
    public func compare(question1 : Question, question2 : Question) : Order.Order {
      Nat.compare(question1.id, question2.id);
    };
  };

  type PlayerSession = {
    xp : Nat;
    completedQuestions : Set.Set<QuestionId>;
  };

  type GameId = Principal;

  let worlds = Map.empty<WorldId, World>();
  let questions = Map.empty<QuestionId, Question>();
  let playerSessions = Map.empty<GameId, PlayerSession>();

  // Worlds management
  public shared ({ caller }) func addWorld(name : Text, description : Text) : async WorldId {
    let id = worlds.size();
    let world = {
      id;
      name;
      description;
    };
    worlds.add(id, world);
    id;
  };

  public query ({ caller }) func getAllWorlds() : async [World] {
    worlds.values().toArray().sort();
  };

  // Question management
  public shared ({ caller }) func addQuestion(
    worldId : WorldId,
    questionText : Text,
    choices : [Text],
    correctAnswerIndex : Nat,
    xpReward : Nat,
  ) : async QuestionId {
    let id = questions.size();
    let question = {
      id;
      worldId;
      questionText;
      choices;
      correctAnswerIndex;
      xpReward;
    };
    questions.add(id, question);
    id;
  };

  public query ({ caller }) func getQuestionsForWorld(worldId : WorldId) : async [Question] {
    questions.values().toArray().filter(
      func(q) { q.worldId == worldId }
    ).sort();
  };

  // Player session management
  public shared ({ caller }) func submitAnswer(questionId : QuestionId, answerIndex : Nat) : async {
    correct : Bool;
    xpEarned : Nat;
  } {
    let gameId = caller;
    let question = switch (questions.get(questionId)) {
      case (null) { Runtime.trap("Question does not exist") };
      case (?q) { q };
    };

    let isCorrect = answerIndex == question.correctAnswerIndex;
    let xpEarned = if (isCorrect) { question.xpReward } else { 0 };

    let session = switch (playerSessions.get(gameId)) {
      case (null) {
        let completedQuestions = Set.empty<QuestionId>();
        completedQuestions.add(questionId);
        {
          xp = xpEarned;
          completedQuestions;
        };
      };
      case (?session) {
        let completedQuestions = session.completedQuestions.clone();
        completedQuestions.add(questionId);
        {
          xp = session.xp + xpEarned;
          completedQuestions;
        };
    };
    };

    playerSessions.add(gameId, session);

    {
      correct = isCorrect;
      xpEarned;
    };
  };

  public query ({ caller }) func getPlayerStats() : async {
    xp : Nat;
    completedQuestions : [QuestionId];
  } {
    let gameId = caller;
    switch (playerSessions.get(gameId)) {
      case (null) { Runtime.trap("Player session does not exist") };
      case (?session) {
        {
          xp = session.xp;
          completedQuestions = session.completedQuestions.toArray().sort();
        };
      };
    };
  };
};
