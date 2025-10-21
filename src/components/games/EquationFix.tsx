import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EquationFixProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function EquationFix({ instance, onAnswer }: EquationFixProps) {
  const { equation } = instance.question;
  const options: number[] = instance.options;

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Fill in the Blank!
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          What number makes this equation correct?
        </p>
      </div>

      {/* Equation Display */}
      <div className="text-center overflow-x-auto px-2">
        <div className="inline-block bg-primary/10 rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-12 sm:py-8 border-2 sm:border-4 border-primary">
          <span className="text-4xl sm:text-6xl font-bold text-foreground font-mono">
            {equation.split("__").map((part: string, index: number, arr: string[]) => (
              <span key={index}>
                {part}
                {index < arr.length - 1 && (
                  <span className="inline-block w-16 h-12 sm:w-24 sm:h-20 mx-1 sm:mx-2 border-b-2 sm:border-b-4 border-accent border-dashed align-middle" />
                )}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            size="lg"
            className="text-3xl sm:text-4xl py-8 sm:py-12 hover:scale-105 active:scale-95 transition-transform touch-manipulation"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground">
        <p>Tip: Work backwards from the answer to find the missing number!</p>
      </div>
    </Card>
  );
}
