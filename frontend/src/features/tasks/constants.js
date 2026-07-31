import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
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

export const DATE_FILTER_CONFIG = {
  all: { label: "All" },
  today: { label: "Today" },
  week: { label: "Week" },
  month: { label: "Month" },
};

/** Valid task statuses stored in DB */
export const TASK_STATUS_OPTIONS = Object.entries(STATUS_CONFIG)
  .filter(([value]) => value !== "all")
  .map(([value, config]) => ({
    value,
    label: config.label,
    icon: config.icon,
  }));

/** Kanban columns = task statuses (không gồm filter UI `all`) */
export const KANBAN_COLUMNS = TASK_STATUS_OPTIONS.map(
  ({ value, label, icon }) => ({
    status: value,
    title: label,
    icon,
  }),
);

export const PRIORITY_CONFIG = {
  high: { label: "High", icon: IconArrowUp },
  medium: { label: "Medium", icon: IconArrowRight },
  normal: { label: "Normal", icon: IconArrowRight },
};

export const DATE_FILTER_OPTIONS = {
  today: { label: "Today" },
  week: { label: "Week" },
  month: { label: "Month" },
  all: { label: "All" },
};
