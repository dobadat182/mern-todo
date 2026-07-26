import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { notify } from "../../lib/notify";
import { TaskFormFields } from "../shared/task-form-fields";

export function CreateNewTask({ onCreateTask }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleOpenChange(nextOpen) {
    setOpen(nextOpen);
    if (!nextOpen) setError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();

    if (!title) {
      setError("Title là bắt buộc");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateTask({
        title,
        description: description || undefined,
      });
      event.target.reset();
      setOpen(false);
      notify.success("Tạo task thành công");
    } catch (err) {
      const message = err.message || "Không thể tạo task";
      setError(message);
      notify.error("Tạo task thất bại", message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          />
        }
      >
        <IconPlus data-icon="inline-start" />
        Create New Task
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-0 text-lg font-bold">
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Add a new task to your list. Title is required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskFormFields disabled={submitting} />

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter className="flex">
            <Button type="submit" disabled={submitting} className="flex-2">
              {submitting ? "Creating..." : "Create Task"}
            </Button>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={submitting}
                  className="flex-1"
                />
              }
            >
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
