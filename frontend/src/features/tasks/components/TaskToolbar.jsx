import { IconCirclePlus, IconLayoutKanban, IconTable } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function ViewModeToggle({ viewMode, onViewModeChange }) {
  return (
    <div
      className="inline-flex items-center rounded-lg border bg-background p-0.5"
      role="group"
      aria-label="View mode"
    >
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={viewMode === "table"}
        className={cn(
          "h-7 gap-1.5 px-2.5",
          viewMode === "table" && "bg-muted text-foreground",
        )}
        onClick={() => onViewModeChange("table")}
      >
        <IconTable className="size-4" />
        Table
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={viewMode === "kanban"}
        className={cn(
          "h-7 gap-1.5 px-2.5",
          viewMode === "kanban" && "bg-muted text-foreground",
        )}
        onClick={() => onViewModeChange("kanban")}
      >
        <IconLayoutKanban className="size-4" />
        Kanban
      </Button>
    </div>
  );
}

export function TaskToolbar({ viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-full max-w-xs lg:max-w-sm"
          readOnly
        />
        <Button type="button" variant="outline" size="sm" className="border-dashed">
          <IconCirclePlus data-icon="inline-start" />
          Status
        </Button>
        <Button type="button" variant="outline" size="sm" className="border-dashed">
          <IconCirclePlus data-icon="inline-start" />
          Priority
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <Button
          type="button"
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
