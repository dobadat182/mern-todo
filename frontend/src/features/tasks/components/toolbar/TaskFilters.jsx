import { IconCirclePlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TaskFilters() {
  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Filter tasks..."
        className="h-8 w-full max-w-xs lg:max-w-sm"
        readOnly
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
  );
}
