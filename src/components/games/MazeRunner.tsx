import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Star } from "lucide-react";

interface MazeRunnerProps {
  instance: GameInstance;
  onAnswer: (answer: any) => void;
}

export function MazeRunner({ instance, onAnswer }: MazeRunnerProps) {
  const { maze, size } = instance.question;
  const correctPath: number[][] = instance.correctAnswer;
  const [userPath, setUserPath] = useState<number[][]>([[0, 0]]);
  const [currentPos, setCurrentPos] = useState<[number, number]>([0, 0]);

  const handleCellClick = (row: number, col: number) => {
    // Check if this cell is adjacent to current position
    const [currentRow, currentCol] = currentPos;
    const isAdjacent =
      (Math.abs(row - currentRow) === 1 && col === currentCol) ||
      (Math.abs(col - currentCol) === 1 && row === currentRow);

    if (!isAdjacent) return;

    // Check if this cell is a valid path cell
    if (maze[row][col] !== 1) return;

    // Check if already in path
    const alreadyInPath = userPath.some((pos) => pos[0] === row && pos[1] === col);
    if (alreadyInPath) return;

    const newPath = [...userPath, [row, col]];
    setUserPath(newPath);
    setCurrentPos([row, col]);

    // Check if reached the end
    if (row === size - 1 && col === size - 1) {
      // Completed the maze!
      setTimeout(() => {
        onAnswer(newPath);
      }, 500);
    }
  };

  const handleReset = () => {
    setUserPath([[0, 0]]);
    setCurrentPos([0, 0]);
  };

  const isInUserPath = (row: number, col: number) => {
    return userPath.some((pos) => pos[0] === row && pos[1] === col);
  };

  const isCurrent = (row: number, col: number) => {
    return currentPos[0] === row && currentPos[1] === col;
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Maze Runner!</h2>
        <p className="text-lg text-muted-foreground">
          Find the path from start to finish!
        </p>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-green-500" />
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Finish</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Click on the light squares next to your position to move!
        </p>
      </div>

      {/* Maze Grid */}
      <div className="max-w-md mx-auto">
        <div className="inline-block p-4 bg-secondary/20 rounded-2xl">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {maze.map((row: number[], rowIndex: number) =>
              row.map((cell: number, colIndex: number) => {
                const isPath = cell === 1;
                const inPath = isInUserPath(rowIndex, colIndex);
                const current = isCurrent(rowIndex, colIndex);
                const isStart = rowIndex === 0 && colIndex === 0;
                const isEnd = rowIndex === size - 1 && colIndex === size - 1;

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={!isPath}
                    className={`
                      w-16 h-16 rounded-lg border-2 transition-all duration-200
                      ${!isPath ? "bg-gray-700 border-gray-600 cursor-not-allowed" : ""}
                      ${isPath && !inPath ? "bg-gray-200 border-gray-300 hover:bg-gray-300" : ""}
                      ${inPath && !current ? "bg-blue-400 border-blue-500" : ""}
                      ${current ? "bg-blue-500 border-blue-600 scale-110 shadow-lg" : ""}
                    `}
                  >
                    {isStart && <Flag className="h-6 w-6 mx-auto text-green-500" />}
                    {isEnd && <Star className="h-6 w-6 mx-auto text-yellow-500" />}
                    {current && !isStart && !isEnd && (
                      <div className="w-4 h-4 bg-white rounded-full mx-auto animate-pulse" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <Button onClick={handleReset} variant="outline" size="lg">
          Start Over
        </Button>
      </div>

      {/* Progress */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Steps taken: {userPath.length - 1}</p>
      </div>
    </Card>
  );
}
