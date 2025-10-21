import { MiniGame } from "@/types/game";
import {
  generateTapToCount,
  generateShapeSorter,
  generateColorMatch,
  generateBigOrSmall,
  generateSoundMatch,
} from "./generators/age3-4";
import {
  generateNumberLine,
  generateQuickFacts,
  generateMemoryPairs,
  generateOddEven,
  generateWordBuilder,
  generateColorMix,
  generateAnimalMatch,
  generateMaze,
} from "./generators/age5-6";
import {
  generateMiniSudoku,
  generateEquationFix,
  generatePatternRule,
  generateVisualFractions,
  generateClockMaster,
  generateMoneyCounter,
  generateSpellingBee,
  generateSymmetry,
} from "./generators/age7-8";
import {
  generateMentalMath,
  generateDecimalPlace,
  generateFactorFinder,
  generateWordMath,
  generatePrimeTime,
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
    id: "shape-sorter",
    name: "Shape Sorter",
    ageRange: "3-4",
    description: "Match shapes to their outlines!",
    generator: generateShapeSorter,
  },
  {
    id: "color-match",
    name: "Color Match",
    ageRange: "3-4",
    description: "Match objects by color!",
    generator: generateColorMatch,
  },
  {
    id: "big-or-small",
    name: "Big or Small",
    ageRange: "3-4",
    description: "Compare object sizes!",
    generator: generateBigOrSmall,
  },
  {
    id: "sound-match",
    name: "Sound Match",
    ageRange: "3-4",
    description: "Match animals to their sounds!",
    generator: generateSoundMatch,
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
  {
    id: "word-builder",
    name: "Word Builder",
    ageRange: "5-6",
    description: "Build words from letter tiles!",
    generator: generateWordBuilder,
  },
  {
    id: "color-mix",
    name: "Color Mix Lab",
    ageRange: "5-6",
    description: "Mix colors to create new ones!",
    generator: generateColorMix,
  },
  {
    id: "animal-match",
    name: "Animal Match",
    ageRange: "5-6",
    description: "Match animals with their sounds and homes!",
    generator: generateAnimalMatch,
  },
  {
    id: "maze-runner",
    name: "Maze Runner",
    ageRange: "5-6",
    description: "Find the path through the maze!",
    generator: generateMaze,
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
  {
    id: "clock-master",
    name: "Clock Master",
    ageRange: "7-8",
    description: "Learn to tell time on a clock!",
    generator: generateClockMaster,
  },
  {
    id: "money-counter",
    name: "Money Counter",
    ageRange: "7-8",
    description: "Count coins and learn their values!",
    generator: generateMoneyCounter,
  },
  {
    id: "spelling-bee",
    name: "Spelling Bee",
    ageRange: "7-8",
    description: "Spell words correctly from hints!",
    generator: generateSpellingBee,
  },
  {
    id: "symmetry-mirror",
    name: "Symmetry Mirror",
    ageRange: "7-8",
    description: "Complete the symmetrical pattern!",
    generator: generateSymmetry,
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
    id: "decimal-place",
    name: "Decimal Place",
    ageRange: "9-10",
    description: "Place decimals on number lines!",
    generator: generateDecimalPlace,
  },
  {
    id: "factor-finder",
    name: "Factor Finder",
    ageRange: "9-10",
    description: "Find factors of numbers!",
    generator: generateFactorFinder,
  },
  {
    id: "word-math",
    name: "Word Math",
    ageRange: "9-10",
    description: "Solve word problems!",
    generator: generateWordMath,
  },
  {
    id: "prime-time",
    name: "Prime Time",
    ageRange: "9-10",
    description: "Identify prime numbers!",
    generator: generatePrimeTime,
  },
];

export function getGamesByAge(ageRange: string): MiniGame[] {
  return MINI_GAMES.filter((game) => game.ageRange === ageRange);
}
