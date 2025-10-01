import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MINI_GAMES } from "@/games/registry";
import { GameRouter } from "@/components/games/GameRouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { GameInstance } from "@/types/game";

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentInstance, setCurrentInstance] = useState<GameInstance | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  const game = MINI_GAMES.find((g) => g.id === gameId);

  useEffect(() => {
    if (game) {
      generateNewInstance();
    }
  }, [game]);

  const generateNewInstance = () => {
    if (game) {
      const instance = game.generator();
      setCurrentInstance(instance);
    }
  };

  const handleComplete = () => {
    setSessionCount(prev => prev + 1);
    generateNewInstance();
  };

  const handleExit = () => {
    navigate("/");
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
        <div className="container mx-auto flex items-center justify-between">
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
          
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto px-4 py-8">
        <GameRouter
          instance={currentInstance}
          onComplete={handleComplete}
          onExit={handleExit}
        />
      </main>
    </div>
  );
}
