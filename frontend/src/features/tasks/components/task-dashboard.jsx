import { useState } from "react";

import { useTasks } from "../hooks/use-tasks";
import { TaskKanban } from "./kanban/task-kanban";
import { TaskHeader } from "./task-header";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/task-toolbar";
import { TaskPagination } from "./shared/task-pagination";

import { TASKS_PER_PAGE } from "../constants";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { tasks, loading, error, createTask, deleteTask, updateTask } =
    useTasks({ dateFilter });

  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * TASKS_PER_PAGE,
    page * TASKS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const generatePages = () => {
    pages = [];

    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <div className="min-h-svh bg-transparent px-4 py-8 sm:px-6 lg:px-8 space-y-6">
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

      <TaskPagination
        page={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
}
