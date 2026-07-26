import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";

import { STATUS_CONFIG } from "../../constants";
import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { EditTaskDialog } from "./EditTaskDialog";

export default function TableItem({
  task,
  index,
  onDeleteTask,
  onUpdateTask,
}) {
  const taskId = task.id ?? task._id;

  async function handleStatusChange(status) {
    await onUpdateTask(taskId, { status });

    const statusLabel = STATUS_CONFIG[status]?.label ?? status;
    toast.add({
      type: "success",
      title: "Cập nhật thành công",
      description: `Status đã đổi thành "${statusLabel}".`,
    });
  }

  return (
    <TableRow>
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell>
        <div className="flex max-w-96 items-center gap-2">
          <TaskTypeBadge label={task.label} />
          <span className="truncate">{task.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={!task.description ? "text-muted-foreground" : undefined}
        >
          {task.description || ""}
        </span>
      </TableCell>
      <TableCell className="min-w-52">
        <TaskStatus
          status={task.status}
          onStatusChange={handleStatusChange}
        />
      </TableCell>
      <TableCell>
        <TaskPriority priority={task.priority} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <EditTaskDialog task={task} onUpdateTask={onUpdateTask} />
          <DeleteTaskButton taskId={taskId} onDeleteTask={onDeleteTask} />
        </div>
      </TableCell>
    </TableRow>
  );
}
