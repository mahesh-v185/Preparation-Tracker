import { Card } from "@/components/ui/card";
import { TaskItem } from "@/components/TaskItem";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Plus, Flag, Download } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const CategoryPage = ({ category, title, description, icon: Icon }: CategoryPageProps) => {
  const { getTasksByCategory, updateTaskStatus, togglePriority, addTask, calculateProgress } = useTasks();
  const tasks = getTasksByCategory(category);
  const progress = calculateProgress(category);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const priorityTasks = tasks.filter((t) => t.priority);
  const regularTasks = tasks.filter((t) => !t.priority);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: newTaskDescription,
        status: "not-started",
        category,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsAddDialogOpen(false);
    }
  };

  const exportCategoryTasks = () => {
    const csv = [
      ["Task", "Status", "Description", "Priority"],
      ...tasks.map((t) => [
        t.title,
        t.status,
        t.description || "",
        t.priority ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${category}-tasks.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCategoryTasks}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Task Title</label>
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description (Optional)</label>
                  <Textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Enter task description"
                  />
                </div>
                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-6 bg-gradient-card">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Category Progress</p>
          <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          {tasks.filter((t) => t.status === "completed").length} of {tasks.length} completed
        </p>
      </Card>

      {priorityTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flag className="h-5 w-5 text-warning" />
            <h2 className="text-xl font-bold text-foreground">High Priority</h2>
          </div>
          <div className="space-y-2">
            {priorityTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                status={task.status}
                description={task.description}
                priority={task.priority}
                onStatusChange={(status) => updateTaskStatus(task.id, status)}
                onPriorityToggle={() => togglePriority(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-foreground mb-3">All Tasks</h2>
        <div className="space-y-2">
          {regularTasks.length === 0 && priorityTasks.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
            </Card>
          ) : regularTasks.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">All tasks are marked as priority</p>
            </Card>
          ) : (
            regularTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                status={task.status}
                description={task.description}
                priority={task.priority}
                onStatusChange={(status) => updateTaskStatus(task.id, status)}
                onPriorityToggle={() => togglePriority(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
