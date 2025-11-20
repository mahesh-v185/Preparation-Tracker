import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
  BarChart3,
  Settings,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTasks } from "@/contexts/TaskContext";
import { Progress } from "@/components/ui/progress";

const categories = [
  { title: "Dashboard", url: "/", icon: Home, category: null },
  { title: "Documents", url: "/documents", icon: FileText, category: "documents" },
  { title: "Japanese", url: "/japanese", icon: Languages, category: "japanese" },
  { title: "English", url: "/english", icon: BookOpen, category: "english" },
  { title: "Mathematics", url: "/math", icon: Calculator, category: "math" },
  { title: "Physics", url: "/physics", icon: Atom, category: "physics" },
  { title: "Chemistry", url: "/chemistry", icon: FlaskConical, category: "chemistry" },
  { title: "Projects", url: "/projects", icon: Briefcase, category: "projects" },
  { title: "Research", url: "/research", icon: Users, category: "research" },
  { title: "Interview", url: "/interview", icon: MessageSquare, category: "interview" },
  { title: "Settings", url: "/settings", icon: Settings, category: null },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { calculateProgress } = useTasks();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MEXT Preparation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => {
                const progress = item.category ? calculateProgress(item.category) : null;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-muted/50"
                        activeClassName="bg-muted text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        {open && (
                          <div className="flex-1 flex items-center justify-between">
                            <span>{item.title}</span>
                            {progress !== null && (
                              <span className="text-xs text-muted-foreground">
                                {Math.round(progress)}%
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                    {open && progress !== null && (
                      <div className="px-2 pb-1">
                        <Progress value={progress} className="h-1" />
                      </div>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
