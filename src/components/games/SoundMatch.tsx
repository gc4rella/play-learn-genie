import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

interface SoundMatchProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function SoundMatch({ instance, onAnswer }: SoundMatchProps) {
  const { sound, emoji } = instance.question;
  const options: string[] = instance.options;

  const animalEmojis: Record<string, string> = {
    dog: "🐕",
    cat: "🐈",
    cow: "🐄",
    duck: "🦆",
  };

  return (
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Volume2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Sound Match!</h2>
        </div>
        <p className="text-xl sm:text-2xl text-muted-foreground">
          What animal makes this sound?
        </p>
      </div>

      {/* Sound Display */}
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-block p-6 sm:p-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-3xl border-4 sm:border-8 border-yellow-300 dark:border-yellow-700 shadow-2xl">
            <Volume2 className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-yellow-600 animate-pulse" />
            <p className="text-4xl sm:text-6xl font-bold text-yellow-900 dark:text-yellow-100">
              "{sound}!"
            </p>
          </div>
          <p className="text-xl sm:text-2xl font-bold">Which animal says this?</p>
        </div>
      </div>

      {/* Animal Options */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {options.map((animal) => (
          <button
            key={animal}
            onClick={() => onAnswer(animal)}
            className="group p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl border-4 border-gray-300 dark:border-gray-600 hover:border-primary hover:scale-105 active:scale-95 transition-all shadow-lg touch-manipulation"
          >
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-5xl sm:text-7xl">{animalEmojis[animal]}</div>
              <p className="text-xl sm:text-2xl font-bold capitalize group-hover:text-primary transition-colors">
                {animal}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-lg text-muted-foreground">
        <p>Listen to the sound and pick the right animal!</p>
      </div>
    </Card>
  );
}
