import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";

export type TaskStatus = "not-started" | "in-progress" | "completed";

interface TaskItemProps {
  title: string;
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  description?: string;
  priority?: boolean;
  onPriorityToggle?: () => void;
}

const statusColors = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  completed: "bg-success/10 text-success border-success/20",
};

const statusLabels = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

export const TaskItem = ({ title, status, onStatusChange, description, priority, onPriorityToggle }: TaskItemProps) => {
  const handleCheck = () => {
    if (status === "completed") {
      onStatusChange("not-started");
    } else if (status === "not-started") {
      onStatusChange("in-progress");
    } else {
      onStatusChange("completed");
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg bg-card border transition-all duration-200",
      priority ? "border-warning/50 bg-warning/5" : "border-border hover:border-primary/50"
    )}>
      <Checkbox
        checked={status === "completed"}
        onCheckedChange={handleCheck}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-1">
            <h4
              className={cn(
                "text-sm font-medium text-foreground",
                status === "completed" && "line-through text-muted-foreground"
              )}
            >
              {title}
            </h4>
            {priority && <Flag className="h-3 w-3 text-warning shrink-0" />}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("shrink-0", statusColors[status])}>
              {statusLabels[status]}
            </Badge>
          </div>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}
      </div>
      {onPriorityToggle && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onPriorityToggle}
        >
          <Flag className={cn("h-4 w-4", priority ? "text-warning fill-warning" : "text-muted-foreground")} />
        </Button>
      )}
    </div>
  );
};
