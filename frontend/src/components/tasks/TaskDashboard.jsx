import { useState } from "react";

import { tasks } from "@/data/tasks";

import { DashboardHeader } from "./DashboardHeader";
import { TaskDataTable } from "./TaskDataTable";
import { TaskKanbanBoard } from "./TaskKanbanBoard";
import { TaskTableToolbar } from "./TaskTableToolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <DashboardHeader />
        <TaskTableToolbar viewMode={viewMode} onViewModeChange={setViewMode} />
        {viewMode === "table" ? (
          <TaskDataTable tasks={tasks} />
        ) : (
          <TaskKanbanBoard tasks={tasks} />
        )}
      </div>
    </div>
  );
}
