import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";
import {
  IconCircle,
  IconCircleCheck,
  IconList,
  IconLoader2,
} from "@tabler/icons-react";

export const STATUS_CONFIG = {
  all: { label: "All", icon: IconList },
  todo: { label: "Todo", icon: IconCircle },
  in_progress: { label: "In Progress", icon: IconLoader2 },
  completed: { label: "Completed", icon: IconCircleCheck },
};

export const TASK_STATUS_OPTIONS = Object.entries(STATUS_CONFIG)
  .filter(([value]) => value !== "all")
  .map(([value, config]) => ({
    value,
    label: config.label,
    icon: config.icon,
  }));

export const PRIORITY_CONFIG = {
  high: { label: "High", icon: IconArrowUp },
  medium: { label: "Medium", icon: IconArrowRight },
  normal: { label: "Normal", icon: IconArrowRight },
  low: { label: "Low", icon: IconArrowDown },
};

export const KANBAN_COLUMNS = [
  { status: "active", title: "Todo", icon: IconCircle },
  { status: "completed", title: "Completed", icon: IconCircleCheck },
];

export const TASKS_PAGE_SIZE = 2;
