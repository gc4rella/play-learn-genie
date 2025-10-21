import { GameInstance } from "@/types/game";

// Number Line Place-It Generator
export function generateNumberLine(): GameInstance {
  const max = 20;
  const targetNumber = Math.floor(Math.random() * max) + 1;
  
  return {
    id: `number-line-${Date.now()}`,
    type: "number-line",
    question: { target: targetNumber, max },
    correctAnswer: targetNumber,
  };
}

// Quick Facts Arcade Generator
export function generateQuickFacts(): GameInstance {
  const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
  const num2 = Math.floor(Math.random() * 9) + 1;
  const isAddition = Math.random() > 0.5;
  
  let answer: number;
  let question: string;
  
  if (isAddition) {
    answer = num1 + num2;
    question = `${num1} + ${num2}`;
  } else {
    // Ensure subtraction doesn't go negative
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    answer = larger - smaller;
    question = `${larger} - ${smaller}`;
  }
  
  // Generate options
  const options = [answer];
  while (options.length < 3) {
    const distractor = answer + Math.floor(Math.random() * 5) - 2;
    if (distractor > 0 && !options.includes(distractor)) {
      options.push(distractor);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `quick-facts-${Date.now()}`,
    type: "quick-facts",
    question: { expression: question },
    correctAnswer: answer,
    options,
  };
}

// Memory Pairs Generator
export function generateMemoryPairs(): GameInstance {
  const pairs = [];
  const numPairs = 4; // 8 cards total
  
  for (let i = 1; i <= numPairs; i++) {
    pairs.push({ id: `num-${i}`, type: "number", value: i });
    pairs.push({ id: `dots-${i}`, type: "dots", value: i });
  }
  
  // Shuffle
  pairs.sort(() => Math.random() - 0.5);
  
  return {
    id: `memory-${Date.now()}`,
    type: "memory-pairs",
    question: { cards: pairs },
    correctAnswer: pairs, // The matched pairs
  };
}

// Odd or Even Generator
export function generateOddEven(): GameInstance {
  const number = Math.floor(Math.random() * 20) + 1; // 1-20
  const isEven = number % 2 === 0;

  return {
    id: `odd-even-${Date.now()}`,
    type: "odd-even",
    question: { number },
    correctAnswer: isEven ? "even" : "odd",
    options: ["odd", "even"],
  };
}

// Word Builder Generator
export function generateWordBuilder(): GameInstance {
  const words = [
    { word: "cat", hint: "A furry pet that says meow" },
    { word: "dog", hint: "A furry pet that says woof" },
    { word: "sun", hint: "Bright and yellow in the sky" },
    { word: "hat", hint: "You wear it on your head" },
    { word: "bat", hint: "Flies at night or used in baseball" },
    { word: "cup", hint: "You drink from it" },
    { word: "pig", hint: "Pink farm animal that says oink" },
    { word: "fox", hint: "Orange animal with a bushy tail" },
    { word: "bug", hint: "A small insect" },
    { word: "bed", hint: "You sleep on it" },
  ];

  const selected = words[Math.floor(Math.random() * words.length)];
  const letters = selected.word.split("");

  // Shuffle letters
  const shuffled = [...letters].sort(() => Math.random() - 0.5);

  return {
    id: `word-builder-${Date.now()}`,
    type: "word-builder",
    question: {
      letters: shuffled,
      hint: selected.hint,
      wordLength: selected.word.length
    },
    correctAnswer: selected.word,
  };
}

// Color Mix Lab Generator
export function generateColorMix(): GameInstance {
  const mixes = [
    { color1: "red", color2: "blue", result: "purple" },
    { color1: "red", color2: "yellow", result: "orange" },
    { color1: "blue", color2: "yellow", result: "green" },
    { color1: "red", color2: "white", result: "pink" },
    { color1: "black", color2: "white", result: "gray" },
  ];

  const selected = mixes[Math.floor(Math.random() * mixes.length)];

  // Generate options including the correct answer
  const allColors = ["purple", "orange", "green", "pink", "gray", "brown"];
  const options = [selected.result];

  while (options.length < 3) {
    const color = allColors[Math.floor(Math.random() * allColors.length)];
    if (!options.includes(color)) {
      options.push(color);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `color-mix-${Date.now()}`,
    type: "color-mix",
    question: {
      color1: selected.color1,
      color2: selected.color2,
    },
    correctAnswer: selected.result,
    options,
  };
}

// Animal Match Generator
export function generateAnimalMatch(): GameInstance {
  const animals = [
    { name: "dog", sound: "woof", baby: "puppy", habitat: "house" },
    { name: "cat", sound: "meow", baby: "kitten", habitat: "house" },
    { name: "cow", sound: "moo", baby: "calf", habitat: "farm" },
    { name: "duck", sound: "quack", baby: "duckling", habitat: "pond" },
    { name: "lion", sound: "roar", baby: "cub", habitat: "jungle" },
    { name: "bird", sound: "chirp", baby: "chick", habitat: "tree" },
    { name: "frog", sound: "ribbit", baby: "tadpole", habitat: "pond" },
    { name: "sheep", sound: "baa", baby: "lamb", habitat: "farm" },
  ];

  const selected = animals[Math.floor(Math.random() * animals.length)];

  // Randomly choose what to match (sound, baby, or habitat)
  const matchTypes = ["sound", "baby", "habitat"];
  const matchType = matchTypes[Math.floor(Math.random() * matchTypes.length)];

  let options: string[] = [];
  let correctAnswer = "";

  if (matchType === "sound") {
    correctAnswer = selected.sound;
    options = animals.map(a => a.sound).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
  } else if (matchType === "baby") {
    correctAnswer = selected.baby;
    options = animals.map(a => a.baby).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
  } else {
    correctAnswer = selected.habitat;
    options = animals.map(a => a.habitat).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
  }

  if (!options.includes(correctAnswer)) {
    options.push(correctAnswer);
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `animal-match-${Date.now()}`,
    type: "animal-match",
    question: {
      animal: selected.name,
      matchType,
    },
    correctAnswer,
    options,
  };
}

// Maze Runner Generator
export function generateMaze(): GameInstance {
  // Generate a simple 5x5 maze with a path
  const size = 5;
  const maze: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));

  // Create a simple path from top-left to bottom-right
  let x = 0, y = 0;
  maze[y][x] = 1; // Mark as path

  const path = [[0, 0]];

  while (x < size - 1 || y < size - 1) {
    const canGoRight = x < size - 1;
    const canGoDown = y < size - 1;

    if (canGoRight && canGoDown) {
      if (Math.random() > 0.5) {
        x++;
      } else {
        y++;
      }
    } else if (canGoRight) {
      x++;
    } else {
      y++;
    }

    maze[y][x] = 1;
    path.push([y, x]);
  }

  return {
    id: `maze-${Date.now()}`,
    type: "maze-runner",
    question: { maze, size },
    correctAnswer: path,
  };
}
