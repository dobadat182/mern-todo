import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";

import { TaskPriority } from "./TaskPriority";
import { TaskRowActions } from "./TaskRowActions";
import { TaskStatus } from "./TaskStatus";
import { TaskTypeBadge } from "./TaskTypeBadge";

export function TaskTableRow({ task }) {
  return (
    <TableRow>
      <TableCell className="px-3">
        <Checkbox aria-label={`Select ${task.id}`} />
      </TableCell>
      <TableCell>{task.id}</TableCell>
      <TableCell>
        <div className="flex max-w-[480px] items-center gap-2">
          <TaskTypeBadge label={task.label} />
          <span className="truncate">{task.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <TaskStatus status={task.status} />
      </TableCell>
      <TableCell>
        <TaskPriority priority={task.priority} />
      </TableCell>
      <TableCell>
        <TaskRowActions />
      </TableCell>
    </TableRow>
  );
}
