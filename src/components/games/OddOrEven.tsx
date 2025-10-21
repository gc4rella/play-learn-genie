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
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Is this number Odd or Even?
        </h2>
      </div>

      {/* Number Display */}
      <div className="text-center">
        <div className="inline-block bg-accent/20 rounded-3xl px-16 py-12 border-4 border-accent">
          <span className="text-9xl font-bold text-accent">{number}</span>
        </div>
      </div>

      {/* Visual Dots Helper */}
      <div className="max-w-md mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-3">
          Visual helper:
        </p>
        <div className="flex flex-wrap justify-center gap-2 bg-primary/10 p-4 rounded-lg">
          {Array.from({ length: number }, (_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-accent rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="flex gap-6 justify-center">
        <Button
          onClick={() => onAnswer("odd")}
          size="lg"
          className="text-2xl px-16 py-8 bg-purple-500 hover:bg-purple-600"
        >
          ODD
        </Button>
        <Button
          onClick={() => onAnswer("even")}
          size="lg"
          className="text-2xl px-16 py-8 bg-blue-500 hover:bg-blue-600"
        >
          EVEN
        </Button>
      </div>

      {/* Helper Text */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Hint: Try pairing up the dots!</p>
        <p>Even numbers can be paired perfectly, odd numbers have one left over.</p>
      </div>
    </Card>
  );
}
