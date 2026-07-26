import { useState } from "react";
import { IconPencil } from "@tabler/icons-react";

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
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function EditTaskDialog({ task, onUpdateTask }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const taskId = task.id ?? task._id;

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
      await onUpdateTask(taskId, {
        title,
        description: description || "",
      });
      setOpen(false);
    } catch (err) {
      setError(err.message || "Không thể cập nhật task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" size="icon-sm" />}>
        <IconPencil className="size-4" />
        <span className="sr-only">Edit task</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-0 text-lg font-bold">Edit Task</DialogTitle>
          <DialogDescription>
            Edit the task details. Title is required.
          </DialogDescription>
        </DialogHeader>

        <form
          key={`${taskId}-${open}`}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={`edit-title-${taskId}`}>Title</FieldLabel>
                <Input
                  id={`edit-title-${taskId}`}
                  name="title"
                  defaultValue={task.title ?? ""}
                  autoFocus
                  required
                  disabled={submitting}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor={`edit-description-${taskId}`}>
                  Description
                </FieldLabel>
                <Textarea
                  id={`edit-description-${taskId}`}
                  name="description"
                  defaultValue={task.description ?? ""}
                  disabled={submitting}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter className="flex">
            <Button type="submit" className="flex-2" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={submitting}
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
