import {
  IconCircle,
  IconHelpCircle,
  IconStopwatch,
} from "@tabler/icons-react"

import { TaskKanbanColumn } from "./TaskKanbanColumn"

const KANBAN_COLUMNS = [
  { status: "todo", title: "Todo", icon: IconCircle },
  { status: "in_progress", title: "In Progress", icon: IconStopwatch },
  { status: "backlog", title: "Backlog", icon: IconHelpCircle },
]

export function TaskKanbanBoard({ tasks }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {KANBAN_COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status)

        return (
          <TaskKanbanColumn
            key={column.status}
            title={column.title}
            icon={column.icon}
            tasks={columnTasks}
          />
        )
      })}
    </div>
  )
}
