import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Lightbulb, RotateCcw } from "lucide-react";

interface SpellingBeeProps {
  instance: GameInstance;
  onAnswer: (answer: string) => void;
}

export function SpellingBee({ instance, onAnswer }: SpellingBeeProps) {
  const { audio, hint, letters, wordLength } = instance.question;
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(letters);

  const currentWord = selectedLetters.map((index) => letters[index]).join("");

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) return;
    setSelectedLetters([...selectedLetters, index]);
  };

  const handleRemoveLast = () => {
    setSelectedLetters(selectedLetters.slice(0, -1));
  };

  const handleReset = () => {
    setSelectedLetters([]);
  };

  const handleSubmit = () => {
    onAnswer(currentWord);
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Volume2 className="h-10 w-10 text-yellow-500" />
          <h2 className="text-3xl font-bold text-foreground">Spelling Bee!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Spell the word correctly
        </p>
      </div>

      {/* Word Info */}
      <div className="max-w-lg mx-auto space-y-4">
        {/* Phonetic breakdown */}
        <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Volume2 className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              Listen carefully:
            </span>
          </div>
          <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
            {audio}
          </p>
        </div>

        {/* Hint */}
        <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              Hint:
            </span>
          </div>
          <p className="text-lg text-blue-900 dark:text-blue-100">{hint}</p>
        </div>
      </div>

      {/* Current Word Display */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 min-h-20 p-4 bg-secondary/20 rounded-2xl border-2 border-primary/30">
          {selectedLetters.length === 0 ? (
            <p className="text-muted-foreground italic">Click letters to spell...</p>
          ) : (
            selectedLetters.map((letterIndex, i) => (
              <div
                key={i}
                className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-2xl font-bold shadow-lg animate-in zoom-in"
              >
                {letters[letterIndex].toUpperCase()}
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {currentWord.length} of {wordLength} letters
        </div>
      </div>

      {/* Available Letters */}
      <div className="max-w-lg mx-auto">
        <p className="text-center text-sm font-semibold mb-3 text-muted-foreground">
          Available Letters:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {letters.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(index)}
              disabled={selectedLetters.includes(index)}
              className={`
                w-14 h-14 rounded-lg text-2xl font-bold uppercase transition-all
                ${
                  selectedLetters.includes(index)
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-white dark:bg-gray-800 border-2 border-primary/50 hover:border-primary hover:scale-110 shadow-md hover:shadow-lg"
                }
              `}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleRemoveLast}
          variant="outline"
          size="lg"
          disabled={selectedLetters.length === 0}
        >
          Remove Last
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={currentWord.length !== wordLength}
          className="px-8"
        >
          Submit Spelling
        </Button>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Use all the right letters to spell the word!</p>
      </div>
    </Card>
  );
}
