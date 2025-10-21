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
    <Card className="p-4 sm:p-8 bg-gradient-card space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Build the Word!
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {hint}
        </p>
        <p className="text-sm text-muted-foreground">
          Word has {wordLength} letters
        </p>
      </div>

      {/* Word Building Area */}
      <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
        {/* Selected Letters */}
        <div className="bg-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-primary min-h-[80px] sm:min-h-[100px]">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {selectedLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleRemoveLetter(index)}
                className="relative bg-accent text-accent-foreground w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl text-2xl sm:text-3xl font-bold hover:bg-accent/80 active:scale-95 transition-all shadow-lg group touch-manipulation"
              >
                {letter}
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3 text-white" />
                </span>
              </button>
            ))}
            {selectedLetters.length === 0 && (
              <p className="text-muted-foreground text-xs sm:text-sm">
                Click letters below to build your word
              </p>
            )}
          </div>
        </div>

        {/* Available Letters */}
        <div>
          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            Available Letters:
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {availableLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter, index)}
                className="bg-background border-2 border-primary w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl text-xl sm:text-2xl font-bold hover:bg-primary hover:text-primary-foreground transition-all shadow-md hover:scale-105 active:scale-95 touch-manipulation"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          disabled={selectedLetters.length === 0}
          className="w-full sm:w-auto touch-manipulation"
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={selectedLetters.length !== wordLength}
          className="text-lg sm:text-xl px-8 sm:px-12 w-full sm:w-auto touch-manipulation"
        >
          Submit Word
        </Button>
      </div>
    </Card>
  );
}
