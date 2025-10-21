import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface ColorMatchProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function ColorMatch({ instance, onAnswer }: ColorMatchProps) {
  const { targetColor, targetHex, emoji } = instance.question;
  const options: string[] = instance.options;

  const colorMap: Record<string, string> = {
    red: "#EF4444",
    blue: "#3B82F6",
    yellow: "#EAB308",
    green: "#22C55E",
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Palette className="h-12 w-12 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Color Match!</h2>
        </div>
        <p className="text-2xl text-muted-foreground">
          What color is this?
        </p>
      </div>

      {/* Target Color Display */}
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-block p-10 bg-white dark:bg-gray-800 rounded-3xl border-8 border-primary/30 shadow-2xl">
            <div
              className="w-40 h-40 rounded-full border-8 border-white shadow-2xl flex items-center justify-center"
              style={{ backgroundColor: targetHex }}
            >
              <div className="text-7xl">{emoji}</div>
            </div>
          </div>
          <p className="text-2xl font-bold">What color is this?</p>
        </div>
      </div>

      {/* Color Options */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => onAnswer(color)}
            className="group relative p-6 bg-white dark:bg-gray-800 rounded-3xl border-4 border-gray-300 dark:border-gray-600 hover:border-primary hover:scale-110 transition-all shadow-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                style={{ backgroundColor: colorMap[color] }}
              />
              <p className="text-2xl font-bold capitalize group-hover:text-primary transition-colors">
                {color}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-lg text-muted-foreground">
        <p>Pick the color that matches!</p>
      </div>
    </Card>
  );
}
