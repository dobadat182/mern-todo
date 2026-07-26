import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TaskFormFields({
  idPrefix = "task",
  defaultTitle = "",
  defaultDescription = "",
  disabled = false,
  descriptionAsTextarea = false,
}) {
  const titleId = `${idPrefix}-title`;
  const descriptionId = `${idPrefix}-description`;

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={titleId}>Title</FieldLabel>
          <Input
            id={titleId}
            name="title"
            defaultValue={defaultTitle}
            placeholder="e.g. Fix login bug"
            autoFocus
            required
            disabled={disabled}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={descriptionId}>Description</FieldLabel>
          {descriptionAsTextarea ? (
            <Textarea
              id={descriptionId}
              name="description"
              defaultValue={defaultDescription}
              disabled={disabled}
            />
          ) : (
            <Input
              id={descriptionId}
              name="description"
              defaultValue={defaultDescription}
              placeholder="Optional details"
              disabled={disabled}
            />
          )}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
