import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ageRange: string;
  difficulty: number; // 1-5 stars
  category: string;
}

interface GameCardProps {
  game: Game;
  onPlay: () => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-playful hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-fredoka font-bold text-lg text-foreground leading-tight">
            {game.title}
          </h3>
          <Badge variant="secondary" className="shrink-0 font-fredoka">
            {game.ageRange}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < game.difficulty
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>

        <Badge variant="outline" className="font-fredoka">
          {game.category}
        </Badge>

        <Button
          onClick={onPlay}
          className="w-full font-fredoka font-semibold"
          variant="default"
        >
          Play Now!
        </Button>
      </div>
    </Card>
  );
}
