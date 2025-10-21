import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface MoneyCounterProps {
  instance: GameInstance;
  onAnswer: (answer: number) => void;
}

const coinColors: Record<string, string> = {
  penny: "#CD7F32", // Bronze
  nickel: "#C0C0C0", // Silver
  dime: "#C0C0C0", // Silver
  quarter: "#C0C0C0", // Silver
};

const coinSizes: Record<string, string> = {
  penny: "w-20 h-20",
  nickel: "w-24 h-24",
  dime: "w-20 h-20",
  quarter: "w-28 h-28",
};

export function MoneyCounter({ instance, onAnswer }: MoneyCounterProps) {
  const coins: { name: string; value: number; symbol: string }[] = instance.question.coins;
  const options: number[] = instance.options;

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <DollarSign className="h-10 w-10 text-green-600" />
          <h2 className="text-3xl font-bold text-foreground">Money Counter!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Count the coins and find the total
        </p>
      </div>

      {/* Coins Display */}
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 p-8 bg-green-50 dark:bg-green-950/20 rounded-2xl border-4 border-green-200 dark:border-green-800">
          {coins.map((coin, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`${coinSizes[coin.name]} rounded-full border-4 border-gray-400 shadow-xl flex items-center justify-center font-bold text-white relative overflow-hidden`}
                style={{ backgroundColor: coinColors[coin.name] }}
              >
                {/* Coin shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20" />

                {/* Coin value */}
                <div className="relative z-10 text-center">
                  <div className="text-2xl font-bold drop-shadow-lg">
                    {coin.value}¢
                  </div>
                  <div className="text-xs uppercase drop-shadow-md">
                    {coin.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-lg text-muted-foreground">
          How much money is there in total?
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant="outline"
            size="lg"
            className="h-auto py-6 text-2xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            {option}¢
          </Button>
        ))}
      </div>

      {/* Hint */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Remember: Penny = 1¢, Nickel = 5¢, Dime = 10¢, Quarter = 25¢
        </p>
      </div>
    </Card>
  );
}
