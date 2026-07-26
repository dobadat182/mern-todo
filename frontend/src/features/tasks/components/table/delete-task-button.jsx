import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { notify } from "../../lib/notify";

export function DeleteTaskButton({ taskId, onDeleteTask }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDeleteTask(taskId);
      setOpen(false);
      notify.success("Đã xóa task");
    } catch (error) {
      notify.error(
        "Xóa task thất bại",
        error.message || "Không thể xóa task",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" size="icon-sm" />}>
        <IconTrash className="size-4" />
        <span className="sr-only">Delete task</span>
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
  );
}
