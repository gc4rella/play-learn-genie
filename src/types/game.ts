export interface GameInstance {
  id: string;
  type: string;
  question: any;
  correctAnswer: any;
  options?: any[];
  metadata?: any;
}

export type AgeRange = "3-4" | "5-6" | "7-8" | "9-10";

export interface MiniGame {
  id: string;
  name: string;
  ageRange: AgeRange;
  description: string;
  generator: () => GameInstance;
}
