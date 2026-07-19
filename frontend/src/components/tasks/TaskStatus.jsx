import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconHelpCircle,
  IconStopwatch,
} from "@tabler/icons-react"

const statusConfig = {
  in_progress: {
    label: "In Progress",
    icon: IconStopwatch,
  },
  backlog: {
    label: "Backlog",
    icon: IconHelpCircle,
  },
  todo: {
    label: "Todo",
    icon: IconCircle,
  },
  done: {
    label: "Done",
    icon: IconCircleCheck,
  },
  canceled: {
    label: "Canceled",
    icon: IconCircleX,
  },
}

export function TaskStatus({ status }) {
  const config = statusConfig[status] ?? statusConfig.todo
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  )
}
