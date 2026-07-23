import { CreateNewTask } from "./CreateNewTask";
import { TaskFilters } from "./TaskFilters";
import { ViewModeToggle } from "./ViewModeToggle";

export function TaskToolbar({ viewMode, onViewModeChange, onCreateTask }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <TaskFilters />
      <div className="flex items-center gap-2">
        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <CreateNewTask />
      </div>
    </div>
  );
}
