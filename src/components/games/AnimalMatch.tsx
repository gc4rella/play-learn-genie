import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnimalMatchProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

const animalEmojis: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  cow: "🐄",
  duck: "🦆",
  lion: "🦁",
  bird: "🐦",
  frog: "🐸",
  sheep: "🐑",
};

const matchTypePrompts: Record<string, string> = {
  sound: "What sound does this animal make?",
  baby: "What is this animal's baby called?",
  habitat: "Where does this animal live?",
};

export function AnimalMatch({ instance, onAnswer }: AnimalMatchProps) {
  const { animal, matchType } = instance.question;
  const options: string[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Animal Match!</h2>
        <p className="text-lg text-muted-foreground">
          Learn about animals and their world
        </p>
      </div>

      {/* Animal Display */}
      <div className="max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-block p-8 bg-primary/10 rounded-3xl border-4 border-primary/30 shadow-xl">
            <div className="text-9xl animate-bounce">{animalEmojis[animal]}</div>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold capitalize">{animal}</p>
            <p className="text-xl text-muted-foreground">
              {matchTypePrompts[matchType]}
            </p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant="outline"
            className="h-auto py-6 text-xl font-bold capitalize hover:scale-105 transition-transform shadow-lg"
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          {matchType === "sound" && "Think about the noise this animal makes!"}
          {matchType === "baby" && "What do we call a baby version of this animal?"}
          {matchType === "habitat" && "Where would you find this animal?"}
        </p>
      </div>
    </Card>
  );
}
