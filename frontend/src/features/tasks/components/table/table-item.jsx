import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";

import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";

export default function TableItem({ task, index, onDeleteTask }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDeleteTask(task.id ?? task._id);
      setOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <TableRow>
      <TableCell className="px-3">
        <Checkbox aria-label={`Select ${task.id}`} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
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
        <TaskStatus status={task.status} />
      </TableCell>
      <TableCell>
        <TaskPriority priority={task.priority} />
      </TableCell>
      <TableCell>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline" size="icon-sm" />}>
            <IconTrash className="size-4" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <PopoverHeader>
              <PopoverTitle className="text-center text-sm font-normal">
                Are you sure you want to delete?
              </PopoverTitle>
              <PopoverDescription className="mt-2 flex w-full gap-2">
                <Button
                  variant="destructive"
                  className="flex-2"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={deleting}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
