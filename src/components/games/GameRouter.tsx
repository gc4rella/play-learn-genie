import { useState, useEffect } from "react";
import { GameInstance } from "@/types/game";
import { TapToCount } from "./TapToCount";
import { QuickFacts } from "./QuickFacts";
import { MiniSudoku } from "./MiniSudoku";
import { MentalMath } from "./MentalMath";
import { NumberLine } from "./NumberLine";
import { MemoryPairs } from "./MemoryPairs";
import { OddOrEven } from "./OddOrEven";
import { EquationFix } from "./EquationFix";
import { PatternRule } from "./PatternRule";
import { VisualFractions } from "./VisualFractions";
import { WordBuilder } from "./WordBuilder";
import { ColorMix } from "./ColorMix";
import { AnimalMatch } from "./AnimalMatch";
import { MazeRunner } from "./MazeRunner";
import { ClockMaster } from "./ClockMaster";
import { MoneyCounter } from "./MoneyCounter";
import { SpellingBee } from "./SpellingBee";
import { SymmetryMirror } from "./SymmetryMirror";
import { ShapeSorter } from "./ShapeSorter";
import { ColorMatch } from "./ColorMatch";
import { BigOrSmall } from "./BigOrSmall";
import { SoundMatch } from "./SoundMatch";
import { DecimalPlace } from "./DecimalPlace";
import { FactorFinder } from "./FactorFinder";
import { WordMath } from "./WordMath";
import { PrimeTime } from "./PrimeTime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trophy, Star } from "lucide-react";

interface GameRouterProps {
  instance: GameInstance;
  onComplete: (isCorrect?: boolean) => void;
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
    onComplete(isCorrect ?? false);
  };

  if (showResult) {
    return (
      <Card className="p-6 sm:p-12 bg-gradient-card text-center space-y-4 sm:space-y-6">
        {isCorrect ? (
          <>
            <div className="flex justify-center">
              <Trophy className="h-16 w-16 sm:h-24 sm:w-24 text-accent animate-bounce" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Excellent Work! 🎉
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              You got it right!
            </p>
            <div className="flex gap-1 sm:gap-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 sm:h-8 sm:w-8 fill-accent text-accent" />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">💪</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Keep Trying!
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Practice makes perfect!
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-3 sm:pt-4 max-w-md mx-auto">
          <Button onClick={handleContinue} size="lg" variant="default" className="w-full sm:w-auto touch-manipulation">
            Next Challenge
          </Button>
          <Button onClick={onExit} size="lg" variant="outline" className="w-full sm:w-auto touch-manipulation">
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

    case "number-line":
      return <NumberLine instance={instance} onAnswer={handleAnswer} />;

    case "memory-pairs":
      return <MemoryPairs instance={instance} onAnswer={handleAnswer} />;

    case "odd-even":
      return <OddOrEven instance={instance} onAnswer={handleAnswer} />;

    case "equation-fix":
      return <EquationFix instance={instance} onAnswer={handleAnswer} />;

    case "pattern-rule":
      return <PatternRule instance={instance} onAnswer={handleAnswer} />;

    case "visual-fractions":
      return <VisualFractions instance={instance} onAnswer={handleAnswer} />;

    case "word-builder":
      return <WordBuilder instance={instance} onAnswer={handleAnswer} />;

    case "color-mix":
      return <ColorMix instance={instance} onAnswer={handleAnswer} />;

    case "animal-match":
      return <AnimalMatch instance={instance} onAnswer={handleAnswer} />;

    case "maze-runner":
      return <MazeRunner instance={instance} onAnswer={handleAnswer} />;

    case "clock-master":
      return <ClockMaster instance={instance} onAnswer={handleAnswer} />;

    case "money-counter":
      return <MoneyCounter instance={instance} onAnswer={handleAnswer} />;

    case "spelling-bee":
      return <SpellingBee instance={instance} onAnswer={handleAnswer} />;

    case "symmetry-mirror":
      return <SymmetryMirror instance={instance} onAnswer={handleAnswer} />;

    case "shape-sorter":
      return <ShapeSorter instance={instance} onAnswer={handleAnswer} />;

    case "color-match":
      return <ColorMatch instance={instance} onAnswer={handleAnswer} />;

    case "big-or-small":
      return <BigOrSmall instance={instance} onAnswer={handleAnswer} />;

    case "sound-match":
      return <SoundMatch instance={instance} onAnswer={handleAnswer} />;

    case "decimal-place":
      return <DecimalPlace instance={instance} onAnswer={handleAnswer} />;

    case "factor-finder":
      return <FactorFinder instance={instance} onAnswer={handleAnswer} />;

    case "word-math":
      return <WordMath instance={instance} onAnswer={handleAnswer} />;

    case "prime-time":
      return <PrimeTime instance={instance} onAnswer={handleAnswer} />;

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
