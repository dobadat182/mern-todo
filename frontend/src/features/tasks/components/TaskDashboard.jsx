import { useEffect, useState } from "react";

import { TASKS_PAGE_SIZE } from "../constants";
import { useTasks } from "../hooks/useTasks";
import { TaskHeader } from "./TaskHeader";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/TaskToolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [filter, setFilter] = useState("all");
  const { tasks, loading, error, createTask, deleteTask } = useTasks({
    filter: "all",
  });

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <TaskHeader />
        <TaskToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateTask={createTask}
          filter={filter}
          onFilterChange={setFilter}
        />

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        {viewMode === "table" ? (
          <TaskTable
            tasks={filteredTasks}
            loading={loading}
            onDeleteTask={deleteTask}
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
