import { GameInstance } from "@/types/game";

// Tap-to-Count Generator
export function generateTapToCount(): GameInstance {
  const targetNumber = Math.floor(Math.random() * 10) + 1; // 1-10
  const options: number[] = [];
  
  // Add correct answer
  options.push(targetNumber);
  
  // Add 2 distractors within ±2
  const distractor1 = Math.max(1, targetNumber + (Math.random() > 0.5 ? 1 : -1));
  const distractor2 = Math.max(1, targetNumber + (Math.random() > 0.5 ? 2 : -2));
  
  if (!options.includes(distractor1)) options.push(distractor1);
  if (!options.includes(distractor2) && options.length < 3) options.push(distractor2);
  
  // Add one more if needed
  while (options.length < 3) {
    const extra = Math.floor(Math.random() * 10) + 1;
    if (!options.includes(extra)) options.push(extra);
  }
  
  // Shuffle options
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `tap-count-${Date.now()}`,
    type: "tap-to-count",
    question: { count: targetNumber },
    correctAnswer: targetNumber,
    options,
  };
}

// Shape Match Generator
export function generateShapeMatch(): GameInstance {
  const shapes = ["circle", "triangle", "square"];
  const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    id: `shape-match-${Date.now()}`,
    type: "shape-match",
    question: { shape: targetShape },
    correctAnswer: targetShape,
    options: shapes,
  };
}

// Which Is More Generator
export function generateWhichIsMore(): GameInstance {
  const pile1 = Math.floor(Math.random() * 8) + 2; // 2-9
  let pile2 = Math.floor(Math.random() * 8) + 2;
  
  // Ensure they're different
  while (pile2 === pile1) {
    pile2 = Math.floor(Math.random() * 8) + 2;
  }
  
  return {
    id: `which-more-${Date.now()}`,
    type: "which-is-more",
    question: { pile1, pile2 },
    correctAnswer: Math.max(pile1, pile2),
  };
}

// Pattern Next Generator
export function generatePatternNext(): GameInstance {
  const patterns = [
    { pattern: ["A", "B", "A", "B"], answer: "A", type: "ABAB" },
    { pattern: ["red", "blue", "red", "blue"], answer: "red", type: "ABAB" },
    { pattern: ["circle", "square", "circle"], answer: "square", type: "ABAB" },
    { pattern: ["A", "B", "C", "A", "B"], answer: "C", type: "ABC" },
  ];
  
  const selected = patterns[Math.floor(Math.random() * patterns.length)];
  
  // Generate distractors
  const allOptions = ["A", "B", "C", "red", "blue", "green", "circle", "square", "triangle"];
  const options = [selected.answer];
  
  while (options.length < 3) {
    const opt = allOptions[Math.floor(Math.random() * allOptions.length)];
    if (!options.includes(opt)) options.push(opt);
  }
  
  options.sort(() => Math.random() - 0.5);
  
  return {
    id: `pattern-${Date.now()}`,
    type: "pattern-next",
    question: { pattern: selected.pattern },
    correctAnswer: selected.answer,
    options,
  };
}
