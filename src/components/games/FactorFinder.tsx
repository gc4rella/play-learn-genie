import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface FactorFinderProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function FactorFinder({ instance, onAnswer }: FactorFinderProps) {
  const { number, factors } = instance.question;
  const options: number[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calculator className="h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Factor Finder!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Can you find a factor of this number?
        </p>
      </div>

      {/* Target Number */}
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-4">
          <p className="text-lg sm:text-xl font-semibold">Which number is a factor of:</p>
          <div className="inline-block px-8 sm:px-12 py-6 sm:py-8 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-3xl shadow-2xl">
            <p className="text-5xl sm:text-7xl font-bold">{number}</p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="max-w-2xl mx-auto p-6 bg-blue-100 dark:bg-blue-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
        <p className="text-center text-blue-900 dark:text-blue-100">
          💡 A <strong>factor</strong> is a number that divides evenly into another number with no remainder.
        </p>
        <p className="text-center text-sm text-blue-700 dark:text-blue-300 mt-2">
          Example: 3 is a factor of 12 because 12 ÷ 3 = 4 (no remainder)
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant="outline"
            size="lg"
            className="h-16 sm:h-20 text-xl sm:text-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg touch-manipulation"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Think: Can {number} be divided evenly by this number?</p>
      </div>
    </Card>
  );
}
