import { useState } from "react";

import { useTasks } from "../hooks/use-tasks";
import { TaskKanban } from "./kanban/task-kanban";
import { TaskHeader } from "./task-header";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/task-toolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const { tasks, loading, error, createTask, deleteTask, updateTask } =
    useTasks({ dateFilter });

  const filteredTasks =
    statusFilter === "all"
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
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
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
          // Kanban: dùng `tasks` (đã filter theo date), không lọc status
          // để luôn hiện đủ 3 cột — bạn tự nối DnD + onUpdateTask
          <TaskKanban
            tasks={tasks}
            loading={loading}
            onUpdateTask={updateTask}
          />
        )}
      </div>
    </div>
  );
}
