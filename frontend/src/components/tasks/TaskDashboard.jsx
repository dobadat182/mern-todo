import { tasks } from "@/data/tasks";

import { DashboardHeader } from "./DashboardHeader";
import { TaskDataTable } from "./TaskDataTable";
import { TaskTableToolbar } from "./TaskTableToolbar";

export function TaskDashboard() {
  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <DashboardHeader />
        <TaskTableToolbar />
        <TaskDataTable tasks={tasks} />
      </div>
    </div>
  );
}
