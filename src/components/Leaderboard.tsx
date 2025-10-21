import { useState, useEffect } from "react";
import { MINI_GAMES } from "@/games/registry";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Leaderboard() {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load all high scores from localStorage
    const allScores: Record<string, number> = {};
    MINI_GAMES.forEach((game) => {
      const score = localStorage.getItem(`best-score-${game.id}`);
      if (score) {
        allScores[game.id] = parseInt(score);
      }
    });
    setScores(allScores);
  }, []);

  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10); // Top 10

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />;
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>;
  };

  const getGameName = (gameId: string) => {
    const game = MINI_GAMES.find((g) => g.id === gameId);
    return game?.name || gameId;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            High Scores
          </DialogTitle>
        </DialogHeader>

        {sortedScores.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              No high scores yet!
            </p>
            <p className="text-sm text-muted-foreground">
              Play games in Race Mode to set your first record!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedScores.map(([gameId, score], index) => (
              <Card
                key={gameId}
                className={`p-4 transition-all hover:scale-[1.02] ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500"
                    : index === 1
                    ? "bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-400"
                    : index === 2
                    ? "bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600"
                    : "bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 flex justify-center">
                      {getMedalIcon(index)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{getGameName(gameId)}</h3>
                      <p className="text-sm text-muted-foreground">Race Mode</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-accent">{score}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Score is based on speed and accuracy!</p>
          <p>Keep playing in Race Mode to improve your records!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
