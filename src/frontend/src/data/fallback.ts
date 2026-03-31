export interface FallbackWorld {
  id: bigint;
  name: string;
  description: string;
}

export interface FallbackQuestion {
  id: bigint;
  worldId: bigint;
  questionText: string;
  choices: string[];
  correctAnswerIndex: bigint;
  xpReward: bigint;
}

export const FALLBACK_WORLDS: FallbackWorld[] = [
  {
    id: 1n,
    name: "Basics Bayou",
    description: "Learn Python fundamentals in the swampy bayou!",
  },
  {
    id: 2n,
    name: "Functions Forest",
    description: "Master functions deep in the enchanted forest.",
  },
  {
    id: 3n,
    name: "Loops Lagoon",
    description: "Dive into loops and iteration at the lagoon.",
  },
  {
    id: 4n,
    name: "Algorithm Alps",
    description: "Conquer algorithms on the icy mountain peaks.",
  },
  {
    id: 5n,
    name: "Variables Village",
    description: "Understand variables in a cozy village setting.",
  },
];

export const FALLBACK_QUESTIONS: FallbackQuestion[] = [
  // Basics Bayou (worldId=1)
  {
    id: 1n,
    worldId: 1n,
    questionText: "What does `print('Hello')` output?",
    choices: ["Hello", "hello", "Error", "None"],
    correctAnswerIndex: 0n,
    xpReward: 10n,
  },
  {
    id: 2n,
    worldId: 1n,
    questionText: "What type is `x = 5`?",
    choices: ["str", "int", "float", "bool"],
    correctAnswerIndex: 1n,
    xpReward: 10n,
  },
  {
    id: 3n,
    worldId: 1n,
    questionText: "What does `len('abc')` return?",
    choices: ["2", "3", "4", "abc"],
    correctAnswerIndex: 1n,
    xpReward: 15n,
  },
  {
    id: 4n,
    worldId: 1n,
    questionText: "Which keyword defines a variable in Python?",
    choices: ["var", "let", "def", "None needed"],
    correctAnswerIndex: 3n,
    xpReward: 10n,
  },
  // Functions Forest (worldId=2)
  {
    id: 5n,
    worldId: 2n,
    questionText: "How do you define a function?",
    choices: ["function foo():", "def foo():", "fn foo():", "func foo():"],
    correctAnswerIndex: 1n,
    xpReward: 15n,
  },
  {
    id: 6n,
    worldId: 2n,
    questionText: "What does `return` do?",
    choices: [
      "Ends program",
      "Outputs value",
      "Sends value back",
      "Both B and C",
    ],
    correctAnswerIndex: 3n,
    xpReward: 15n,
  },
  {
    id: 7n,
    worldId: 2n,
    questionText: "What is `*args`?",
    choices: ["A pointer", "Variable args", "A keyword", "An error"],
    correctAnswerIndex: 1n,
    xpReward: 20n,
  },
  {
    id: 8n,
    worldId: 2n,
    questionText: "What prints from `def f(): return 5; print(f())`?",
    choices: ["None", "5", "f()", "Error"],
    correctAnswerIndex: 1n,
    xpReward: 20n,
  },
  // Loops Lagoon (worldId=3)
  {
    id: 9n,
    worldId: 3n,
    questionText: "Which loop runs while a condition is True?",
    choices: ["for", "while", "loop", "repeat"],
    correctAnswerIndex: 1n,
    xpReward: 10n,
  },
  {
    id: 10n,
    worldId: 3n,
    questionText: "What does `range(3)` produce?",
    choices: ["[1,2,3]", "[0,1,2]", "[0,1,2,3]", "[1,2]"],
    correctAnswerIndex: 1n,
    xpReward: 10n,
  },
  {
    id: 11n,
    worldId: 3n,
    questionText: "What keyword skips to the next loop iteration?",
    choices: ["skip", "next", "continue", "pass"],
    correctAnswerIndex: 2n,
    xpReward: 15n,
  },
  {
    id: 12n,
    worldId: 3n,
    questionText: "What does `break` do in a loop?",
    choices: ["Pauses it", "Skips one step", "Exits the loop", "Repeats it"],
    correctAnswerIndex: 2n,
    xpReward: 15n,
  },
  // Algorithm Alps (worldId=4)
  {
    id: 13n,
    worldId: 4n,
    questionText: "What is the time complexity of binary search?",
    choices: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswerIndex: 1n,
    xpReward: 25n,
  },
  {
    id: 14n,
    worldId: 4n,
    questionText: "Which sorts by repeatedly finding the minimum?",
    choices: ["Bubble sort", "Merge sort", "Selection sort", "Quick sort"],
    correctAnswerIndex: 2n,
    xpReward: 25n,
  },
  {
    id: 15n,
    worldId: 4n,
    questionText: "What data structure uses LIFO order?",
    choices: ["Queue", "Stack", "Tree", "Graph"],
    correctAnswerIndex: 1n,
    xpReward: 20n,
  },
  {
    id: 16n,
    worldId: 4n,
    questionText: "What is recursion?",
    choices: [
      "A loop",
      "A data type",
      "A function calling itself",
      "A sort method",
    ],
    correctAnswerIndex: 2n,
    xpReward: 25n,
  },
  // Variables Village (worldId=5)
  {
    id: 17n,
    worldId: 5n,
    questionText: "What is `x = 3.14` type?",
    choices: ["int", "str", "float", "complex"],
    correctAnswerIndex: 2n,
    xpReward: 10n,
  },
  {
    id: 18n,
    worldId: 5n,
    questionText: "How do you check a variable's type?",
    choices: ["typeof(x)", "type(x)", "x.type", "class(x)"],
    correctAnswerIndex: 1n,
    xpReward: 10n,
  },
  {
    id: 19n,
    worldId: 5n,
    questionText: "What is the value of `bool('')`?",
    choices: ["True", "False", "None", "Error"],
    correctAnswerIndex: 1n,
    xpReward: 15n,
  },
  {
    id: 20n,
    worldId: 5n,
    questionText: "What does `x, y = 1, 2` do?",
    choices: [
      "Error",
      "Assigns x=1 and y=2",
      "Assigns x=2 and y=1",
      "Creates a tuple",
    ],
    correctAnswerIndex: 1n,
    xpReward: 15n,
  },
];
