import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VisualFractionsProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function VisualFractions({ instance, onAnswer }: VisualFractionsProps) {
  const { shaded, total } = instance.question;
  const options: string[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          What Fraction is Shaded?
        </h2>
        <p className="text-lg text-muted-foreground">
          Look at the shaded parts and pick the correct fraction
        </p>
      </div>

      {/* Visual Fraction Display */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3 bg-primary/10 p-6 rounded-2xl border-4 border-primary">
          {Array.from({ length: total }, (_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-xl border-4 transition-all ${
                index < shaded
                  ? "bg-accent border-accent shadow-lg"
                  : "bg-background border-muted"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {index < shaded && (
                  <span className="text-4xl">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-4 text-muted-foreground">
          <span className="font-bold text-accent">{shaded}</span> out of{" "}
          <span className="font-bold text-foreground">{total}</span> parts are shaded
        </p>
      </div>

      {/* Additional Visual: Circle/Pie Chart */}
      <div className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
            className="text-muted opacity-20"
          />
          {/* Shaded portion */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
            strokeDasharray={`${(shaded / total) * 502} 502`}
            className="text-accent"
          />
        </svg>
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            size="lg"
            className="text-3xl py-10 hover:scale-105 transition-transform"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Remember: The top number is how many parts are shaded</p>
        <p>The bottom number is the total number of parts</p>
      </div>
    </Card>
  );
}
