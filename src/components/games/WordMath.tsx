import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface WordMathProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function WordMath({ instance, onAnswer }: WordMathProps) {
  const { problem } = instance.question;
  const options: number[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Word Math!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Solve the word problem
        </p>
      </div>

      {/* Word Problem Display */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-3xl border-4 border-orange-300 dark:border-orange-700 shadow-xl">
          <div className="text-center mb-6">
            <BookOpen className="h-12 w-12 mx-auto text-orange-600" />
          </div>
          <p className="text-2xl leading-relaxed text-gray-800 dark:text-gray-100 text-center">
            {problem}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-lg font-semibold">What's the answer?</p>
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
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          💡 Read carefully and look for clue words:
        </p>
        <div className="flex gap-4 justify-center text-sm">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            "adds" = +
          </span>
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
            "gives away" = −
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            "each" = ×
          </span>
        </div>
      </div>
    </Card>
  );
}
