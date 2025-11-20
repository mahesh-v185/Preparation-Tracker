import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTasks } from "@/contexts/TaskContext";
import { useState } from "react";
import { Calendar, Download, Upload, Settings } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [examDate, setExamDate] = useLocalStorage("mext-exam-date", "");
  const [interviewDate, setInterviewDate] = useLocalStorage("mext-interview-date", "");
  const { exportData, importData } = useTasks();
  const [importText, setImportText] = useState("");

  const handleExportJSON = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mext-tasks-backup.json";
    a.click();
    toast.success("Tasks exported successfully!");
  };

  const handleImportJSON = () => {
    try {
      importData(importText);
      setImportText("");
      toast.success("Tasks imported successfully!");
    } catch (error) {
      toast.error("Failed to import tasks. Please check the format.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your MEXT preparation settings</p>
        </div>
      </div>

      {/* Important Dates */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Important Dates</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">MEXT Exam Date</label>
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Interview Date</label>
            <Input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Export Data */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Download className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Export Data</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Download your task data as a JSON file for backup
        </p>
        <Button onClick={handleExportJSON}>
          <Download className="h-4 w-4 mr-2" />
          Export JSON
        </Button>
      </Card>

      {/* Import Data */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Import Data</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Restore your task data from a previously exported JSON file
        </p>
        <div className="space-y-3">
          <textarea
            className="w-full min-h-[200px] p-3 rounded-lg border border-border bg-background text-foreground font-mono text-sm"
            placeholder="Paste your JSON data here..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
          <Button onClick={handleImportJSON} disabled={!importText.trim()}>
            <Upload className="h-4 w-4 mr-2" />
            Import JSON
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
