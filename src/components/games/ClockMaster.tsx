import { useState } from "react";
import { GameInstance } from "@/types/game";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ClockMasterProps {
  instance: GameInstance;
  onAnswer: (answer: { hours: number; minutes: number }) => void;
}

export function ClockMaster({ instance, onAnswer }: ClockMasterProps) {
  const { timeString } = instance.question;
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  // Calculate hand positions
  const hourRotation = (selectedHour % 12) * 30 + selectedMinute * 0.5; // 30 degrees per hour + minute adjustment
  const minuteRotation = selectedMinute * 6; // 6 degrees per minute

  const handleSubmit = () => {
    onAnswer({ hours: selectedHour, minutes: selectedMinute });
  };

  return (
    <Card className="p-8 bg-gradient-card space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Clock className="h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Clock Master!</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Set the clock to show this time
        </p>
      </div>

      {/* Target Time Display */}
      <div className="text-center">
        <div className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl shadow-lg">
          <p className="text-5xl font-bold font-mono">{timeString}</p>
        </div>
      </div>

      {/* Clock Display */}
      <div className="max-w-md mx-auto">
        <div className="relative w-80 h-80 mx-auto bg-white rounded-full border-8 border-primary shadow-2xl">
          {/* Clock face numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 120 + 160;
            const y = Math.sin(angle) * 120 + 160;
            return (
              <div
                key={num}
                className="absolute text-2xl font-bold text-gray-700"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {num}
              </div>
            );
          })}

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30" />

          {/* Hour hand */}
          <div
            className="absolute top-1/2 left-1/2 origin-bottom bg-gray-800 rounded-full transition-transform duration-300"
            style={{
              width: "8px",
              height: "80px",
              transform: `translate(-50%, -100%) rotate(${hourRotation}deg)`,
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute top-1/2 left-1/2 origin-bottom bg-blue-600 rounded-full transition-transform duration-300"
            style={{
              width: "6px",
              height: "110px",
              transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)`,
            }}
          />
        </div>
      </div>

      {/* Time Controls */}
      <div className="max-w-lg mx-auto space-y-6">
        {/* Hour Control */}
        <div className="space-y-3">
          <label className="block text-center text-lg font-semibold">
            Hour: {selectedHour}
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(12)].map((_, i) => {
              const hour = i + 1;
              return (
                <Button
                  key={hour}
                  onClick={() => setSelectedHour(hour)}
                  variant={selectedHour === hour ? "default" : "outline"}
                  size="lg"
                  className="text-lg font-bold"
                >
                  {hour}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Minute Control */}
        <div className="space-y-3">
          <label className="block text-center text-lg font-semibold">
            Minutes: {selectedMinute.toString().padStart(2, "0")}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 15, 30, 45].map((minute) => (
              <Button
                key={minute}
                onClick={() => setSelectedMinute(minute)}
                variant={selectedMinute === minute ? "default" : "outline"}
                size="lg"
                className="text-lg font-bold"
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button onClick={handleSubmit} size="lg" className="px-12 text-xl">
          Check Answer
        </Button>
      </div>

      {/* Hint */}
      <div className="text-center text-sm text-muted-foreground">
        <p>The short hand shows the hour, the long hand shows the minutes!</p>
      </div>
    </Card>
  );
}
