import { Button } from "@/components/ui/button";
import { Baby, Sparkles, Rocket, Star } from "lucide-react";

export type AgeGroup = "3-4" | "5-6" | "7-8" | "9-10" | "all";

interface AgeFilterProps {
  selectedAge: AgeGroup;
  onAgeSelect: (age: AgeGroup) => void;
}

const ageGroups = [
  {
    value: "all" as AgeGroup,
    label: "All Ages",
    icon: Sparkles,
    color: "primary",
  },
  {
    value: "3-4" as AgeGroup,
    label: "Little Learners",
    subtitle: "Ages 3-4",
    icon: Baby,
    color: "secondary",
  },
  {
    value: "5-6" as AgeGroup,
    label: "Young Explorers",
    subtitle: "Ages 5-6",
    icon: Star,
    color: "accent",
  },
  {
    value: "7-8" as AgeGroup,
    label: "Smart Kids",
    subtitle: "Ages 7-8",
    icon: Sparkles,
    color: "primary",
  },
  {
    value: "9-10" as AgeGroup,
    label: "Math Masters",
    subtitle: "Ages 9-10",
    icon: Rocket,
    color: "secondary",
  },
];

export function AgeFilter({ selectedAge, onAgeSelect }: AgeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      {ageGroups.map((group) => {
        const Icon = group.icon;
        const isSelected = selectedAge === group.value;

        return (
          <Button
            key={group.value}
            onClick={() => onAgeSelect(group.value)}
            variant={isSelected ? "default" : "outline"}
            size="lg"
            className="flex-col h-auto py-3 sm:py-4 px-4 sm:px-6 min-w-[120px] sm:min-w-[140px] touch-manipulation"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
            <span className="font-bold text-sm sm:text-base">{group.label}</span>
            {group.subtitle && (
              <span className="text-xs opacity-80 mt-0.5 sm:mt-1">{group.subtitle}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
