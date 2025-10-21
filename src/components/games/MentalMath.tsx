import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameInstance } from "@/types/game";
import { Brain } from "lucide-react";

interface MentalMathProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

export function MentalMath({ instance, onAnswer }: MentalMathProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="p-4 sm:p-8 bg-gradient-card">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Mental Math Challenge
          </h2>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <div className="text-3xl sm:text-5xl font-bold text-primary mb-4 sm:mb-6 p-4 sm:p-6 bg-muted rounded-xl">
            {instance.question.expression}
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Solve this multi-step problem!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
          {instance.options?.map((option) => (
            <Button
              key={option}
              onClick={() => onAnswer(option)}
              size="lg"
              variant="default"
              className="text-2xl sm:text-3xl font-bold h-16 sm:h-20 hover:scale-105 active:scale-95 transition-transform touch-manipulation"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
