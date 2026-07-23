import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";

export default function TableItem({ task, index }) {
  return (
    <TableRow>
      <TableCell className="px-3">
        <Checkbox aria-label={`Select ${task.id}`} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div className="flex max-w-120 items-center gap-2">
          <TaskTypeBadge label={task.label} />
          <span className="truncate">{task.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={!task.description ? "text-muted-foreground" : undefined}
        >
          {task.description || "—"}
        </span>
      </TableCell>
      <TableCell>
        <TaskStatus status={task.status} />
      </TableCell>
      <TableCell>
        <TaskPriority priority={task.priority} />
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive"
          aria-label="Delete task"
        >
          <IconTrash className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
