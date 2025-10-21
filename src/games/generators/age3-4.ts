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

// Shape Sorter Generator
export function generateShapeSorter(): GameInstance {
  const shapes = [
    { name: "circle", color: "#3B82F6" },
    { name: "square", color: "#EF4444" },
    { name: "triangle", color: "#22C55E" },
    { name: "star", color: "#EAB308" },
  ];

  const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  const options = shapes.map(s => s.name);

  return {
    id: `shape-sorter-${Date.now()}`,
    type: "shape-sorter",
    question: { targetShape: targetShape.name, targetColor: targetShape.color },
    correctAnswer: targetShape.name,
    options,
  };
}

// Color Match Generator
export function generateColorMatch(): GameInstance {
  const colors = [
    { name: "red", hex: "#EF4444", emoji: "🍎" },
    { name: "blue", hex: "#3B82F6", emoji: "💙" },
    { name: "yellow", hex: "#EAB308", emoji: "⭐" },
    { name: "green", hex: "#22C55E", emoji: "🍀" },
  ];

  const targetColor = colors[Math.floor(Math.random() * colors.length)];
  const options = colors.map(c => c.name);

  return {
    id: `color-match-${Date.now()}`,
    type: "color-match",
    question: {
      targetColor: targetColor.name,
      targetHex: targetColor.hex,
      emoji: targetColor.emoji
    },
    correctAnswer: targetColor.name,
    options,
  };
}

// Big or Small Generator
export function generateBigOrSmall(): GameInstance {
  const items = [
    { big: "elephant", small: "mouse", bigEmoji: "🐘", smallEmoji: "🐭" },
    { big: "tree", small: "flower", bigEmoji: "🌳", smallEmoji: "🌸" },
    { big: "car", small: "bike", bigEmoji: "🚗", smallEmoji: "🚲" },
    { big: "moon", small: "star", bigEmoji: "🌙", smallEmoji: "⭐" },
  ];

  const selected = items[Math.floor(Math.random() * items.length)];
  const askForBig = Math.random() > 0.5;

  return {
    id: `big-small-${Date.now()}`,
    type: "big-or-small",
    question: {
      item1: selected.big,
      item2: selected.small,
      emoji1: selected.bigEmoji,
      emoji2: selected.smallEmoji,
      askFor: askForBig ? "big" : "small",
    },
    correctAnswer: askForBig ? selected.big : selected.small,
  };
}

// Sound Match Generator (Simple version for 3-4 year olds)
export function generateSoundMatch(): GameInstance {
  const animals = [
    { name: "dog", sound: "woof", emoji: "🐕" },
    { name: "cat", sound: "meow", emoji: "🐈" },
    { name: "cow", sound: "moo", emoji: "🐄" },
    { name: "duck", sound: "quack", emoji: "🦆" },
  ];

  const selected = animals[Math.floor(Math.random() * animals.length)];
  const options = animals.map(a => a.name);

  return {
    id: `sound-match-${Date.now()}`,
    type: "sound-match",
    question: {
      sound: selected.sound,
      emoji: selected.emoji,
    },
    correctAnswer: selected.name,
    options,
  };
}
