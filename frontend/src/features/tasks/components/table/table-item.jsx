import { useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { STATUS_CONFIG } from "../../constants";
import { notify } from "../../lib/notify";
import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/task-meta";
import { DeleteTaskButton } from "./delete-task-button";
import { EditTaskDialog } from "./edit-task-dialog";
import { ViewTaskDialog } from "./view-task-dialog";

export function TableItem({ task, index, onDeleteTask, onUpdateTask }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const taskId = task.id ?? task._id;

  async function handleStatusChange(status) {
    try {
      await onUpdateTask(taskId, { status });
      const statusLabel = STATUS_CONFIG[status]?.label ?? status;
      notify.success(
        "Cập nhật thành công",
        `Status đã đổi thành "${statusLabel}".`,
      );
    } catch (error) {
      notify.error(
        "Cập nhật status thất bại",
        error.message || "Không thể cập nhật status",
      );
      throw error;
    }
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => setDetailOpen(true)}
      >
        <TableCell className="text-center">{index + 1}</TableCell>
        <TableCell>
          <div className="flex max-w-96 items-center gap-2">
            <TaskTypeBadge label={task.label} />
            <span className="truncate">{task.title}</span>
          </div>
        </TableCell>
        <TableCell className="max-w-96">
          <span
            className={cn(
              "line-clamp-1 truncate",
              !task.description ? "text-muted-foreground" : "",
            )}
          >
            {task.description || ""}
          </span>
        </TableCell>
        <TableCell
          className="min-w-52"
          onClick={(event) => event.stopPropagation()}
        >
          <TaskStatus status={task.status} onStatusChange={handleStatusChange} />
        </TableCell>
        <TableCell>
          <TaskPriority priority={task.priority} />
        </TableCell>
        <TableCell onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center gap-2">
            <EditTaskDialog task={task} onUpdateTask={onUpdateTask} />
            <DeleteTaskButton taskId={taskId} onDeleteTask={onDeleteTask} />
          </div>
        </TableCell>
      </TableRow>

      <ViewTaskDialog
        task={task}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
