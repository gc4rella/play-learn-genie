import { Button } from "@/components/ui/button";
import { Baby, Sparkles, Rocket } from "lucide-react";

export type AgeGroup = "3-5" | "6-8" | "9-10" | "all";

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
    value: "3-5" as AgeGroup,
    label: "Little Learners",
    subtitle: "Ages 3-5",
    icon: Baby,
    color: "secondary",
  },
  {
    value: "6-8" as AgeGroup,
    label: "Young Explorers",
    subtitle: "Ages 6-8",
    icon: Sparkles,
    color: "accent",
  },
  {
    value: "9-10" as AgeGroup,
    label: "Smart Kids",
    subtitle: "Ages 9-10",
    icon: Rocket,
    color: "primary",
  },
];

export function AgeFilter({ selectedAge, onAgeSelect }: AgeFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {ageGroups.map((group) => {
        const Icon = group.icon;
        const isSelected = selectedAge === group.value;
        
        return (
          <Button
            key={group.value}
            onClick={() => onAgeSelect(group.value)}
            variant={isSelected ? "default" : "outline"}
            size="lg"
            className="flex-col h-auto py-4 px-6 min-w-[140px]"
          >
            <Icon className="h-6 w-6 mb-2" />
            <span className="font-bold">{group.label}</span>
            {group.subtitle && (
              <span className="text-xs opacity-80 mt-1">{group.subtitle}</span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
