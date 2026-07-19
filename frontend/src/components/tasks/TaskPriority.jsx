import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react"

const priorityConfig = {
  high: {
    label: "High",
    icon: IconArrowUp,
  },
  medium: {
    label: "Medium",
    icon: IconArrowRight,
  },
  low: {
    label: "Low",
    icon: IconArrowDown,
  },
}

export function TaskPriority({ priority }) {
  const config = priorityConfig[priority] ?? priorityConfig.medium
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  )
}
