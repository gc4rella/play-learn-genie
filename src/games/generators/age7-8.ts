import { GameInstance } from "@/types/game";

// Mini Sudoku 4x4 Generator
export function generateMiniSudoku(): GameInstance {
  // Create a valid 4x4 sudoku with unique solution
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  
  // Randomize by swapping within constraints
  const puzzle = solution.map(row => [...row]);
  
  // Remove some numbers (keep enough for unique solution)
  const cellsToRemove = 6;
  let removed = 0;
  
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return {
    id: `sudoku-${Date.now()}`,
    type: "mini-sudoku",
    question: { puzzle, solution },
    correctAnswer: solution,
  };
}

// Equation Fix Generator
export function generateEquationFix(): GameInstance {
  const num1 = Math.floor(Math.random() * 10) + 3; // 3-12
  const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
  const isAddition = Math.random() > 0.5;
  
  let answer: number;
  let equation: string;
  
  if (isAddition) {
    answer = num1;
    const result = num1 + num2;
    equation = `__ + ${num2} = ${result}`;
  } else {
    answer = num1;
    const result = num1 - num2;
    equation = `__ - ${num2} = ${result}`;
  }
  
  const options = [answer];
  while (options.length < 4) {
    const dist = answer + Math.floor(Math.random() * 6) - 3;
    if (dist > 0 && !options.includes(dist)) options.push(dist);
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `equation-${Date.now()}`,
    type: "equation-fix",
    question: { equation },
    correctAnswer: answer,
    options,
  };
}

// Pattern Rule Generator
export function generatePatternRule(): GameInstance {
  const patterns = [
    { sequence: [2, 4, 6, 8], answer: 10, rule: "+2" },
    { sequence: [5, 10, 15, 20], answer: 25, rule: "+5" },
    { sequence: [1, 3, 5, 7], answer: 9, rule: "+2" },
    { sequence: [10, 20, 30, 40], answer: 50, rule: "+10" },
  ];
  
  const selected = patterns[Math.floor(Math.random() * patterns.length)];
  
  const options = [selected.answer];
  while (options.length < 4) {
    const dist = selected.answer + Math.floor(Math.random() * 10) - 5;
    if (dist > 0 && !options.includes(dist)) options.push(dist);
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `pattern-rule-${Date.now()}`,
    type: "pattern-rule",
    question: { sequence: selected.sequence },
    correctAnswer: selected.answer,
    options,
  };
}

// Visual Fractions Generator
export function generateVisualFractions(): GameInstance {
  const fractions = [
    { value: "1/2", shaded: 2, total: 4, name: "one half" },
    { value: "1/4", shaded: 1, total: 4, name: "one quarter" },
    { value: "3/4", shaded: 3, total: 4, name: "three quarters" },
  ];

  const selected = fractions[Math.floor(Math.random() * fractions.length)];

  const options = fractions.map(f => f.value);

  return {
    id: `fractions-${Date.now()}`,
    type: "visual-fractions",
    question: { shaded: selected.shaded, total: selected.total },
    correctAnswer: selected.value,
    options,
  };
}

// Clock Master Generator
export function generateClockMaster(): GameInstance {
  const hours = Math.floor(Math.random() * 12) + 1; // 1-12
  const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45

  const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;

  return {
    id: `clock-${Date.now()}`,
    type: "clock-master",
    question: {
      hours,
      minutes,
      timeString,
    },
    correctAnswer: { hours, minutes },
  };
}

// Money Counter Generator
export function generateMoneyCounter(): GameInstance {
  // Use simple coins: penny (1¢), nickel (5¢), dime (10¢), quarter (25¢)
  const coinTypes = [
    { name: "penny", value: 1, symbol: "1¢" },
    { name: "nickel", value: 5, symbol: "5¢" },
    { name: "dime", value: 10, symbol: "10¢" },
    { name: "quarter", value: 25, symbol: "25¢" },
  ];

  // Generate a random set of coins
  const coins: { name: string; value: number; symbol: string }[] = [];
  const numCoins = Math.floor(Math.random() * 4) + 2; // 2-5 coins

  let total = 0;
  for (let i = 0; i < numCoins; i++) {
    const coin = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    coins.push(coin);
    total += coin.value;
  }

  // Generate distractor options
  const options = [total];
  while (options.length < 4) {
    const distractor = total + Math.floor(Math.random() * 20) - 10;
    if (distractor > 0 && !options.includes(distractor)) {
      options.push(distractor);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `money-${Date.now()}`,
    type: "money-counter",
    question: { coins },
    correctAnswer: total,
    options,
  };
}

// Spelling Bee Generator
export function generateSpellingBee(): GameInstance {
  const words = [
    { word: "happy", audio: "hap-py", hint: "Feeling good and joyful" },
    { word: "table", audio: "ta-ble", hint: "Furniture you eat on" },
    { word: "apple", audio: "ap-ple", hint: "A red or green fruit" },
    { word: "water", audio: "wa-ter", hint: "Clear liquid you drink" },
    { word: "house", audio: "hou-se", hint: "A building where people live" },
    { word: "tiger", audio: "ti-ger", hint: "A big striped cat" },
    { word: "pizza", audio: "piz-za", hint: "Italian food with cheese" },
    { word: "smile", audio: "smi-le", hint: "Expression when you're happy" },
    { word: "clock", audio: "clo-ck", hint: "Tells you the time" },
    { word: "plant", audio: "pla-nt", hint: "Green thing that grows" },
  ];

  const selected = words[Math.floor(Math.random() * words.length)];

  // Generate scrambled letters with some extras
  const correctLetters = selected.word.split("");
  const extraLetters = "abcdefghijklmnopqrstuvwxyz".split("");
  const randomExtras = extraLetters
    .filter(l => !correctLetters.includes(l))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allLetters = [...correctLetters, ...randomExtras].sort(() => Math.random() - 0.5);

  return {
    id: `spelling-${Date.now()}`,
    type: "spelling-bee",
    question: {
      audio: selected.audio,
      hint: selected.hint,
      letters: allLetters,
      wordLength: selected.word.length,
    },
    correctAnswer: selected.word,
  };
}

// Symmetry Mirror Generator
export function generateSymmetry(): GameInstance {
  // Create a simple 4x4 grid with symmetry
  const size = 4;
  const grid: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));

  // Fill left half randomly
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < Math.floor(size / 2); x++) {
      grid[y][x] = Math.random() > 0.5 ? 1 : 0;
    }
  }

  // Create solution grid (complete symmetry)
  const solution = grid.map(row => [...row]);
  for (let y = 0; y < size; y++) {
    for (let x = Math.floor(size / 2); x < size; x++) {
      solution[y][x] = solution[y][size - 1 - x];
    }
  }

  return {
    id: `symmetry-${Date.now()}`,
    type: "symmetry-mirror",
    question: { grid, size },
    correctAnswer: solution,
  };
}
