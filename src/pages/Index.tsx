import { useState } from "react";
import { GameCard, type Game } from "@/components/GameCard";
import { AgeFilter, type AgeGroup } from "@/components/AgeFilter";
import { AIGameGenerator } from "@/components/AIGameGenerator";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-bg.jpg";
import alphabetGame from "@/assets/game-alphabet.jpg";
import numbersGame from "@/assets/game-numbers.jpg";
import shapesGame from "@/assets/game-shapes.jpg";

const sampleGames: Game[] = [
  {
    id: "1",
    title: "Alphabet Adventure",
    description: "Learn letters through fun interactive games and songs!",
    imageUrl: alphabetGame,
    ageRange: "3-5",
    difficulty: 2,
    category: "Reading",
  },
  {
    id: "2",
    title: "Number Ninjas",
    description: "Master counting and simple math with exciting challenges.",
    imageUrl: numbersGame,
    ageRange: "6-8",
    difficulty: 3,
    category: "Math",
  },
  {
    id: "3",
    title: "Shape Explorers",
    description: "Discover shapes and patterns in a colorful world!",
    imageUrl: shapesGame,
    ageRange: "3-5",
    difficulty: 1,
    category: "Logic",
  },
  {
    id: "4",
    title: "Word Wizard",
    description: "Build vocabulary and spelling skills through magical word games.",
    imageUrl: alphabetGame,
    ageRange: "6-8",
    difficulty: 3,
    category: "Reading",
  },
  {
    id: "5",
    title: "Math Master",
    description: "Solve advanced math problems and become a calculation champion!",
    imageUrl: numbersGame,
    ageRange: "9-10",
    difficulty: 5,
    category: "Math",
  },
  {
    id: "6",
    title: "Pattern Puzzles",
    description: "Train your brain with challenging pattern recognition games.",
    imageUrl: shapesGame,
    ageRange: "9-10",
    difficulty: 4,
    category: "Logic",
  },
];

const Index = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("all");

  const filteredGames = selectedAge === "all" 
    ? sampleGames 
    : sampleGames.filter(game => game.ageRange === selectedAge);

  const handlePlayGame = (gameId: string) => {
    const game = sampleGames.find(g => g.id === gameId);
    toast.success(`Starting ${game?.title}! 🎮`, {
      description: "Game will load in a moment...",
    });
  };

  return (
    <div className="min-h-screen bg-background font-fredoka">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(56, 189, 248, 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Welcome to KidLearn! 🌟
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Discover amazing educational games designed just for you!
              Learn, play, and grow with fun activities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="text-lg font-bold"
                onClick={() => {
                  document.getElementById('games-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                Explore Games
              </Button>
              <AIGameGenerator />
            </div>
          </div>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Games Section */}
      <section id="games-section" className="container mx-auto px-4 py-16 space-y-12">
        {/* Age Filter */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-foreground">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-muted-foreground">
              Pick games perfect for your age!
            </p>
          </div>
          
          <AgeFilter 
            selectedAge={selectedAge} 
            onAgeSelect={setSelectedAge} 
          />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={() => handlePlayGame(game.id)}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <p className="text-2xl font-bold text-muted-foreground">
              No games found for this age group yet!
            </p>
            <AIGameGenerator />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Made with ❤️ for curious young minds
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
