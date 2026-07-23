import { IconArrowDown, IconArrowRight, IconArrowUp } from "@tabler/icons-react";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconHelpCircle,
  IconStopwatch,
} from "@tabler/icons-react";

export const STATUS_CONFIG = {
  active: { label: "Todo", icon: IconCircle },
  complete: { label: "Done", icon: IconCircleCheck },
  in_progress: { label: "In Progress", icon: IconStopwatch },
  backlog: { label: "Backlog", icon: IconHelpCircle },
  todo: { label: "Todo", icon: IconCircle },
  done: { label: "Done", icon: IconCircleCheck },
  canceled: { label: "Canceled", icon: IconCircleX },
};

export const PRIORITY_CONFIG = {
  high: { label: "High", icon: IconArrowUp },
  medium: { label: "Medium", icon: IconArrowRight },
  normal: { label: "Normal", icon: IconArrowRight },
  low: { label: "Low", icon: IconArrowDown },
};

export const KANBAN_COLUMNS = [
  { status: "active", title: "Todo", icon: IconCircle },
  { status: "complete", title: "Done", icon: IconCircleCheck },
];
