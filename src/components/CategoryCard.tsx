import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  progress: number;
  icon: LucideIcon;
  total: number;
  completed: number;
  onClick?: () => void;
  variant?: "default" | "success";
}

export const CategoryCard = ({
  title,
  progress,
  icon: Icon,
  total,
  completed,
  onClick,
  variant = "default",
}: CategoryCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-[1.02] bg-gradient-card",
        onClick && "hover:border-primary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "p-3 rounded-xl",
            variant === "success" ? "bg-success/10" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              variant === "success" ? "text-success" : "text-primary"
            )}
          />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{Math.round(progress)}%</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">
        {completed} of {total} completed
      </p>
      <Progress value={progress} className="h-2" />
    </Card>
  );
};
