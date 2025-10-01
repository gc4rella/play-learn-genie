import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameInstance } from "@/types/game";

interface TapToCountProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function TapToCount({ instance, onAnswer }: TapToCountProps) {
  const count = instance.question.count;
  
  // Generate random emoji animals
  const animals = ["🐶", "🐱", "🐰", "🐻", "🐼", "🐨", "🦁", "🐯"];
  const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
  
  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-card">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Count the Animals!
        </h2>
        
        {/* Display objects to count */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 min-h-[200px] items-center">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="text-6xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {selectedAnimal}
            </div>
          ))}
        </div>

        <p className="text-center text-xl font-semibold text-muted-foreground mb-6">
          How many {selectedAnimal} do you see?
        </p>

        {/* Answer options */}
        <div className="flex gap-4 justify-center flex-wrap">
          {instance.options?.map((option) => (
            <Button
              key={option}
              onClick={() => onAnswer(option)}
              size="lg"
              variant="default"
              className="text-3xl font-bold min-w-[100px] h-20"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
