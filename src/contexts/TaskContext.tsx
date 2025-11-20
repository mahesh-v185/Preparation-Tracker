import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type TaskStatus = "not-started" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  priority?: boolean;
  category: string;
}

interface TaskContextType {
  tasks: Task[];
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  togglePriority: (id: string) => void;
  addTask: (task: Omit<Task, "id">) => void;
  exportData: () => string;
  importData: (data: string) => void;
  getTasksByCategory: (category: string) => Task[];
  calculateProgress: (category: string) => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  // Documents
  { id: "d1", title: "Passport Copy", status: "not-started", description: "Valid passport with at least 6 months validity", category: "documents" },
  { id: "d2", title: "Passport Photos", status: "not-started", description: "Recent color photos (4.5cm x 4.5cm)", category: "documents" },
  { id: "d3", title: "Academic Transcripts", status: "not-started", description: "Official transcripts from all institutions", category: "documents" },
  { id: "d4", title: "Certificate of Graduation", status: "not-started", description: "Or expected graduation certificate", category: "documents" },
  { id: "d5", title: "Medical Certificate", status: "not-started", description: "Complete health examination form", category: "documents" },
  { id: "d6", title: "MEXT Application Form", status: "not-started", description: "Fully completed application", category: "documents" },
  { id: "d7", title: "Recommendation Letter", status: "not-started", description: "From academic supervisor or professor", category: "documents" },
  { id: "d8", title: "Statement of Purpose", status: "not-started", description: "Why MEXT, why Japan, your goals", category: "documents" },
  { id: "d9", title: "CV / Resume", status: "not-started", description: "Academic and professional experience", category: "documents" },
  { id: "d10", title: "Research Proposal", status: "not-started", description: "Detailed research plan (if applicable)", category: "documents" },
  
  // Japanese
  { id: "j1", title: "Hiragana (46 characters)", status: "not-started", category: "japanese" },
  { id: "j2", title: "Katakana (46 characters)", status: "not-started", category: "japanese" },
  { id: "j3", title: "N5 Grammar Basics", status: "not-started", category: "japanese" },
  { id: "j4", title: "N5 Vocabulary (800 words)", status: "not-started", category: "japanese" },
  { id: "j5", title: "Basic Kanji (100 characters)", status: "not-started", category: "japanese" },
  
  // English
  { id: "e1", title: "Grammar Fundamentals", status: "not-started", category: "english" },
  { id: "e2", title: "Academic Vocabulary", status: "not-started", category: "english" },
  { id: "e3", title: "Reading Comprehension", status: "not-started", category: "english" },
  { id: "e4", title: "Essay Writing", status: "not-started", category: "english" },
  { id: "e5", title: "MEXT Past Papers Practice", status: "not-started", category: "english" },
  
  // Math
  { id: "m1", title: "Algebra", status: "not-started", description: "Linear equations, quadratic equations, polynomials", category: "math" },
  { id: "m2", title: "Geometry", status: "not-started", description: "Triangles, circles, coordinate geometry", category: "math" },
  { id: "m3", title: "Trigonometry", status: "not-started", description: "Ratios, identities, applications", category: "math" },
  { id: "m4", title: "Statistics", status: "not-started", description: "Mean, median, mode, probability", category: "math" },
  { id: "m5", title: "Math Past Papers", status: "not-started", description: "Practice with MEXT past year questions", category: "math" },
  
  // Physics
  { id: "p1", title: "Mechanics", status: "not-started", description: "Motion, force, energy, momentum", category: "physics" },
  { id: "p2", title: "Waves", status: "not-started", description: "Sound, light, interference", category: "physics" },
  { id: "p3", title: "Electricity", status: "not-started", description: "Circuits, Ohm's law, magnetism", category: "physics" },
  { id: "p4", title: "Optics", status: "not-started", description: "Reflection, refraction, lenses", category: "physics" },
  { id: "p5", title: "Thermodynamics", status: "not-started", description: "Heat, temperature, laws of thermodynamics", category: "physics" },
  
  // Chemistry
  { id: "c1", title: "Atomic Structure", status: "not-started", description: "Atoms, electrons, periodic table", category: "chemistry" },
  { id: "c2", title: "Chemical Bonding", status: "not-started", description: "Ionic, covalent, metallic bonds", category: "chemistry" },
  { id: "c3", title: "Organic Chemistry Basics", status: "not-started", description: "Hydrocarbons, functional groups", category: "chemistry" },
  { id: "c4", title: "Reactions & Equations", status: "not-started", description: "Balancing, stoichiometry", category: "chemistry" },
  { id: "c5", title: "Chemistry Past Papers", status: "not-started", description: "MEXT chemistry questions", category: "chemistry" },
  
  // Projects
  { id: "pr1", title: "GitHub Profile Setup", status: "not-started", description: "Professional README, pinned repos", category: "projects" },
  { id: "pr2", title: "Personal Website", status: "not-started", description: "Portfolio showcasing work", category: "projects" },
  { id: "pr3", title: "Project Documentation", status: "not-started", description: "Write-ups, demos, videos", category: "projects" },
  { id: "pr4", title: "Research Notes", status: "not-started", description: "Document learning and experiments", category: "projects" },
  
  // Research
  { id: "r1", title: "Target Labs Research", status: "not-started", description: "Identify 10+ potential labs in Japan", category: "research" },
  { id: "r2", title: "Professor Profiles", status: "not-started", description: "Save details of professors", category: "research" },
  { id: "r3", title: "Research Pitch", status: "not-started", description: "Prepare elevator pitch for research", category: "research" },
  { id: "r4", title: "Email Outreach", status: "not-started", description: "Send introduction emails to professors", category: "research" },
  { id: "r5", title: "Follow-up Strategy", status: "not-started", description: "Track responses and follow-ups", category: "research" },
  
  // Interview
  { id: "i1", title: "Self Introduction (English)", status: "not-started", category: "interview" },
  { id: "i2", title: "Self Introduction (Japanese)", status: "not-started", category: "interview" },
  { id: "i3", title: "Why Japan?", status: "not-started", category: "interview" },
  { id: "i4", title: "Why MEXT?", status: "not-started", category: "interview" },
  { id: "i5", title: "Future Goals & Research Plan", status: "not-started", category: "interview" },
  { id: "i6", title: "Strengths & Weaknesses", status: "not-started", category: "interview" },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("mext-tasks", initialTasks);

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const togglePriority = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, priority: !task.priority } : task)));
  };

  const addTask = (newTask: Omit<Task, "id">) => {
    const id = `custom-${Date.now()}`;
    setTasks([...tasks, { ...newTask, id }]);
  };

  const exportData = () => {
    return JSON.stringify(tasks, null, 2);
  };

  const importData = (data: string) => {
    try {
      const imported = JSON.parse(data);
      if (Array.isArray(imported)) {
        setTasks(imported);
      }
    } catch (error) {
      console.error("Failed to import data:", error);
    }
  };

  const getTasksByCategory = (category: string) => {
    return tasks.filter((task) => task.category === category);
  };

  const calculateProgress = (category: string) => {
    const categoryTasks = getTasksByCategory(category);
    if (categoryTasks.length === 0) return 0;
    const completed = categoryTasks.filter((t) => t.status === "completed").length;
    return (completed / categoryTasks.length) * 100;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        updateTaskStatus,
        togglePriority,
        addTask,
        exportData,
        importData,
        getTasksByCategory,
        calculateProgress,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
