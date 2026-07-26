import { CreateNewTask } from "./create-new-task";
import { TaskFilters } from "./task-filters";
import { ViewModeToggle } from "./view-mode-toggle";

export function TaskToolbar({
  viewMode,
  onViewModeChange,
  onCreateTask,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <TaskFilters
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
      />
      <div className="flex items-center gap-2">
        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <CreateNewTask onCreateTask={onCreateTask} />
      </div>
    </div>
  );
}
