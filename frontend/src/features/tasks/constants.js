import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconList,
  IconLoader2,
} from "@tabler/icons-react";

/** UI-only filter (not a DB status) */
export const STATUS_FILTER_ALL = "all";

export const STATUS_CONFIG = {
  [STATUS_FILTER_ALL]: { label: "All", icon: IconList },
  todo: { label: "Todo", icon: IconCircle },
  in_progress: { label: "In Progress", icon: IconLoader2 },
  completed: { label: "Completed", icon: IconCircleCheck },
};

/** Valid task statuses stored in DB */
export const TASK_STATUS_OPTIONS = Object.entries(STATUS_CONFIG)
  .filter(([value]) => value !== STATUS_FILTER_ALL)
  .map(([value, config]) => ({
    value,
    label: config.label,
    icon: config.icon,
  }));

export const PRIORITY_CONFIG = {
  high: { label: "High", icon: IconArrowUp },
  medium: { label: "Medium", icon: IconArrowRight },
  normal: { label: "Normal", icon: IconArrowRight },
};
