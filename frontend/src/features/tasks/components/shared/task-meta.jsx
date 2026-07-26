import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  STATUS_FILTER_ALL,
  TASK_STATUS_OPTIONS,
} from "../../constants";

export function TaskTypeBadge({ label }) {
  return (
    <Badge variant="outline" className="rounded-md font-medium">
      {label}
    </Badge>
  );
}

export function TaskStatus({ status, onStatusChange, disabled = false }) {
  const [updating, setUpdating] = useState(false);

  const value =
    STATUS_CONFIG[status] && status !== STATUS_FILTER_ALL ? status : "todo";
  const selectItems = TASK_STATUS_OPTIONS.map(({ value, label }) => ({
    value,
    label,
  }));

  async function handleValueChange(nextStatus) {
    if (!nextStatus || nextStatus === value || !onStatusChange) return;

    setUpdating(true);
    try {
      await onStatusChange(nextStatus);
    } catch (error) {
      console.error("Update status failed", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Select
      value={value}
      items={selectItems}
      onValueChange={handleValueChange}
      disabled={disabled || updating || !onStatusChange}
    >
      <SelectTrigger size="sm" className="min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="start">
        <SelectGroup>
          {TASK_STATUS_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <SelectItem key={option.value} value={option.value}>
                <Icon className="size-4 text-muted-foreground" aria-hidden />
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function TaskPriority({ priority }) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.normal;

  return (
    <div className="flex items-center gap-2">
      <span>{config.label}</span>
    </div>
  );
}
