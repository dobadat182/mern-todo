import { Badge } from "@/components/ui/badge";

import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../constants";

export function TaskTypeBadge({ label }) {
  return (
    <Badge variant="outline" className="rounded-md font-medium">
      {label}
    </Badge>
  );
}

export function TaskStatus({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.todo;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  );
}

export function TaskPriority({ priority }) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.normal;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  );
}
