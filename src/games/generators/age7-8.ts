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
