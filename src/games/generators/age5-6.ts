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
