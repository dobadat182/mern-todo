import { IconLayoutKanban, IconTable } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ViewModeToggle({ viewMode, onViewModeChange }) {
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
          viewMode === "table" && "bg-muted text-foreground"
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
          viewMode === "kanban" && "bg-muted text-foreground"
        )}
        onClick={() => onViewModeChange("kanban")}
      >
        <IconLayoutKanban className="size-4" />
        Kanban
      </Button>
    </div>
  )
}
