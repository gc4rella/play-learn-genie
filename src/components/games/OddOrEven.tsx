import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OddOrEvenProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function OddOrEven({ instance, onAnswer }: OddOrEvenProps) {
  const { number } = instance.question;

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Is this number Odd or Even?
        </h2>
      </div>

      {/* Number Display */}
      <div className="text-center">
        <div className="inline-block bg-accent/20 rounded-2xl sm:rounded-3xl px-8 py-6 sm:px-16 sm:py-12 border-2 sm:border-4 border-accent">
          <span className="text-6xl sm:text-9xl font-bold text-accent">{number}</span>
        </div>
      </div>

      {/* Visual Dots Helper */}
      <div className="max-w-md mx-auto">
        <p className="text-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          Visual helper:
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-primary/10 p-3 sm:p-4 rounded-lg">
          {Array.from({ length: number }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center max-w-md mx-auto">
        <Button
          onClick={() => onAnswer("odd")}
          size="lg"
          className="text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 bg-purple-500 hover:bg-purple-600 w-full sm:w-auto touch-manipulation"
        >
          ODD
        </Button>
        <Button
          onClick={() => onAnswer("even")}
          size="lg"
          className="text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 bg-blue-500 hover:bg-blue-600 w-full sm:w-auto touch-manipulation"
        >
          EVEN
        </Button>
      </div>

      {/* Helper Text */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground">
        <p>Hint: Try pairing up the dots!</p>
        <p>Even numbers can be paired perfectly, odd numbers have one left over.</p>
      </div>
    </Card>
  );
}
