import { useState } from "react";

import { useTasks } from "../hooks/useTasks";
import { TaskHeader } from "./TaskHeader";
import { TaskKanban } from "./kanban/TaskKanban";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/TaskToolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const { tasks, loading, error, createTask } = useTasks();

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <TaskHeader />
        <TaskToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateTask={createTask}
        />

        {loading ? (
          <p className="text-sm text-muted-foreground">Đang tải tasks...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : viewMode === "table" ? (
          <TaskTable tasks={tasks} />
        ) : (
          <TaskKanban tasks={tasks} />
        )}
      </div>
    </div>
  );
}
