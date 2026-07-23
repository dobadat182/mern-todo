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

export function CreateNewTask() {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    console.log(title, description);
  }
  return (
    <Dialog>
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
          <DialogTitle className="text-lg font-bold mb-0">
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
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="task-description">Description</FieldLabel>
                <Input
                  id="task-description"
                  name="description"
                  placeholder="Optional details"
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
