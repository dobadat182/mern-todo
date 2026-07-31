import { IconGripVertical } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { PRIORITY_CONFIG } from "../../constants";
import { TaskTypeBadge } from "../shared/task-meta";

/**
 * UI-only Kanban card.
 *
 * TODO (bạn tự triển khai):
 * - Gắn drag handle / draggable (vd. useDraggable / useSortable từ @dnd-kit/react)
 * - onClick mở ViewTaskDialog / Edit
 * - Actions delete/edit nếu cần
 */
export function KanbanCard({
  task,
  className,
  // TODO: truyền listeners/attributes từ DnD library
  dragHandleProps,
}) {
  const taskId = task.id ?? task._id;
  const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.normal;

  return (
    <article
      data-task-id={taskId}
      data-status={task.status}
      className={cn(
        "group rounded-lg border bg-background p-3 shadow-sm transition-shadow",
        "hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 cursor-grab touch-none text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
          aria-label="Kéo thả task"
          // TODO: {...dragHandleProps} hoặc ref={handleRef}
          {...dragHandleProps}
        >
          <IconGripVertical className="size-4" />
        </button>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <TaskTypeBadge label={task.label} />
            <span className="text-xs text-muted-foreground">
              {priority.label}
            </span>
          </div>

          <h3 className="text-sm leading-snug font-medium">{task.title}</h3>

          {task.description ? (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {task.description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
