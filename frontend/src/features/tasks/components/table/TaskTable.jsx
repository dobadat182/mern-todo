import { IconDots, IconSelector } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";

function SortableHead({ children, className }) {
  return (
    <TableHead className={className}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
      >
        {children}
        <IconSelector className="size-4 text-muted-foreground" aria-hidden />
      </button>
    </TableHead>
  );
}

function TaskRowActions() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 data-[state=open]:bg-muted"
      aria-label="Open menu"
    >
      <IconDots className="size-4" />
    </Button>
  );
}

function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 px-3">
          <Checkbox aria-label="Select all" />
        </TableHead>
        <SortableHead className="w-25">Task</SortableHead>
        <TableHead>Title</TableHead>
        <TableHead className="w-35">Description</TableHead>
        <SortableHead className="w-25">Status</SortableHead>
        <SortableHead className="w-25">Priority</SortableHead>
        <TableHead className="w-10" />
      </TableRow>
    </TableHeader>
  );
}

function TaskTableRow({ task, index }) {
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
        <span>{task.description}</span>
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

export function TaskTable({ tasks }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          {tasks.map((task, index) => (
            <TaskTableRow key={task.id} task={task} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
