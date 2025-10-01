import { useState, useEffect } from "react";
import { GameInstance } from "@/types/game";
import { TapToCount } from "./TapToCount";
import { QuickFacts } from "./QuickFacts";
import { MiniSudoku } from "./MiniSudoku";
import { MentalMath } from "./MentalMath";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trophy, Star } from "lucide-react";

interface GameRouterProps {
  instance: GameInstance;
  onComplete: () => void;
  onExit: () => void;
}

export function GameRouter({ instance, onComplete, onExit }: GameRouterProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsCorrect(null);
    setShowResult(false);
  }, [instance]);

  const handleAnswer = (answer: any) => {
    const correct = JSON.stringify(answer) === JSON.stringify(instance.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      toast.success("Amazing! That's correct! 🌟", {
        description: "You're doing great!",
      });
    } else {
      toast.error("Not quite! Try again! 💪", {
        description: "Keep practicing!",
      });
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  if (showResult) {
    return (
      <Card className="p-12 bg-gradient-card text-center space-y-6">
        {isCorrect ? (
          <>
            <div className="flex justify-center">
              <Trophy className="h-24 w-24 text-accent animate-bounce" />
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              Excellent Work! 🎉
            </h2>
            <p className="text-2xl text-muted-foreground">
              You got it right!
            </p>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-accent text-accent" />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">💪</div>
            <h2 className="text-4xl font-bold text-foreground">
              Keep Trying!
            </h2>
            <p className="text-2xl text-muted-foreground">
              Practice makes perfect!
            </p>
          </>
        )}

        <div className="flex gap-4 justify-center pt-4">
          <Button onClick={handleContinue} size="lg" variant="default">
            Next Challenge
          </Button>
          <Button onClick={onExit} size="lg" variant="outline">
            Back to Games
          </Button>
        </div>
      </Card>
    );
  }

  // Route to appropriate game component
  switch (instance.type) {
    case "tap-to-count":
      return <TapToCount instance={instance} onAnswer={handleAnswer} />;
    
    case "quick-facts":
      return <QuickFacts instance={instance} onAnswer={handleAnswer} />;
    
    case "mini-sudoku":
      return <MiniSudoku instance={instance} onComplete={handleAnswer} />;
    
    case "mental-math":
      return <MentalMath instance={instance} onAnswer={handleAnswer} />;
    
    default:
      return (
        <Card className="p-8 text-center">
          <p className="text-xl text-muted-foreground mb-4">
            This game is coming soon! 🚀
          </p>
          <Button onClick={onExit} variant="default">
            Back to Games
          </Button>
        </Card>
      );
  }
}
