import { IconAdjustmentsHorizontal, IconCirclePlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TaskTableToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-full max-w-xs lg:max-w-sm"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-dashed"
        >
          <IconCirclePlus data-icon="inline-start" />
          Status
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-dashed"
        >
          <IconCirclePlus data-icon="inline-start" />
          Priority
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm">
          <IconAdjustmentsHorizontal data-icon="inline-start" />
          View
        </Button>
        <Button
          type="button"
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
