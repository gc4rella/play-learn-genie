import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";

interface SymmetryMirrorProps {
  instance: GameInstance;
  onAnswer: (answer: number[][]) => void;
}

export function SymmetryMirror({ instance, onAnswer }: SymmetryMirrorProps) {
  const { grid, size } = instance.question;

  // Initialize user grid with the left half pre-filled
  const [userGrid, setUserGrid] = useState<number[][]>(
    grid.map((row: number[]) => [...row])
  );

  const handleCellClick = (row: number, col: number) => {
    // Only allow editing the right half
    if (col < Math.floor(size / 2)) return;

    const newGrid = userGrid.map((r) => [...r]);
    newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1;
    setUserGrid(newGrid);
  };

  const handleReset = () => {
    setUserGrid(grid.map((row: number[]) => [...row]));
  };

  const handleSubmit = () => {
    onAnswer(userGrid);
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="h-10 w-10 text-purple-500" />
          <h2 className="text-3xl font-bold text-foreground">Symmetry Mirror!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Complete the mirror image
        </p>
      </div>

      {/* Instructions */}
      <div className="text-center max-w-lg mx-auto">
        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl border-2 border-purple-300 dark:border-purple-700">
          <p className="text-purple-900 dark:text-purple-100">
            Mirror the pattern on the left side to the right side!
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
            The left side is locked. Click squares on the right to fill them in.
          </p>
        </div>
      </div>

      {/* Grid Display */}
      <div className="max-w-md mx-auto">
        <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mx-auto">
          {/* Mirror line indicator */}
          <div className="relative">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
            >
              {userGrid.map((row: number[], rowIndex: number) =>
                row.map((cell: number, colIndex: number) => {
                  const isLeftHalf = colIndex < Math.floor(size / 2);
                  const isFilled = cell === 1;

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      disabled={isLeftHalf}
                      className={`
                        w-20 h-20 rounded-lg border-4 transition-all duration-200
                        ${isLeftHalf ? "cursor-not-allowed" : "hover:scale-105"}
                        ${
                          isFilled
                            ? isLeftHalf
                              ? "bg-blue-500 border-blue-600"
                              : "bg-purple-500 border-purple-600 shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        }
                        ${!isLeftHalf && !isFilled ? "hover:bg-purple-200 dark:hover:bg-purple-900" : ""}
                      `}
                    />
                  );
                })
              )}
            </div>

            {/* Mirror line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-400 shadow-lg"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Side labels */}
          <div className="flex justify-between mt-4 px-4">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              ← Given Pattern
            </div>
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Your Mirror →
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Check Mirror
        </Button>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Think about what you see when you look in a mirror!</p>
      </div>
    </Card>
  );
}
