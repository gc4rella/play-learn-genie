import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AIGameGenerator() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameIdea, setGameIdea] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [subject, setSubject] = useState("");

  const handleGenerate = async () => {
    if (!gameIdea || !ageGroup || !subject) {
      toast.error("Please fill in all fields!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      toast.success("New game created! Check the library.");
      setIsGenerating(false);
      setOpen(false);
      setGameIdea("");
      setAgeGroup("");
      setSubject("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="lg" className="font-bold">
          <Sparkles className="h-5 w-5" />
          Create New Game with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] font-fredoka">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Create a New Learning Game
          </DialogTitle>
          <DialogDescription>
            Tell us what kind of game you want to create, and our AI will make it fun and educational!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="idea" className="font-semibold">
              Game Idea
            </Label>
            <Input
              id="idea"
              placeholder="e.g., Memory game with animals"
              value={gameIdea}
              onChange={(e) => setGameIdea(e.target.value)}
              className="font-fredoka"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="font-semibold">
              Age Group
            </Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger id="age" className="font-fredoka">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5">Little Learners (3-5)</SelectItem>
                <SelectItem value="6-8">Young Explorers (6-8)</SelectItem>
                <SelectItem value="9-10">Smart Kids (9-10)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="font-semibold">
              Learning Subject
            </Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject" className="font-fredoka">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="art">Art & Creativity</SelectItem>
                <SelectItem value="logic">Logic & Problem Solving</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          variant="accent"
          size="lg"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Your Game...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Game
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
