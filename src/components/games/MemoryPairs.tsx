import { useState, useEffect } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";

interface MemoryPairsProps {
  instance: GameInstance;
  onAnswer: (answer: any) => void;
}

interface CardItem {
  id: string;
  type: "number" | "dots";
  value: number;
}

export function MemoryPairs({ instance, onAnswer }: MemoryPairsProps) {
  const cards: CardItem[] = instance.question.cards;
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (matchedPairs.length === cards.length) {
      // All pairs matched!
      setTimeout(() => onAnswer(true), 500);
    }
  }, [matchedPairs, cards.length, onAnswer]);

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      flippedCards.includes(index) ||
      matchedPairs.includes(index) ||
      flippedCards.length >= 2
    ) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [first, second] = newFlipped;
      const card1 = cards[first];
      const card2 = cards[second];

      // Check if they match (same value, different type)
      if (card1.value === card2.value && card1.type !== card2.type) {
        // Match found!
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, first, second]);
          setFlippedCards([]);
          setIsChecking(false);
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  };

  const renderCardContent = (card: CardItem, index: number) => {
    const isFlipped = flippedCards.includes(index) || matchedPairs.includes(index);

    if (!isFlipped) {
      return (
        <div className="w-full h-full flex items-center justify-center text-6xl">
          ?
        </div>
      );
    }

    if (card.type === "number") {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl font-bold text-accent">{card.value}</span>
        </div>
      );
    } else {
      // Render dots
      const dotPositions = getDotPositions(card.value);
      return (
        <div className="w-full h-full p-4 relative">
          {dotPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-accent rounded-full"
              style={{ left: pos.x, top: pos.y }}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Memory Match!
        </h2>
        <p className="text-lg text-muted-foreground">
          Match numbers with their dot patterns
        </p>
        <p className="text-sm text-muted-foreground">
          Pairs found: {matchedPairs.length / 2} / {cards.length / 2}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={matchedPairs.includes(index)}
            className={`aspect-square rounded-xl border-4 transition-all transform hover:scale-105 ${
              matchedPairs.includes(index)
                ? "bg-green-500/20 border-green-500 scale-95 opacity-50"
                : flippedCards.includes(index)
                ? "bg-accent/10 border-accent shadow-lg"
                : "bg-primary/10 border-primary/30 hover:border-primary cursor-pointer"
            }`}
          >
            {renderCardContent(card, index)}
          </button>
        ))}
      </div>
    </Card>
  );
}

// Helper function to get dot positions for different numbers
function getDotPositions(value: number): { x: string; y: string }[] {
  const positions: Record<number, { x: string; y: string }[]> = {
    1: [{ x: "50%", y: "50%" }],
    2: [
      { x: "30%", y: "30%" },
      { x: "70%", y: "70%" },
    ],
    3: [
      { x: "30%", y: "30%" },
      { x: "50%", y: "50%" },
      { x: "70%", y: "70%" },
    ],
    4: [
      { x: "30%", y: "30%" },
      { x: "70%", y: "30%" },
      { x: "30%", y: "70%" },
      { x: "70%", y: "70%" },
    ],
  };
  return positions[value] || [];
}
