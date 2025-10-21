import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameCard, type Game } from "@/components/GameCard";
import { AgeFilter, type AgeGroup } from "@/components/AgeFilter";
import { AIGameGenerator } from "@/components/AIGameGenerator";
import { Leaderboard } from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { MINI_GAMES } from "@/games/registry";
import heroImage from "@/assets/hero-bg.jpg";
import alphabetGame from "@/assets/game-alphabet.jpg";
import numbersGame from "@/assets/game-numbers.jpg";
import shapesGame from "@/assets/game-shapes.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("all");

  // Map mini games to display cards
  const displayGames: Game[] = MINI_GAMES.map((game) => {
    const imageMap: { [key: string]: string } = {
      "3-4": alphabetGame,
      "5-6": numbersGame,
      "7-8": shapesGame,
      "9-10": numbersGame,
    };

    return {
      id: game.id,
      title: game.name,
      description: game.description,
      imageUrl: imageMap[game.ageRange] || alphabetGame,
      ageRange: game.ageRange,
      difficulty: game.ageRange === "3-4" ? 1 : game.ageRange === "5-6" ? 2 : game.ageRange === "7-8" ? 3 : 4,
      category: "Math & Logic",
    };
  });

  const filteredGames = selectedAge === "all" 
    ? displayGames 
    : displayGames.filter(game => game.ageRange === selectedAge);

  const handlePlayGame = (gameId: string) => {
    navigate(`/play/${gameId}`);
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
              <Leaderboard />
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
