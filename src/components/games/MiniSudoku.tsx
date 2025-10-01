import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameInstance } from "@/types/game";

interface MiniSudokuProps {
  instance: GameInstance;
  onComplete: (grid: number[][]) => void;
}

export function MiniSudoku({ instance, onComplete }: MiniSudokuProps) {
  const initialPuzzle = instance.question.puzzle;
  const [grid, setGrid] = useState<number[][]>(
    initialPuzzle.map((row: number[]) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (initialPuzzle[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const newGrid = grid.map(row => [...row]);
      newGrid[selectedCell.row][selectedCell.col] = num;
      setGrid(newGrid);
    }
  };

  const handleSubmit = () => {
    onComplete(grid);
  };

  const isComplete = grid.every(row => row.every(cell => cell !== 0));

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-card">
        <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
          Mini Sudoku 4×4
        </h2>
        
        <p className="text-center text-lg text-muted-foreground mb-6">
          Fill each row and column with 1-4!
        </p>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-6">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isFixed = initialPuzzle[rowIndex][colIndex] !== 0;
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    aspect-square flex items-center justify-center
                    text-2xl font-bold rounded-lg border-2 transition-all
                    ${isFixed 
                      ? "bg-muted text-foreground border-border cursor-not-allowed" 
                      : "bg-background hover:bg-muted border-primary cursor-pointer"
                    }
                    ${isSelected ? "ring-4 ring-primary scale-110" : ""}
                  `}
                  disabled={isFixed}
                >
                  {cell !== 0 ? cell : ""}
                </button>
              );
            })
          )}
        </div>

        {/* Number picker */}
        {selectedCell && (
          <div className="flex gap-2 justify-center mb-6">
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num)}
                variant="accent"
                size="lg"
                className="text-2xl font-bold w-16 h-16"
              >
                {num}
              </Button>
            ))}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          variant="default"
          size="lg"
          className="w-full"
        >
          Check Solution
        </Button>
      </Card>
    </div>
  );
}
