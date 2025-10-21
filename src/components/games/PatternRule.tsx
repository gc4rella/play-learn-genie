import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PatternRuleProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function PatternRule({ instance, onAnswer }: PatternRuleProps) {
  const { sequence } = instance.question;
  const options: number[] = instance.options;

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          What Comes Next?
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Find the pattern and continue the sequence
        </p>
      </div>

      {/* Sequence Display */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {sequence.map((num: number, index: number) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4">
            <div className="bg-accent/20 border-2 sm:border-4 border-accent rounded-xl sm:rounded-2xl px-4 py-3 sm:px-8 sm:py-6 min-w-[70px] sm:min-w-[100px] text-center">
              <span className="text-3xl sm:text-5xl font-bold text-accent">{num}</span>
            </div>
            {index < sequence.length - 1 && (
              <span className="text-2xl sm:text-4xl text-muted-foreground">→</span>
            )}
          </div>
        ))}
        <span className="text-2xl sm:text-4xl text-muted-foreground">→</span>
        <div className="bg-primary/10 border-2 sm:border-4 border-dashed border-primary rounded-xl sm:rounded-2xl px-4 py-3 sm:px-8 sm:py-6 min-w-[70px] sm:min-w-[100px] text-center">
          <span className="text-3xl sm:text-5xl font-bold text-primary">?</span>
        </div>
      </div>

      {/* Visual Pattern Helper */}
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-3">
          Visual pattern:
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {sequence.map((num: number, index: number) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap gap-1 bg-primary/5 p-2 rounded-lg max-w-[120px]">
                {Array.from({ length: num }, (_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-accent rounded-full"
                  />
                ))}
              </div>
              {index < sequence.length - 1 && (
                <span className="text-xs text-muted-foreground">
                  +{sequence[index + 1] - num}
                </span>
              )}
            </div>
          ))}
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
        <p>Hint: Look at how much each number increases by!</p>
      </div>
    </Card>
  );
}
