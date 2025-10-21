import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NumberLineProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function NumberLine({ instance, onAnswer }: NumberLineProps) {
  const { target, max } = instance.question;
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedPosition !== null) {
      onAnswer(selectedPosition);
    }
  };

  // Create clickable number line segments
  const segments = [];
  for (let i = 0; i <= max; i += 5) {
    segments.push(i);
  }

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Where does {target} go?
        </h2>
        <p className="text-lg text-muted-foreground">
          Click on the number line to place your answer
        </p>
      </div>

      {/* Number Line */}
      <div className="relative px-8">
        {/* Line */}
        <div className="absolute top-1/2 left-8 right-8 h-2 bg-primary/20 rounded-full" />

        {/* Markers and Labels */}
        <div className="relative flex justify-between items-center">
          {segments.map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className="w-1 h-8 bg-primary mb-2" />
              <span className="text-xl font-bold text-foreground">{num}</span>
            </div>
          ))}
        </div>

        {/* Clickable positions */}
        <div className="relative flex justify-between mt-8 gap-1">
          {Array.from({ length: max + 1 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => setSelectedPosition(num)}
              className={`flex-1 h-16 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedPosition === num
                  ? "bg-accent border-accent shadow-lg scale-105"
                  : "bg-background border-primary/30 hover:border-primary"
              }`}
            >
              <div className="text-center">
                <div className={`text-sm font-bold ${
                  selectedPosition === num ? "text-accent-foreground" : "text-foreground"
                }`}>
                  {num}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPosition !== null && (
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">
            You selected: <span className="font-bold text-accent">{selectedPosition}</span>
          </p>
          <Button onClick={handleSubmit} size="lg" className="text-xl px-12">
            Submit Answer
          </Button>
        </div>
      )}
    </Card>
  );
}
