import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PrimeTimeProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function PrimeTime({ instance, onAnswer }: PrimeTimeProps) {
  const { askFor, primes } = instance.question;
  const options: number[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="h-10 w-10 text-yellow-500" />
          <h2 className="text-3xl font-bold text-foreground">Prime Time!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Test your prime number knowledge!
        </p>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-3xl shadow-2xl">
          <Sparkles className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <p className="text-3xl font-bold">
            Which number is {askFor === "prime" ? "PRIME" : "COMPOSITE"}?
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="p-6 bg-purple-100 dark:bg-purple-900/30 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <p className="text-center text-purple-900 dark:text-purple-100">
            <strong>Prime numbers</strong> can only be divided evenly by 1 and themselves.
          </p>
          <p className="text-center text-sm text-purple-700 dark:text-purple-300 mt-2">
            Examples: 2, 3, 5, 7, 11, 13...
          </p>
        </div>

        <div className="p-6 bg-pink-100 dark:bg-pink-900/30 rounded-xl border-2 border-pink-300 dark:border-pink-700">
          <p className="text-center text-pink-900 dark:text-pink-100">
            <strong>Composite numbers</strong> can be divided evenly by more than just 1 and themselves.
          </p>
          <p className="text-center text-sm text-pink-700 dark:text-pink-300 mt-2">
            Examples: 4, 6, 8, 9, 10, 12...
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant="outline"
            size="lg"
            className="h-20 text-2xl font-bold hover:scale-110 transition-transform shadow-lg"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          {askFor === "prime"
            ? "💡 Prime numbers have exactly 2 factors: 1 and themselves"
            : "💡 Composite numbers have more than 2 factors"}
        </p>
      </div>
    </Card>
  );
}
