import { useTasks } from "@/contexts/TaskContext";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ProgressRing";
import { CategoryCard } from "@/components/CategoryCard";
import {
  FileText,
  Languages,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Briefcase,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { tasks, calculateProgress } = useTasks();
  const [examDate] = useLocalStorage("mext-exam-date", "");
  const [interviewDate] = useLocalStorage("mext-interview-date", "");

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const pendingTasks = tasks.filter((t) => t.status === "not-started").length;

  const overallProgress =
    (calculateProgress("documents") +
      calculateProgress("japanese") +
      calculateProgress("english") +
      calculateProgress("math") +
      calculateProgress("physics") +
      calculateProgress("chemistry") +
      calculateProgress("projects") +
      calculateProgress("research") +
      calculateProgress("interview")) /
    9;

  const calculateDaysUntil = (dateString: string) => {
    if (!dateString) return null;
    const target = new Date(dateString);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const examDays = examDate ? calculateDaysUntil(examDate) : null;
  const interviewDays = interviewDate ? calculateDaysUntil(interviewDate) : null;

  const recentActivity = tasks
    .filter((t) => t.status !== "not-started")
    .slice(-5)
    .reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track your MEXT scholarship preparation progress</p>
      </div>

      {/* Countdown Timers */}
      {(examDays !== null || interviewDays !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examDays !== null && (
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">MEXT Exam</p>
                  <p className="text-2xl font-bold text-foreground">
                    {examDays > 0 ? `${examDays} days` : "Today!"}
                  </p>
                </div>
              </div>
            </Card>
          )}
          {interviewDays !== null && (
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <MessageSquare className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interview</p>
                  <p className="text-2xl font-bold text-foreground">
                    {interviewDays > 0 ? `${interviewDays} days` : "Today!"}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Overall Progress */}
      <Card className="p-8 bg-gradient-card shadow-elevated">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2">Overall Progress</h2>
            <p className="text-muted-foreground mb-6">Track your preparation across all categories</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-2xl font-bold text-foreground">{completedTasks}</span>
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-2xl font-bold text-foreground">{inProgressTasks}</span>
                </div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold text-foreground">{pendingTasks}</span>
                </div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          <ProgressRing progress={overallProgress} size={160} strokeWidth={12} />
        </div>
      </Card>

      {/* Category Overview */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CategoryCard
            title="Documents"
            progress={calculateProgress("documents")}
            icon={FileText}
            total={tasks.filter((t) => t.category === "documents").length}
            completed={tasks.filter((t) => t.category === "documents" && t.status === "completed").length}
          />
          <CategoryCard
            title="Japanese"
            progress={calculateProgress("japanese")}
            icon={Languages}
            total={tasks.filter((t) => t.category === "japanese").length}
            completed={tasks.filter((t) => t.category === "japanese" && t.status === "completed").length}
          />
          <CategoryCard
            title="English"
            progress={calculateProgress("english")}
            icon={BookOpen}
            total={tasks.filter((t) => t.category === "english").length}
            completed={tasks.filter((t) => t.category === "english" && t.status === "completed").length}
          />
          <CategoryCard
            title="Mathematics"
            progress={calculateProgress("math")}
            icon={Calculator}
            total={tasks.filter((t) => t.category === "math").length}
            completed={tasks.filter((t) => t.category === "math" && t.status === "completed").length}
          />
          <CategoryCard
            title="Physics"
            progress={calculateProgress("physics")}
            icon={Atom}
            total={tasks.filter((t) => t.category === "physics").length}
            completed={tasks.filter((t) => t.category === "physics" && t.status === "completed").length}
          />
          <CategoryCard
            title="Chemistry"
            progress={calculateProgress("chemistry")}
            icon={FlaskConical}
            total={tasks.filter((t) => t.category === "chemistry").length}
            completed={tasks.filter((t) => t.category === "chemistry" && t.status === "completed").length}
          />
          <CategoryCard
            title="Projects"
            progress={calculateProgress("projects")}
            icon={Briefcase}
            total={tasks.filter((t) => t.category === "projects").length}
            completed={tasks.filter((t) => t.category === "projects" && t.status === "completed").length}
          />
          <CategoryCard
            title="Research"
            progress={calculateProgress("research")}
            icon={Users}
            total={tasks.filter((t) => t.category === "research").length}
            completed={tasks.filter((t) => t.category === "research" && t.status === "completed").length}
          />
          <CategoryCard
            title="Interview"
            progress={calculateProgress("interview")}
            icon={MessageSquare}
            total={tasks.filter((t) => t.category === "interview").length}
            completed={tasks.filter((t) => t.category === "interview" && t.status === "completed").length}
            variant="success"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No activity yet. Start by updating task statuses!</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{task.category}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    task.status === "completed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }
                >
                  {task.status === "completed" ? "Completed" : "In Progress"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
