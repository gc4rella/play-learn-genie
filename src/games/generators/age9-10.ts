import { GameInstance } from "@/types/game";

// Mental Math Mix Generator
export function generateMentalMath(): GameInstance {
  const operations = [
    { expr: "24 ÷ 3 + 5", answer: 13 },
    { expr: "15 - 7 × 2", answer: 1 },
    { expr: "20 ÷ 4 + 8", answer: 13 },
    { expr: "18 - 9 + 6", answer: 15 },
    { expr: "12 × 2 - 10", answer: 14 },
  ];
  
  const selected = operations[Math.floor(Math.random() * operations.length)];
  
  const options = [selected.answer];
  while (options.length < 4) {
    const dist = selected.answer + Math.floor(Math.random() * 10) - 5;
    if (!options.includes(dist)) options.push(dist);
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `mental-math-${Date.now()}`,
    type: "mental-math",
    question: { expression: selected.expr },
    correctAnswer: selected.answer,
    options,
  };
}

// Inequalities True or False Generator
export function generateInequalities(): GameInstance {
  const num1 = Math.floor(Math.random() * 20) + 5;
  const num2 = Math.floor(Math.random() * 20) + 5;
  
  const operators = ["<", ">", "=", "≤", "≥"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let isTrue = false;
  
  switch (operator) {
    case "<":
      isTrue = num1 < num2;
      break;
    case ">":
      isTrue = num1 > num2;
      break;
    case "=":
      isTrue = num1 === num2;
      break;
    case "≤":
      isTrue = num1 <= num2;
      break;
    case "≥":
      isTrue = num1 >= num2;
      break;
  }
  
  return {
    id: `inequality-${Date.now()}`,
    type: "inequalities",
    question: { expression: `${num1} ${operator} ${num2}` },
    correctAnswer: isTrue,
    options: [true, false],
  };
}

// Logic Grid Mini Generator
export function generateLogicGrid(): GameInstance {
  // Simple 3x3 logic puzzle
  const items = ["apple", "banana", "orange"];
  const colors = ["red", "yellow", "green"];
  
  // Create solution
  const solution = items.map((item, i) => ({
    item,
    color: colors[i],
  }));
  
  const clues = [
    `The apple is ${solution[0].color}`,
    `The banana is not red`,
    `The orange is ${solution[2].color}`,
  ];
  
  return {
    id: `logic-grid-${Date.now()}`,
    type: "logic-grid",
    question: { clues, items, colors },
    correctAnswer: solution,
  };
}

// Coordinates Lite Generator
export function generateCoordinates(): GameInstance {
  const x = Math.floor(Math.random() * 8) + 1;
  const y = Math.floor(Math.random() * 8) + 1;
  
  const options = [
    { x, y },
    { x: x + 1, y },
    { x, y: y + 1 },
    { x: x - 1, y },
  ].filter(coord => coord.x > 0 && coord.y > 0 && coord.x <= 8 && coord.y <= 8);
  
  return {
    id: `coordinates-${Date.now()}`,
    type: "coordinates",
    question: { targetX: x, targetY: y },
    correctAnswer: { x, y },
    options,
  };
}

// Decimal Place Generator
export function generateDecimalPlace(): GameInstance {
  const decimal = (Math.random() * 10).toFixed(1); // e.g., 3.7
  const decimalNum = parseFloat(decimal);

  const options = [decimalNum];
  while (options.length < 4) {
    const distractor = parseFloat((decimalNum + (Math.random() - 0.5) * 2).toFixed(1));
    if (distractor > 0 && distractor <= 10 && !options.includes(distractor)) {
      options.push(distractor);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `decimal-place-${Date.now()}`,
    type: "decimal-place",
    question: {
      decimal: decimalNum,
      min: 0,
      max: 10
    },
    correctAnswer: decimalNum,
    options,
  };
}

// Factor Finder Generator
export function generateFactorFinder(): GameInstance {
  const numbers = [12, 15, 18, 20, 24, 28, 30, 36];
  const targetNumber = numbers[Math.floor(Math.random() * numbers.length)];

  // Find all factors
  const factors: number[] = [];
  for (let i = 1; i <= targetNumber; i++) {
    if (targetNumber % i === 0) {
      factors.push(i);
    }
  }

  // Pick a random factor as the correct answer
  const correctFactor = factors[Math.floor(Math.random() * factors.length)];

  // Generate options including the correct answer and some non-factors
  const options = [correctFactor];
  for (let i = 1; i <= targetNumber && options.length < 4; i++) {
    if (!factors.includes(i) && !options.includes(i)) {
      options.push(i);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `factor-finder-${Date.now()}`,
    type: "factor-finder",
    question: { number: targetNumber, factors },
    correctAnswer: correctFactor,
    options,
  };
}

// Word Math Generator
export function generateWordMath(): GameInstance {
  const problems = [
    {
      text: "Sarah has 12 apples. She gives 5 to her friend. How many does she have left?",
      answer: 7,
    },
    {
      text: "A box has 8 toys. Tom adds 6 more toys. How many toys are in the box now?",
      answer: 14,
    },
    {
      text: "There are 15 birds on a tree. 9 fly away. How many birds are left?",
      answer: 6,
    },
    {
      text: "Mike has 3 bags with 4 marbles each. How many marbles does he have in total?",
      answer: 12,
    },
    {
      text: "A pizza is cut into 8 slices. If you eat 3 slices, how many are left?",
      answer: 5,
    },
  ];

  const selected = problems[Math.floor(Math.random() * problems.length)];

  const options = [selected.answer];
  while (options.length < 4) {
    const distractor = selected.answer + Math.floor(Math.random() * 10) - 5;
    if (distractor > 0 && !options.includes(distractor)) {
      options.push(distractor);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    id: `word-math-${Date.now()}`,
    type: "word-math",
    question: { problem: selected.text },
    correctAnswer: selected.answer,
    options,
  };
}

// Prime Time Generator
export function generatePrimeTime(): GameInstance {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25];

  const isPrimeQuestion = Math.random() > 0.5;
  const correctAnswer = isPrimeQuestion
    ? primes[Math.floor(Math.random() * primes.length)]
    : composites[Math.floor(Math.random() * composites.length)];

  const options = [correctAnswer];

  const allNumbers = [...primes, ...composites];
  while (options.length < 4) {
    const num = allNumbers[Math.floor(Math.random() * allNumbers.length)];
    if (!options.includes(num)) {
      options.push(num);
    }
  }

  options.sort((a, b) => a - b);

  return {
    id: `prime-time-${Date.now()}`,
    type: "prime-time",
    question: {
      askFor: isPrimeQuestion ? "prime" : "composite",
      primes,
    },
    correctAnswer,
    options,
  };
}
