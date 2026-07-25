import { useState } from "react";

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
import { IconPlus } from "@tabler/icons-react";

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
    } catch (err) {
      setError(err.message || "Không thể tạo task");
    } finally {
      setTimeout(() => {
        setOpen(false);
        setSubmitting(false);
      }, 1000);
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
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="task-title">Title</FieldLabel>
                <Input
                  id="task-title"
                  name="title"
                  placeholder="e.g. Fix login bug"
                  autoFocus
                  required
                  disabled={submitting}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="task-description">Description</FieldLabel>
                <Input
                  id="task-description"
                  name="description"
                  placeholder="Optional details"
                  disabled={submitting}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

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
