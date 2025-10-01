import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameInstance } from "@/types/game";

interface QuickFactsProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function QuickFacts({ instance, onAnswer }: QuickFactsProps) {
  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-card">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Quick Facts! ⚡
        </h2>
        
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-4">
            {instance.question.expression}
          </div>
          <p className="text-xl text-muted-foreground">
            What's the answer?
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {instance.options?.map((option) => (
            <Button
              key={option}
              onClick={() => onAnswer(option)}
              size="lg"
              variant="secondary"
              className="text-3xl font-bold h-20 hover:scale-110 transition-transform"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
