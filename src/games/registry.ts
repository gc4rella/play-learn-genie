import { MiniGame } from "@/types/game";
import {
  generateTapToCount,
  generateShapeMatch,
  generateWhichIsMore,
  generatePatternNext,
} from "./generators/age3-4";
import {
  generateNumberLine,
  generateQuickFacts,
  generateMemoryPairs,
  generateOddEven,
} from "./generators/age5-6";
import {
  generateMiniSudoku,
  generateEquationFix,
  generatePatternRule,
  generateVisualFractions,
} from "./generators/age7-8";
import {
  generateMentalMath,
  generateInequalities,
  generateLogicGrid,
  generateCoordinates,
} from "./generators/age9-10";

export const MINI_GAMES: MiniGame[] = [
  // Ages 3-4
  {
    id: "tap-to-count",
    name: "Tap to Count",
    ageRange: "3-4",
    description: "Count the objects and tap the correct number!",
    generator: generateTapToCount,
  },
  {
    id: "shape-match",
    name: "Shape Match",
    ageRange: "3-4",
    description: "Match shapes to their outlines!",
    generator: generateShapeMatch,
  },
  {
    id: "which-is-more",
    name: "Which Is More?",
    ageRange: "3-4",
    description: "Pick the pile with more items!",
    generator: generateWhichIsMore,
  },
  {
    id: "pattern-next",
    name: "Pattern Next",
    ageRange: "3-4",
    description: "What comes next in the pattern?",
    generator: generatePatternNext,
  },

  // Ages 5-6
  {
    id: "number-line",
    name: "Number Line Place-It",
    ageRange: "5-6",
    description: "Place numbers on the number line!",
    generator: generateNumberLine,
  },
  {
    id: "quick-facts",
    name: "Quick Facts Arcade",
    ageRange: "5-6",
    description: "Solve fast addition and subtraction!",
    generator: generateQuickFacts,
  },
  {
    id: "memory-pairs",
    name: "Memory Pairs",
    ageRange: "5-6",
    description: "Match numbers with dot quantities!",
    generator: generateMemoryPairs,
  },
  {
    id: "odd-even",
    name: "Odd or Even",
    ageRange: "5-6",
    description: "Sort numbers into odd or even!",
    generator: generateOddEven,
  },

  // Ages 7-8
  {
    id: "mini-sudoku",
    name: "Mini Sudoku 4×4",
    ageRange: "7-8",
    description: "Complete the 4×4 sudoku puzzle!",
    generator: generateMiniSudoku,
  },
  {
    id: "equation-fix",
    name: "Equation Fix",
    ageRange: "7-8",
    description: "Fill in the blank to balance the equation!",
    generator: generateEquationFix,
  },
  {
    id: "pattern-rule",
    name: "Pattern Rule",
    ageRange: "7-8",
    description: "Continue the number sequence!",
    generator: generatePatternRule,
  },
  {
    id: "visual-fractions",
    name: "Visual Fractions",
    ageRange: "7-8",
    description: "Identify the fraction shown!",
    generator: generateVisualFractions,
  },

  // Ages 9-10
  {
    id: "mental-math",
    name: "Mental Math Mix",
    ageRange: "9-10",
    description: "Solve multi-step math problems!",
    generator: generateMentalMath,
  },
  {
    id: "inequalities",
    name: "Inequalities True or False",
    ageRange: "9-10",
    description: "Is the inequality true or false?",
    generator: generateInequalities,
  },
  {
    id: "logic-grid",
    name: "Logic Grid Mini",
    ageRange: "9-10",
    description: "Solve the logic puzzle!",
    generator: generateLogicGrid,
  },
  {
    id: "coordinates",
    name: "Coordinates Lite",
    ageRange: "9-10",
    description: "Find the point on the grid!",
    generator: generateCoordinates,
  },
];

export function getGamesByAge(ageRange: string): MiniGame[] {
  return MINI_GAMES.filter((game) => game.ageRange === ageRange);
}
