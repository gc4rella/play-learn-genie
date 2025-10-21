import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";

interface ShapeSorterProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function ShapeSorter({ instance, onAnswer }: ShapeSorterProps) {
  const { targetShape, targetColor } = instance.question;
  const options: string[] = instance.options;

  const renderShape = (shape: string, color: string, size: number = 120) => {
    const commonProps = {
      fill: color,
      className: "drop-shadow-2xl",
    };

    switch (shape) {
      case "circle":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" {...commonProps} />
          </svg>
        );
      case "square":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="5" y="5" width="90" height="90" {...commonProps} />
          </svg>
        );
      case "triangle":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,5 95,95 5,95" {...commonProps} />
          </svg>
        );
      case "star":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 61,35 92,35 67,55 78,85 50,65 22,85 33,55 8,35 39,35"
              {...commonProps}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Shape Sorter!</h2>
        <p className="text-2xl text-muted-foreground">
          Find the matching shape!
        </p>
      </div>

      {/* Target Shape */}
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Match this shape:</p>
          <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-3xl border-8 border-primary/30 shadow-2xl">
            {renderShape(targetShape, targetColor, 160)}
          </div>
        </div>
      </div>

      {/* Shape Options */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        {options.map((shape) => (
          <button
            key={shape}
            onClick={() => onAnswer(shape)}
            className="group p-8 bg-white dark:bg-gray-800 rounded-3xl border-4 border-gray-300 dark:border-gray-600 hover:border-primary hover:scale-110 transition-all shadow-lg"
          >
            <div className="flex items-center justify-center">
              {renderShape(shape, "#6B7280", 120)}
            </div>
            <p className="mt-4 text-xl font-bold capitalize text-center group-hover:text-primary transition-colors">
              {shape}
            </p>
          </button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-lg text-muted-foreground">
        <p>Look at the shape carefully!</p>
      </div>
    </Card>
  );
}
