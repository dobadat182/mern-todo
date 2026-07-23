import { KANBAN_COLUMNS } from "../../constants";
import { TaskPriority, TaskTypeBadge } from "../shared/TaskMeta";

function TaskKanbanCard({ task }) {
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
  );
}

function TaskKanbanColumn({ title, icon: Icon, tasks }) {
  return (
    <section className="flex min-h-[28rem] min-w-[260px] flex-1 flex-col rounded-xl border bg-muted/30">
      <header className="flex items-center gap-2 border-b px-3 py-2.5">
        {Icon ? <Icon className="size-4 text-muted-foreground" aria-hidden /> : null}
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          {tasks.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {tasks.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskKanbanCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}

export function TaskKanban({ tasks }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {KANBAN_COLUMNS.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <TaskKanbanColumn
            key={column.status}
            title={column.title}
            icon={column.icon}
            tasks={columnTasks}
          />
        );
      })}
    </div>
  );
}
