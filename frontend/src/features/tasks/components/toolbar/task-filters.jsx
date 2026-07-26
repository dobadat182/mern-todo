import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { STATUS_CONFIG, STATUS_FILTER_ALL } from "../../constants";

const FILTER_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
  value,
  label: config.label,
  Icon: config.icon,
}));

export function TaskFilters({
  statusFilter = STATUS_FILTER_ALL,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      {FILTER_OPTIONS.map(({ value, label, Icon }) => {
        const isActive = statusFilter === value;

        return (
          <Button
            key={value}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onStatusFilterChange(value)}
            className={cn(
              "gap-1.5 text-xs capitalize",
              isActive &&
                "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </Button>
        );
      })}
    </div>
  );
}
