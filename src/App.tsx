import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import DocumentsPage from "./pages/DocumentsPage";
import JapanesePage from "./pages/JapanesePage";
import EnglishPage from "./pages/EnglishPage";
import MathPage from "./pages/MathPage";
import PhysicsPage from "./pages/PhysicsPage";
import ChemistryPage from "./pages/ChemistryPage";
import ProjectsPage from "./pages/ProjectsPage";
import ResearchPage from "./pages/ResearchPage";
import InterviewPage from "./pages/InterviewPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TaskProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/japanese" element={<JapanesePage />} />
                <Route path="/english" element={<EnglishPage />} />
                <Route path="/math" element={<MathPage />} />
                <Route path="/physics" element={<PhysicsPage />} />
                <Route path="/chemistry" element={<ChemistryPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </TooltipProvider>
      </TaskProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
