import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { STATUS_CONFIG, DATE_FILTER_CONFIG } from "../../constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const FILTER_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
  value,
  label: config.label,
  Icon: config.icon,
}));

const DATE_FILTER_ITEMS = Object.entries(DATE_FILTER_CONFIG).map(
  ([value, config]) => ({
    value,
    label: config.label,
  }),
);

export function TaskFilters({
  statusFilter = "all",
  onStatusFilterChange,
  dateFilter = "all",
  onDateFilterChange,
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Status filter */}
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
      <Separator orientation="vertical" className="h-7 mx-2" />
      {/* Date filter — controlled: value + onValueChange (không dùng defaultValue) */}
      <Select
        items={DATE_FILTER_ITEMS}
        value={dateFilter}
        onValueChange={onDateFilterChange}
      >
        <SelectTrigger className="max-h-7 bg-white text-xs text-black capitalize">
          <SelectValue placeholder="Select a date" />
        </SelectTrigger>
        <SelectContent>
          {DATE_FILTER_ITEMS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              <span className="text-sm">{label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
