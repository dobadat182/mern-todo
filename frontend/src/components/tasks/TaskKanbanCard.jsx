import { TaskPriority } from "./TaskPriority"
import { TaskTypeBadge } from "./TaskTypeBadge"

export function TaskKanbanCard({ task }) {
  return (
    <article className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {task.id}
        </span>
        <TaskTypeBadge label={task.label} />
      </div>
      <p className="mb-3 line-clamp-3 text-sm font-medium leading-snug">
        {task.title}
      </p>
      <TaskPriority priority={task.priority} />
    </article>
  )
}
