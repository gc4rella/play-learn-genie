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
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          What Comes Next?
        </h2>
        <p className="text-lg text-muted-foreground">
          Find the pattern and continue the sequence
        </p>
      </div>

      {/* Sequence Display */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {sequence.map((num: number, index: number) => (
          <div key={index} className="flex items-center gap-4">
            <div className="bg-accent/20 border-4 border-accent rounded-2xl px-8 py-6 min-w-[100px] text-center">
              <span className="text-5xl font-bold text-accent">{num}</span>
            </div>
            {index < sequence.length - 1 && (
              <span className="text-4xl text-muted-foreground">→</span>
            )}
          </div>
        ))}
        <span className="text-4xl text-muted-foreground">→</span>
        <div className="bg-primary/10 border-4 border-dashed border-primary rounded-2xl px-8 py-6 min-w-[100px] text-center">
          <span className="text-5xl font-bold text-primary">?</span>
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
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            size="lg"
            className="text-4xl py-12 hover:scale-105 transition-transform"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Hint: Look at how much each number increases by!</p>
      </div>
    </Card>
  );
}
