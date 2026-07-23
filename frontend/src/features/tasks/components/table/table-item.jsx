import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TableItem({ task, index }) {
  const [open, setOpen] = useState(false);
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline" />}>
            <IconTrash className="size-4" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <PopoverHeader>
              <PopoverTitle className="text-sm font-normal text-center">
                Are you sure you want to delete ?
              </PopoverTitle>
              <PopoverDescription className="flex gap-2 mt-2 w-full">
                <Button
                  variant="destructive"
                  className="flex-2"
                  onClick={() => {
                    console.log("delete");
                    setOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    console.log("cancel");
                    setOpen(false);
                  }}
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
