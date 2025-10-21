import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface DecimalPlaceProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function DecimalPlace({ instance, onAnswer }: DecimalPlaceProps) {
  const { decimal, min, max } = instance.question;
  const options: number[] = instance.options;
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  // Calculate position on number line (0-100%)
  const getPosition = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const targetPosition = getPosition(decimal);

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Target className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Decimal Place!</h2>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground">
          Where does this decimal belong on the number line?
        </p>
      </div>

      {/* Target Decimal */}
      <div className="text-center">
        <div className="inline-block px-6 py-4 sm:px-10 sm:py-6 bg-primary text-primary-foreground rounded-2xl shadow-lg">
          <p className="text-4xl sm:text-6xl font-bold font-mono">{decimal}</p>
        </div>
      </div>

      {/* Number Line */}
      <div className="max-w-4xl mx-auto">
        <div className="relative py-8">
          {/* Line */}
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-full relative">
            {/* Answer indicator (shown after selection) */}
            {selectedPosition !== null && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg transition-all"
                style={{ left: `${getPosition(selectedPosition)}%`, transform: "translate(-50%, -50%)" }}
              />
            )}
          </div>

          {/* Number markers */}
          <div className="flex justify-between mt-2">
            {Array.from({ length: 11 }, (_, i) => {
              const value = min + (i / 10) * (max - min);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-400" />
                  <span className="text-sm font-mono mt-1">{value.toFixed(1)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-lg font-semibold">
          Where should {decimal} be placed on the number line?
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => {
              setSelectedPosition(option);
              onAnswer(option);
            }}
            variant={selectedPosition === option ? "default" : "outline"}
            size="lg"
            className="h-14 sm:h-16 text-lg sm:text-xl font-bold font-mono touch-manipulation"
          >
            {option.toFixed(1)}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Look at the tenths place to help you decide!</p>
      </div>
    </Card>
  );
}
