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
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          What Fraction is Shaded?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Look at the shaded parts and pick the correct fraction
        </p>
      </div>

      {/* Visual Fraction Display */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 bg-primary/10 p-4 sm:p-6 rounded-2xl border-2 sm:border-4 border-primary">
          {Array.from({ length: total }, (_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg sm:rounded-xl border-2 sm:border-4 transition-all ${
                index < shaded
                  ? "bg-accent border-accent shadow-lg"
                  : "bg-background border-muted"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {index < shaded && (
                  <span className="text-3xl sm:text-4xl">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
          <span className="font-bold text-accent">{shaded}</span> out of{" "}
          <span className="font-bold text-foreground">{total}</span> parts are shaded
        </p>
      </div>

      {/* Additional Visual: Circle/Pie Chart */}
      <div className="flex justify-center">
        <svg width="160" height="160" viewBox="0 0 200 200" className="transform -rotate-90 sm:w-[200px] sm:h-[200px]">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            size="lg"
            className="text-2xl sm:text-3xl py-8 sm:py-10 hover:scale-105 active:scale-95 transition-transform touch-manipulation"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-1">
        <p>Remember: The top number is how many parts are shaded</p>
        <p>The bottom number is the total number of parts</p>
      </div>
    </Card>
  );
}
