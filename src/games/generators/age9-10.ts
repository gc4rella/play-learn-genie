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
