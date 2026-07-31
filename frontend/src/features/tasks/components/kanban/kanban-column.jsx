import { cn } from "@/lib/utils";

import { KanbanCard } from "./kanban-card";

/**
 * UI-only Kanban column.
 *
 * TODO (bạn tự triển khai):
 * - Biến column thành droppable (vd. useDroppable)
 * - Highlight khi đang kéo card vào (isDropTarget / isOver)
 * - Gọi onDropTask?.(taskId, columnStatus) khi thả
 */
export function KanbanColumn({
  status,
  title,
  icon: Icon,
  tasks = [],
  isOver = false,
  // TODO: truyền setNodeRef / droppable props từ DnD
  droppableProps,
}) {
  return (
    <section
      data-column-status={status}
      className={cn(
        "flex min-h-125 max-w-96 flex-1 flex-col rounded-xl border bg-muted/30",
        isOver && "border-primary bg-primary/5 ring-2 ring-primary/20",
      )}
      // TODO: {...droppableProps} hoặc ref={setNodeRef}
      {...droppableProps}
    >
      <header className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon className="size-4 text-muted-foreground" aria-hidden />
          ) : null}
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <span className="rounded-md bg-background px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground">
          {tasks.length}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {tasks.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            Kéo task vào đây
          </p>
        ) : (
          tasks.map((task) => (
            <KanbanCard key={task.id ?? task._id} task={task} />
          ))
        )}
      </div>
    </section>
  );
}
