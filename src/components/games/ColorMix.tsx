import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ColorMixProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

const colorMap: Record<string, string> = {
  red: "#EF4444",
  blue: "#3B82F6",
  yellow: "#EAB308",
  purple: "#A855F7",
  orange: "#F97316",
  green: "#22C55E",
  pink: "#EC4899",
  gray: "#6B7280",
  white: "#FFFFFF",
  black: "#000000",
  brown: "#92400E",
};

export function ColorMix({ instance, onAnswer }: ColorMixProps) {
  const { color1, color2 } = instance.question;
  const options: string[] = instance.options;
  const [showMixing, setShowMixing] = useState(false);

  const handleMixColors = () => {
    setShowMixing(true);
    setTimeout(() => setShowMixing(false), 2000);
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Color Mix Lab!
        </h2>
        <p className="text-lg text-muted-foreground">
          What color do you get when you mix these colors?
        </p>
      </div>

      {/* Color Mixing Display */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-6">
          {/* First Color */}
          <div className="text-center space-y-3">
            <div
              className="w-32 h-32 rounded-full border-8 border-white shadow-2xl"
              style={{ backgroundColor: colorMap[color1] }}
            />
            <p className="text-xl font-bold capitalize">{color1}</p>
          </div>

          {/* Plus Sign */}
          <div className="flex items-center justify-center">
            <Plus className="h-12 w-12 text-foreground" />
          </div>

          {/* Second Color */}
          <div className="text-center space-y-3">
            <div
              className="w-32 h-32 rounded-full border-8 border-white shadow-2xl"
              style={{ backgroundColor: colorMap[color2] }}
            />
            <p className="text-xl font-bold capitalize">{color2}</p>
          </div>

          {/* Equals Sign */}
          <div className="text-5xl font-bold text-foreground">=</div>

          {/* Result (Animated) */}
          <div className="text-center space-y-3">
            <button
              onClick={handleMixColors}
              className={`w-32 h-32 rounded-full border-8 border-white shadow-2xl transition-all duration-500 ${
                showMixing ? "animate-pulse scale-110" : ""
              }`}
              style={{
                background: showMixing
                  ? `linear-gradient(135deg, ${colorMap[color1]}, ${colorMap[color2]})`
                  : "#94A3B8",
              }}
            >
              <span className="text-4xl">?</span>
            </button>
            <p className="text-sm text-muted-foreground">
              {!showMixing && "Click to mix!"}
            </p>
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="text-center">
        <p className="text-lg text-muted-foreground">
          Choose the color you think you'll get:
        </p>
      </div>

      {/* Color Options */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => onAnswer(color)}
            className="group relative"
          >
            <div
              className="w-full aspect-square rounded-2xl border-4 border-primary/30 group-hover:border-primary group-hover:scale-110 transition-all shadow-lg"
              style={{ backgroundColor: colorMap[color] }}
            />
            <p className="mt-2 text-lg font-bold capitalize group-hover:text-accent transition-colors">
              {color}
            </p>
          </button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Tip: Think about what happens when you mix paints!</p>
      </div>
    </Card>
  );
}
