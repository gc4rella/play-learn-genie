import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface WordBuilderProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function WordBuilder({ instance, onAnswer }: WordBuilderProps) {
  const { letters, hint, wordLength } = instance.question;
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(letters);

  const handleLetterClick = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter]);
    setAvailableLetters(availableLetters.filter((_, i) => i !== index));
  };

  const handleRemoveLetter = (index: number) => {
    const letter = selectedLetters[index];
    setAvailableLetters([...availableLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const word = selectedLetters.join("");
    onAnswer(word);
  };

  const handleReset = () => {
    setSelectedLetters([]);
    setAvailableLetters(letters);
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Build the Word!
        </h2>
        <p className="text-lg text-muted-foreground">
          {hint}
        </p>
        <p className="text-sm text-muted-foreground">
          Word has {wordLength} letters
        </p>
      </div>

      {/* Word Building Area */}
      <div className="max-w-md mx-auto space-y-6">
        {/* Selected Letters */}
        <div className="bg-primary/10 rounded-2xl p-6 border-4 border-primary min-h-[100px]">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {selectedLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleRemoveLetter(index)}
                className="relative bg-accent text-accent-foreground w-16 h-16 rounded-xl text-3xl font-bold hover:bg-accent/80 transition-all shadow-lg group"
              >
                {letter}
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3 text-white" />
                </span>
              </button>
            ))}
            {selectedLetters.length === 0 && (
              <p className="text-muted-foreground text-sm">
                Click letters below to build your word
              </p>
            )}
          </div>
        </div>

        {/* Available Letters */}
        <div>
          <p className="text-center text-sm text-muted-foreground mb-3">
            Available Letters:
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {availableLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter, index)}
                className="bg-background border-2 border-primary w-14 h-14 rounded-xl text-2xl font-bold hover:bg-primary hover:text-primary-foreground transition-all shadow-md hover:scale-110"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          disabled={selectedLetters.length === 0}
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={selectedLetters.length !== wordLength}
          className="text-xl px-12"
        >
          Submit Word
        </Button>
      </div>
    </Card>
  );
}
