import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../constants";
import { TaskTypeBadge } from "../shared/task-meta";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function DetailRow({ label, children }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:items-start sm:gap-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export function ViewTaskDialog({ task, open, onOpenChange }) {
  const taskId = task.id ?? task._id;
  const status = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.todo;
  const StatusIcon = status.icon;
  const priority = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.normal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="mb-0 text-lg font-bold leading-snug">
            {task.title || "Untitled task"}
          </DialogTitle>
        </DialogHeader>

        <dl className="space-y-4">
          <DetailRow label="Label">
            <TaskTypeBadge label={task.label || "—"} />
          </DetailRow>

          <DetailRow label="Description">
            <p className="whitespace-pre-wrap wrap-breaks">
              {task.description?.trim() ? task.description : "—"}
            </p>
          </DetailRow>

          <Separator />

          <DetailRow label="Status">
            <div className="flex items-center gap-2">
              <StatusIcon
                className="size-4 text-muted-foreground"
                aria-hidden
              />
              <span>{status.label}</span>
            </div>
          </DetailRow>

          <DetailRow label="Priority">
            <span>{priority.label}</span>
          </DetailRow>

          <Separator />

          <DetailRow label="ID">
            <span className="break-all font-mono text-xs text-muted-foreground">
              {taskId}
            </span>
          </DetailRow>

          <DetailRow label="Created">{formatDate(task.createdAt)}</DetailRow>
          <DetailRow label="Updated">{formatDate(task.updatedAt)}</DetailRow>
          <DetailRow label="Completed">
            {formatDate(task.completedAt)}
          </DetailRow>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
