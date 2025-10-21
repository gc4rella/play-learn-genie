import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MINI_GAMES } from "@/games/registry";
import { GameRouter } from "@/components/games/GameRouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Timer, Zap } from "lucide-react";
import { GameInstance } from "@/types/game";
import { toast } from "sonner";

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentInstance, setCurrentInstance] = useState<GameInstance | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const game = MINI_GAMES.find((g) => g.id === gameId);

  useEffect(() => {
    if (game) {
      generateNewInstance();
      // Load best score from localStorage
      const savedBest = localStorage.getItem(`best-score-${gameId}`);
      if (savedBest) setBestScore(parseInt(savedBest));
    }
  }, [game]);

  // Timer countdown effect
  useEffect(() => {
    if (timerEnabled && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up!
            toast.error("Time's up! Game Over");
            saveHighScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerEnabled, timeLeft]);

  const generateNewInstance = () => {
    if (game) {
      const instance = game.generator();
      setCurrentInstance(instance);
    }
  };

  const handleComplete = (isCorrect: boolean = true) => {
    setSessionCount(prev => prev + 1);

    if (isCorrect) {
      // Calculate points based on speed and streak
      let points = 10;
      if (timerEnabled) {
        points += Math.floor(timeLeft / 3); // Bonus for speed
      }
      points += streak * 2; // Streak bonus

      setScore(prev => prev + points);
      setStreak(prev => prev + 1);

      if (streak > 0 && streak % 5 === 0) {
        toast.success(`🔥 ${streak} in a row! Amazing!`);
      }
    } else {
      setStreak(0);
    }

    generateNewInstance();
  };

  const handleExit = () => {
    if (score > 0) {
      saveHighScore();
    }
    navigate("/");
  };

  const saveHighScore = () => {
    if (score > bestScore) {
      localStorage.setItem(`best-score-${gameId}`, score.toString());
      setBestScore(score);
      toast.success(`🏆 New High Score: ${score}!`);
    }
  };

  const toggleTimer = () => {
    if (!timerEnabled) {
      setTimeLeft(30);
      setScore(0);
      setSessionCount(0);
      setStreak(0);
      generateNewInstance();
    }
    setTimerEnabled(!timerEnabled);
  };

  const resetGame = () => {
    setScore(0);
    setSessionCount(0);
    setStreak(0);
    setTimeLeft(30);
    generateNewInstance();
  };

  if (!game || !currentInstance) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-foreground">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-fredoka">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-4 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={handleExit}
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="text-center">
              <h1 className="text-2xl font-bold">{game.name}</h1>
              <p className="text-sm opacity-90">Round {sessionCount + 1}</p>
            </div>

            <Button
              onClick={toggleTimer}
              variant={timerEnabled ? "destructive" : "secondary"}
              size="sm"
              className="gap-2"
            >
              <Timer className="h-4 w-4" />
              {timerEnabled ? "Stop" : "Race"}
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Trophy className="h-4 w-4" />
              <span className="font-bold">Score: {score}</span>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full animate-pulse">
                <Zap className="h-4 w-4 text-orange-300" />
                <span className="font-bold">{streak} Streak!</span>
              </div>
            )}

            {timerEnabled && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-bold ${
                timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-white/10'
              }`}>
                <Timer className="h-4 w-4" />
                <span>{timeLeft}s</span>
              </div>
            )}

            {bestScore > 0 && (
              <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                <span className="text-yellow-300">🏆 Best: {bestScore}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto px-4 py-8">
        {timeLeft === 0 && timerEnabled ? (
          <div className="text-center space-y-6 mt-12">
            <h2 className="text-4xl font-bold text-foreground">Game Over!</h2>
            <p className="text-2xl text-muted-foreground">Final Score: {score}</p>
            {score > bestScore && (
              <p className="text-xl text-yellow-600 font-bold">🎉 New High Score! 🎉</p>
            )}
            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} size="lg" className="gap-2">
                <Timer className="h-5 w-5" />
                Play Again
              </Button>
              <Button onClick={handleExit} variant="outline" size="lg">
                Back to Games
              </Button>
            </div>
          </div>
        ) : (
          <GameRouter
            instance={currentInstance}
            onComplete={handleComplete}
            onExit={handleExit}
          />
        )}
      </main>
    </div>
  );
}
