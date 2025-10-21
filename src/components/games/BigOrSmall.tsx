import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Maximize, Minimize } from "lucide-react";

interface BigOrSmallProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function BigOrSmall({ instance, onAnswer }: BigOrSmallProps) {
  const { item1, item2, emoji1, emoji2, askFor } = instance.question;

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {askFor === "big" ? (
            <Maximize className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          ) : (
            <Minimize className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Big or Small!</h2>
        </div>
        <p className="text-xl sm:text-2xl text-muted-foreground">
          Which one is {askFor === "big" ? "BIGGER" : "SMALLER"}?
        </p>
      </div>

      {/* Question Display */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center p-6 sm:p-8 bg-primary/10 rounded-3xl border-4 border-primary/30">
          <p className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Which is {askFor === "big" ? "BIGGER" : "SMALLER"}?
          </p>
          {askFor === "big" ? (
            <Maximize className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary animate-pulse" />
          ) : (
            <Minimize className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-accent animate-pulse" />
          )}
        </div>
      </div>

      {/* Item Options */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
        <button
          onClick={() => onAnswer(item1)}
          className="group p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-3xl border-4 border-gray-300 dark:border-gray-600 hover:border-primary hover:scale-105 active:scale-95 transition-all shadow-lg touch-manipulation"
        >
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="text-6xl sm:text-8xl">{emoji1}</div>
            <p className="text-2xl sm:text-3xl font-bold capitalize group-hover:text-primary transition-colors">
              {item1}
            </p>
          </div>
        </button>

        <button
          onClick={() => onAnswer(item2)}
          className="group p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-3xl border-4 border-gray-300 dark:border-gray-600 hover:border-primary hover:scale-105 active:scale-95 transition-all shadow-lg touch-manipulation"
        >
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="text-6xl sm:text-8xl">{emoji2}</div>
            <p className="text-2xl sm:text-3xl font-bold capitalize group-hover:text-primary transition-colors">
              {item2}
            </p>
          </div>
        </button>
      </div>

      {/* Hint */}
      <div className="text-center text-lg text-muted-foreground">
        <p>Think about which one is {askFor === "big" ? "bigger" : "smaller"} in real life!</p>
      </div>
    </Card>
  );
}
