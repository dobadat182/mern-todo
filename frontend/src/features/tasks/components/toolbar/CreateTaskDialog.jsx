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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const INITIAL_FORM = {
  title: "",
  description: "",
  label: "Bug",
  priority: "normal",
};

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function CreateTaskDialog({ onCreateTask }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  function updateField(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setFormError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);

    const title = form.title.trim();
    if (!title) {
      setFormError("Title là bắt buộc");
      return;
    }

    setSubmitting(true);
    try {
      await onCreateTask({
        title,
        description: form.description.trim() || undefined,
        label: form.label,
        priority: form.priority,
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      setFormError(err.message || "Không thể tạo task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) resetForm();
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          />
        }
      >
        Add Task
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Thêm task mới vào danh sách. Title là bắt buộc.
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
                  value={form.title}
                  onChange={updateField("title")}
                  placeholder="e.g. Fix login bug"
                  autoFocus
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="task-description">Description</FieldLabel>
                <Input
                  id="task-description"
                  name="description"
                  value={form.description}
                  onChange={updateField("description")}
                  placeholder="Optional details"
                />
                <FieldDescription>Có thể để trống.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="task-label">Label</FieldLabel>
                <select
                  id="task-label"
                  name="label"
                  value={form.label}
                  onChange={updateField("label")}
                  className={selectClassName}
                >
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                  <option value="Documentation">Documentation</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                <select
                  id="task-priority"
                  name="priority"
                  value={form.priority}
                  onChange={updateField("priority")}
                  className={selectClassName}
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>
            </FieldGroup>
          </FieldSet>

          {formError ? (
            <p className="text-sm text-destructive">{formError}</p>
          ) : null}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
