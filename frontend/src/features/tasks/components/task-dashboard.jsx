import { useState } from "react";

import { STATUS_FILTER_ALL } from "../constants";
import { useTasks } from "../hooks/use-tasks";
import { TaskHeader } from "./task-header";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/task-toolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTER_ALL);
  const { tasks, loading, error, createTask, deleteTask, updateTask } =
    useTasks({ dateFilter: "all" });

  const filteredTasks =
    statusFilter === STATUS_FILTER_ALL
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="min-h-svh bg-transparent px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <TaskHeader />
        <TaskToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateTask={createTask}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        {viewMode === "table" ? (
          <TaskTable
            tasks={filteredTasks}
            loading={loading}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
        ) : (
          <div className="flex min-h-125 items-center justify-center rounded-xl border p-4">
            <p className="text-muted-foreground">View mode in development...</p>
          </div>
        )}
      </div>
    </div>
  );
}
